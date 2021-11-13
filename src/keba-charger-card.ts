import { LitElement, html, TemplateResult, CSSResultGroup, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { mdiFastForward, mdiPlay, mdiStop, mdiPlaySpeed } from '@mdi/js';
import { HassEntity } from 'home-assistant-js-websocket';
import { HomeAssistant, hasConfigOrEntityChanged, fireEvent, LovelaceCardEditor } from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types. https://github.com/custom-cards/custom-card-helpers

import './keba-charger-card-editor';
import type { KebaChargerCardConfig } from './types';
import { CARD_VERSION } from './const';
import { localize } from './localize/localize';

import styles from './styles';
import * as cconst from './const';

console.info(`%cKEBA-CHARGER-CARD ${CARD_VERSION} IS INSTALLED`, 'color: green; font-weight: bold', '');

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'keba-charger-card',
  name: 'Keba Charger Card Card',
  description: 'A keba charger card for visualizing the status and interacting with your Keba P30',
});

@customElement('keba-charger-card')
export class ChargerCard extends LitElement {
  static get styles(): CSSResultGroup {
    return styles;
  }

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement('keba-charger-card-editor');
  }

  public static getStubConfig(entities) {
    const [chargerEntity] = entities.filter((eid) => eid.substr(0, eid.indexOf('.')) === 'binary_sensor');

    return {
      entity: chargerEntity || '',
      image: 'default',
    };
  }

  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private config!: KebaChargerCardConfig;

  @property({ attribute: false }) public requestInProgress!: boolean;

  get entity(): HassEntity | undefined {
    return this.config.entity != undefined ? this.hass.states[this.config.entity] : undefined;
  }

  get smartChargingEntity(): HassEntity | undefined {
    return this.config.smartChargingEntity != undefined ? this.hass.states[this.config.smartChargingEntity] : undefined;
  }

  get scriptDomain(): string {
    if (this.config.domain === undefined) {
      return cconst.SCRIPT_DOMAIN;
    }
    return this.config.domain;
  }

  get status(): string {
    const pluggedIn = this.getEntityState(this.getEntity(cconst.ENTITIES.cableLocked));
    if (pluggedIn == 'off') {
      return cconst.CHARGERSTATUS.STANDBY_1;
    }
    const chargingState = this.getEntityState(this.getEntity(cconst.ENTITIES.chargingState));
    if (chargingState == 'on') {
      return cconst.CHARGERSTATUS.CHARGING_3;
    } else {
      if (this.smartChargingEntity && this.smartChargingEntity.state == 'on') {
        return cconst.CHARGERSTATUS.PAUSED_2;
      }

      return cconst.CHARGERSTATUS.CONNECTED_6;
    }

    /*
    READY_4: 'completed',
    ERROR_5: 'error', */
  }
  /*
  private get usedChargerLimit(): number {
    const maxChargerCurrentEntity = this.getEntity(cconst.ENTITIES.maxChargerCurrent);
    if (maxChargerCurrentEntity) {
      return +maxChargerCurrentEntity.state;
    }
    return 0;
  }*/

  private get image(): string {
    const imgselected = this.config.chargerImage || cconst.DEFAULTIMAGE;

    const chargerImage = cconst.CHARGER_IMAGES.find(({ name }) => {
      if (name === imgselected) {
        return name;
      } else {
        return undefined;
      }
    });

    if (this.config.customImage === undefined || this.config.customImage === '') {
      try {
        return chargerImage === undefined ? undefined : chargerImage.img;
      } catch (err) {
        return '';
      }
    }
    return this.config.customImage;
  }

  private get customCardTheme(): string {
    if (this.config.customCardTheme === undefined) {
      return cconst.DEFAULT_CUSTOMCARDTHEME;
    }
    return this.config.customCardTheme;
  }

  private get showLeds(): boolean {
    if (this.config.show_leds === undefined) {
      return true;
    }
    return this.config.show_leds;
  }

  private get showName(): boolean {
    if (this.config.show_name === undefined) {
      return true;
    }
    return this.config.show_name;
  }

  private get showStatus(): boolean {
    if (this.config.show_status === undefined) {
      return true;
    }
    return this.config.show_status;
  }

  private get showStats(): boolean {
    if (this.config.show_stats === undefined) {
      return true;
    }
    return this.config.show_stats;
  }

  private get showCollapsibles(): boolean {
    if (this.config.show_collapsibles === undefined) {
      return true;
    }
    return this.config.show_collapsibles;
  }

  private get showToolbar(): boolean {
    if (this.config.show_toolbar === undefined) {
      return true;
    }
    return this.config.show_toolbar;
  }

  private get compactView(): boolean {
    if (this.config.compact_view === undefined) {
      return false;
    }
    return this.config.compact_view;
  }

  private get entityBasename(): string {
    return this.config.entity === undefined
      ? ''
      : this.config.entity.split('.')[1].replace(cconst.STATUS_ENTITY_BASE, '');
  }

  private getEntityId(entityBase: string): string | undefined {
    try {
      return entityBase.split('.')[0] + '.' + this.entityBasename + '_' + entityBase.split('.')[1];
    } catch (err) {
      return undefined;
    }
  }

  private getEntityBase(entityId: string): string | undefined {
    try {
      return entityId.split('.')[0] + '.' + entityId.split('.')[1].replace(this.entityBasename + '_', '');
    } catch (err) {
      return undefined;
    }
  }

  private getEntities() {
    const cableLocked = this.getEntity(cconst.ENTITIES.cableLocked);
    const cableLockedPermanently = this.getEntity(cconst.ENTITIES.cableLockedPermanently);
    const chargingState = this.getEntity(cconst.ENTITIES.chargingState);
    const basicSchedule = this.getEntity(cconst.ENTITIES.basicSchedule);
    const circuitCurrent = this.getEntity(cconst.ENTITIES.circuitCurrent);
    const costPerKwh = this.getEntity(cconst.ENTITIES.costPerKwh);
    const dynamicChargerCurrent = this.getEntity(cconst.ENTITIES.dynamicChargerCurrent);
    const dynamicCircuitCurrent = this.getEntity(cconst.ENTITIES.dynamicCircuitCurrent);
    const enableIdleCurrent = this.getEntity(cconst.ENTITIES.enableIdleCurrent);
    const offlineCircuitCurrent = this.getEntity(cconst.ENTITIES.offlineCircuitCurrent);
    const inCurrent = this.getEntity(cconst.ENTITIES.inCurrent);
    const isEnabled = this.getEntity(cconst.ENTITIES.isEnabled);
    const maxChargerCurrent = this.getEntity(cconst.ENTITIES.maxChargerCurrent);
    const maxCircuitCurrent = this.getEntity(cconst.ENTITIES.maxCircuitCurrent);
    const isOnline = this.getEntity(cconst.ENTITIES.isOnline);
    const outputCurrent = this.getEntity(cconst.ENTITIES.outputCurrent);
    const reasonForNoCurrent = this.getEntity(cconst.ENTITIES.reasonForNoCurrent);
    const sessionEnergy = this.getEntity(cconst.ENTITIES.sessionEnergy);
    const energyPerHour = this.getEntity(cconst.ENTITIES.energyPerHour);
    const energyLifetime = this.getEntity(cconst.ENTITIES.energyLifetime);
    const smartCharging = this.smartChargingEntity;
    const totalPower = this.getEntity(cconst.ENTITIES.totalPower);
    const updateAvailable = this.getEntity(cconst.ENTITIES.updateAvailable);
    const voltage = this.getEntity(cconst.ENTITIES.voltage);
    const status = this.entity;

    return {
      cableLocked,
      cableLockedPermanently,
      chargingState,
      basicSchedule,
      circuitCurrent,
      costPerKwh,
      dynamicChargerCurrent,
      dynamicCircuitCurrent,
      enableIdleCurrent,
      offlineCircuitCurrent,
      inCurrent,
      isEnabled,
      maxChargerCurrent,
      maxCircuitCurrent,
      isOnline,
      outputCurrent,
      reasonForNoCurrent,
      sessionEnergy,
      energyPerHour,
      energyLifetime,
      smartCharging,
      totalPower,
      updateAvailable,
      voltage,
      status,
    };
  }

  private getEntity(entityBase) {
    try {
      const entityId = this.getEntityId(entityBase);

      return entityId === undefined ? undefined : this.hass.states[entityId];
    } catch (err) {
      return undefined;
    }
  }

  private getEntityState(entity) {
    try {
      return entity.state;
    } catch (err) {
      return undefined;
    }
  }

  private getEntityAttribute(entityBase, attribute) {
    try {
      return entityBase.attributes[attribute];
    } catch (err) {
      return undefined;
    }
  }

  private getStatsDefault(state: string) {
    switch (state) {
      case cconst.CHARGERSTATUS.STANDBY_1: {
        return [
          {
            entityId: this.getEntityId(cconst.ENTITIES.sessionEnergy),
            unit: 'kWh',
            subtitle: localize('charger_status.sessionEnergy'),
          },
          {
            entityId: this.getEntityId(cconst.ENTITIES.maxChargerCurrent),
            unit: 'A',
            subtitle: 'Current Limit',
          },
          {
            entityId: this.getEntityId(cconst.ENTITIES.cableLocked),
            unit: '',
            subtitle: 'Locked',
          },
        ];
      }
      case cconst.CHARGERSTATUS.PAUSED_2: {
        return [
          {
            entityId: this.getEntityId(cconst.ENTITIES.maxChargerCurrent),
            unit: 'A',
            subtitle: 'Current Limit',
          },
          {
            entityId: this.getEntityId(cconst.ENTITIES.sessionEnergy),
            unit: 'kWh',
            subtitle: localize('charger_status.sessionEnergy'),
          },
          {
            entityId: this.smartChargingEntity ? this.smartChargingEntity.entity_id : '',
            unit: '',
            subtitle: 'Smart Charging',
          },
        ];
      }
      case cconst.CHARGERSTATUS.CHARGING_3: {
        return [
          {
            entityId: this.getEntityId(cconst.ENTITIES.sessionEnergy),
            unit: 'kWh',
            subtitle: 'Energy',
          },
          {
            entityId: this.getEntityId(cconst.ENTITIES.maxChargerCurrent),
            unit: 'A',
            subtitle: 'Current Limit',
          },
          {
            entityId: this.getEntityId(cconst.ENTITIES.circuitCurrent),
            unit: 'A',
            subtitle: 'Circuit',
          },
          {
            entityId: this.getEntityId(cconst.ENTITIES.outputCurrent),
            unit: 'A',
            subtitle: 'Allowed',
          },
          {
            entityId: this.getEntityId(cconst.ENTITIES.inCurrent),
            unit: 'A',
            subtitle: 'Actual',
          },
          {
            entityId: this.getEntityId(cconst.ENTITIES.totalPower),
            unit: 'kW',
            subtitle: 'Power',
          },
          {
            entityId: this.smartChargingEntity ? this.smartChargingEntity.entity_id : '',
            unit: '',
            subtitle: 'Smart Charging',
          },
        ];
      }
      case cconst.CHARGERSTATUS.READY_4: {
        return [
          {
            entityId: this.getEntityId(cconst.ENTITIES.sessionEnergy),
            unit: 'kWh',
            subtitle: localize('charger_status.sessionEnergy'),
          },
          {
            entityId: this.getEntityId(cconst.ENTITIES.maxChargerCurrent),
            unit: 'A',
            subtitle: 'Current Limit',
          },
        ];
      }
      case cconst.CHARGERSTATUS.ERROR_5: {
        return [
          {
            entityId: this.getEntityId(cconst.ENTITIES.sessionEnergy),
            unit: 'kWh',
            subtitle: localize('charger_status.sessionEnergy'),
          },
          {
            entityId: this.getEntityId(cconst.ENTITIES.maxChargerCurrent),
            unit: 'A',
            subtitle: 'Current Limit',
          },
        ];
      }
      case cconst.CHARGERSTATUS.CONNECTED_6: {
        return [
          {
            entityId: this.getEntityId(cconst.ENTITIES.sessionEnergy),
            unit: 'kWh',
            subtitle: localize('charger_status.sessionEnergy'),
          },
          {
            entityId: this.getEntityId(cconst.ENTITIES.maxChargerCurrent),
            unit: 'A',
            subtitle: 'Current Limit',
          },
          {
            entityId: this.getEntityId(cconst.ENTITIES.basicSchedule),
            unit: '',
            subtitle: 'Schedule',
          },
        ];
      }
    }
    return [];
  }

  setConfig(config: KebaChargerCardConfig): void {
    if (!config.entity) {
      throw new Error(localize('error.missing_entity'));
    }
    this.config = config;
  }

  getCardSize(): number {
    return 2;
  }

  shouldUpdate(changedProps: PropertyValues): boolean {
    return hasConfigOrEntityChanged(this, changedProps, true); //TODO: Probably not efficient to force update here?
  }

  updated(changedProps): void {
    if (
      this.config.entity &&
      changedProps.get('hass') &&
      changedProps.get('hass').states[this.config.entity].state !== this.hass.states[this.config.entity].state
    ) {
      this.requestInProgress = false;
    }
  }

  private handleMore(entity): void {
    if (entity && entity.entity_id) {
      fireEvent(
        this,
        'hass-more-info',
        {
          entityId: entity.entity_id,
        },
        {
          bubbles: true,
          composed: true,
        },
      );
    }
  }

  /*
  private setServiceData(service, isRequest, e): void {
    switch (service) {
      case cconst.SERVICES.chargerMaxCurrent: {
        const current = e.target.getAttribute('value');
        return this.callService(service, isRequest, { current });
      }
      case cconst.SERVICES.chargerDynCurrent: {
        const current = e.target.getAttribute('value');
        return this.callService(service, isRequest, { current });
      }
      case cconst.SERVICES.circuitOfflineCurrent: {
        const currentP1 = e.target.getAttribute('value');
        return this.callService(service, isRequest, { currentP1 });
      }
      case cconst.SERVICES.circuitMaxCurrent: {
        const currentP1 = e.target.getAttribute('value');
        return this.callService(service, isRequest, { currentP1 });
      }
      case cconst.SERVICES.circuitDynCurrent: {
        const currentP1 = e.target.getAttribute('value');
        return this.callService(service, isRequest, { currentP1 });
      }
    }
  }*/

  private callService(service, isRequest = true, options = {}) {
    this.hass.callService(this.scriptDomain, service, {
      ...options,
    });

    if (isRequest) {
      // this.requestInProgress = true; //TODO: Removed, must be improved to check all sensors
      this.requestUpdate();
    }
  }
  /*
  getAttributes(entity) {
    const { status, state, friendly_name, name, site_name, icon } = entity.attributes;

    return {
      status: status || state,
      friendly_name,
      name,
      site_name,
      icon,
    };
  }*/

  private imageLed(state: string, smartCharging: boolean): string {
    const chargingMode = smartCharging ? 'smart' : 'normal';
    return cconst.LEDIMAGES[chargingMode][state] || cconst.LEDIMAGES[chargingMode]['DEFAULT'];
  }

  private renderImage(state): TemplateResult | void {
    let compactview = '';
    if (this.compactView) {
      compactview = '-compact';
    }

    if (!this.image) {
      return html``;
    }
    return html`
      <img
        class="charger${compactview}"
        src="${this.image}"
        @click="${() => this.handleMore(this.entity)}"
        ?more-info="true"
      />${this.renderLeds(state)}
    `;
  }
  /*
  private renderLeds(state: string): TemplateResult | void {
    console.log(state);
    if (this.showLeds) {
      let color = '';
      if (state === cconst.CHARGERSTATUS.CHARGING_3) {
        color = 'green';
      } else {
        color = 'blue';
      }
      return html`<div class="keba-leds-container"><div class="keba-leds keba-leds-${color}"></div></div>`;
    }
    return html``;
  }*/

  private renderLeds(state: string): TemplateResult | void {
    console.log(state);
    if (this.showLeds) {
      let color = '';

      if (state === cconst.CHARGERSTATUS.CHARGING_3) {
        color = '0, 255, 0';
      } else {
        color = '82, 182, 255';
      }
      return html`<div class="keba-leds-container">
        <div class="keba-leds">
          <svg height="10" width="42">
            <defs>
              <radialGradient id="c1" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stop-color="rgba(${color}, 1)" />
                <stop offset="0.5" stop-color="rgba(${color}, 0.5)" />
                <stop offset="1" stop-color="rgba(${color},0)" />
              </radialGradient>
            </defs>

            <circle cx="6" cy="5" r="3" fill="url(#c1)" />
            <circle cx="10" cy="5" r="3" fill="url(#c1)" />
            <circle cx="14" cy="5" r="3" fill="url(#c1)" />
            <circle cx="18" cy="5" r="3" fill="url(#c1)" />
            <circle cx="22" cy="5" r="3" fill="url(#c1)" />
            <circle cx="26" cy="5" r="3" fill="url(#c1)" />
            <circle cx="30" cy="5" r="3" fill="url(#c1)" />
            <circle cx="34" cy="5" r="3" fill="url(#c1)" />
            <circle cx="38" cy="5" r="3" fill="url(#c1)" />
          </svg>
        </div>
      </div>`;
    }
    return html``;
  }

  private renderStats(state): TemplateResult | void {
    /* SHOW DATATABLE */
    if (!this.showStats) {
      return html``;
    }
    let compactview = '';
    if (this.compactView) {
      compactview = '-compact';
    }

    /* DEFAULT DATATABLE */
    const statsList = this.getStatsDefault(state) || [];
    return html` <div class="stats${compactview}">${this.renderStatsList(statsList)}</div> `;
  }

  private renderStatsList(statsList): TemplateResult | void {
    return statsList.map(({ entityId, attribute, calcValue, unit, subtitle }) => {
      if (!entityId && !attribute && !calcValue) {
        return html``;
      } else if (calcValue) {
        return this.renderStatsHtml(calcValue, unit, subtitle, this.hass.states[entityId]);
      }
      try {
        const value = attribute ? this.hass.states[entityId].attributes[attribute] : this.hass.states[entityId].state;
        return this.renderStatsHtml(value, unit, subtitle, this.hass.states[entityId]);
      } catch (err) {
        return null;
      }
    });
  }

  private renderStatsHtml(value, unit, subtitle, entity): TemplateResult | void {
    return html`
      <div class="stats-block" @click="${() => this.handleMore(entity)}" ?more-info="true">
        <span class="stats-value">${value}</span>
        ${unit}
        <div class="stats-subtitle">${subtitle}</div>
      </div>
    `;
  }

  private renderName(): TemplateResult | void {
    //    const { name, site_name } = this.getAttributes(this.entity);
    if (!this.showName) {
      return html``;
    }

    let compactview = '';
    if (this.compactView) {
      compactview = '-compact';
    }

    return html` <div class="charger-name${compactview}">Keba P30</div> `;
  }

  private renderStatus(): TemplateResult | void {
    if (!this.showStatus) {
      return html``;
    }

    let compactview = '';
    if (this.compactView) {
      compactview = '-compact';
    }

    const localizedStatus = localize(`status.${this.status}`) || this.status;

    return html`
      <div class="status${compactview}">
        <span class="status-text${compactview}" alt=${localizedStatus}> ${localizedStatus} </span>
        <ha-circular-progress .active=${this.requestInProgress} size="small"></ha-circular-progress>
      </div>
    `;
  }

  private renderCollapsibleInfo(): TemplateResult | void {
    /* SHOW COLLAPSIBLES */
    if (!this.showCollapsibles) {
      return html``;
    }

    const { isOnline, totalPower, sessionEnergy, energyLifetime } = this.getEntities();

    const localizedClickForStatus = localize('common.click_for_info');

    return html`
      <div>
        <input id="collapsible-info" class="toggle-info" type="checkbox" />
        <label for="collapsible-info" class="lbl-toggle-info">
          <div class="tooltip-right">
            <ha-icon icon="mdi:information"></ha-icon>
            <span class="tooltiptext-right">${localizedClickForStatus}</span>
          </div>
        </label>
        <div class="collapsible-content-info">
          <div class="content-inner-info">
            ${this.renderCollapsibleItems(isOnline, localize('common.online'))}
            ${this.renderCollapsibleItems(totalPower, localize('common.power'))}
            ${this.renderCollapsibleItems(sessionEnergy, localize('charger_status.sessionEnergy'))}
            ${this.renderCollapsibleItems(energyLifetime, localize('common.lifetime_energy'), true)}
          </div>
        </div>
      </div>
    `;
  }

  private renderCollapsibleItems(entity, tooltip, round = false): TemplateResult | void {
    if (entity === null || entity === undefined) {
      return html``;
    }

    const value = round ? Math.round(this.getEntityState(entity)) : this.getEntityState(entity);
    const icon = this.renderIcon(entity);
    const useUnit = this.getEntityAttribute(entity, 'unit_of_measurement');
    return html`
      <div class="collapsible-item" @click="${() => this.handleMore(entity)}" ?more-info="true">
        <div class="tooltip">
          <ha-icon icon="${icon}"></ha-icon>
          <br />${value} ${useUnit}
          <span class="tooltiptext">${tooltip}</span>
        </div>
      </div>
    `;
  }
  private renderInfoItemsLeft(): TemplateResult | void {
    const { isOnline } = this.getEntities();
    return html` ${this.renderInfoItem(isOnline, localize('common.online'))} `;
  }

  private renderInfoItemsRight(): TemplateResult | void {
    const { cableLocked, totalPower, voltage } = this.getEntities();
    const plugIcon = cableLocked && cableLocked.state == 'on' ? 'mdi:power-plug' : 'mdi:power-plug-off';
    return html`
      ${this.renderInfoItem(voltage, localize('common.voltage'), true)}
      ${this.renderInfoItem(totalPower, localize('common.power'))}
      <ha-icon icon="${plugIcon}"></ha-icon>
    `;
  }

  private renderInfoItemsCompact(): TemplateResult | void {
    const { totalPower, voltage } = this.getEntities();
    return html`
      ${this.renderInfoItem(voltage, localize('common.voltage'), true)}
      ${this.renderInfoItem(totalPower, localize('common.power'), true)}
    `;
  }

  private renderInfoItem(entity, tooltip, round = false): TemplateResult | void {
    if (entity === null || entity === undefined) {
      return html``;
    }
    const value = round ? Math.round(this.getEntityState(entity)) : this.getEntityState(entity);
    const useUnit = this.getEntityAttribute(entity, 'unit_of_measurement');
    const icon = this.renderIcon(entity);
    return html`
      <div class="infoitems-item" @click="${() => this.handleMore(entity)}" ?more-info="true">
        <div class="tooltip">
          <ha-icon icon="${icon}"></ha-icon>
          ${value} ${useUnit}
          <span class="tooltiptext">${tooltip}</span>
        </div>
      </div>
    `;
  }

  private renderIcon(entity): TemplateResult | void {
    const entityId = entity.entity_id;
    const base = this.getEntityBase(entityId);
    const icon =
      this.getEntityAttribute(entity, 'icon') !== undefined
        ? this.getEntityAttribute(entity, 'icon')
        : (base === undefined ? null : cconst.ICONS[base]) || 'mdi:cancel';
    /**const domainIcon =
      this.getEntityAttribute(entity, 'device_class') == !null
        ? domainIcon(this.getEntityAttribute(entity, 'device_class'), this.getEntityState(entity))
        : false;
    return domainIcon || icon;*/
    return icon;
  }

  private renderToolbar(state: string): TemplateResult | void {
    /* SHOW TOOLBAR */
    if (!this.showToolbar) {
      return html``;
    }

    let stateButtons = html``;

    /* STATE BUTTONS */
    switch (state) {
      case cconst.CHARGERSTATUS.STANDBY_1: {
        return html``;
      }
      case cconst.CHARGERSTATUS.PAUSED_2: {
        stateButtons = html`
          ${this.renderToolbarButton(cconst.SCRIPT_KEBA_OFF, mdiStop, 'common.stop')}
          ${this.renderToolbarButton(cconst.SCRIPT_KEBA_FAST, mdiFastForward, 'common.start_fast')}
          ${this.renderToolbarButton(cconst.SCRIPT_KEBA_SLOW, mdiPlay, 'common.start_slow')}
        `;
        break;
      }
      case cconst.CHARGERSTATUS.CHARGING_3: {
        stateButtons = html`
          ${this.renderToolbarButton(cconst.SCRIPT_KEBA_OFF, mdiStop, 'common.stop')}
          ${this.renderToolbarButton(cconst.SCRIPT_KEBA_FAST, mdiFastForward, 'common.start_fast')}
          ${this.renderToolbarButton(cconst.SCRIPT_KEBA_SLOW, mdiPlay, 'common.start_slow')}
          ${this.renderToolbarButton(cconst.SCRIPT_KEBA_AUTO, mdiPlaySpeed, 'common.start_smart')}
        `;
        break;
      }
      case cconst.CHARGERSTATUS.READY_4: {
        stateButtons = html`
          ${this.renderToolbarButton(cconst.SCRIPT_KEBA_FAST, mdiFastForward, 'common.start_fast')}
          ${this.renderToolbarButton(cconst.SCRIPT_KEBA_SLOW, mdiPlay, 'common.start_slow')}
          ${this.renderToolbarButton(cconst.SCRIPT_KEBA_AUTO, mdiPlaySpeed, 'common.start_smart')}
        `;
        break;
      }
      case cconst.CHARGERSTATUS.ERROR_5: {
        return html``;
      }
      case cconst.CHARGERSTATUS.CONNECTED_6: {
        stateButtons = html`
          ${this.renderToolbarButton(cconst.SCRIPT_KEBA_FAST, mdiFastForward, 'common.start_fast')}
          ${this.renderToolbarButton(cconst.SCRIPT_KEBA_SLOW, mdiPlay, 'common.start_slow')}
          ${this.renderToolbarButton(cconst.SCRIPT_KEBA_AUTO, mdiPlaySpeed, 'common.start_smart')}
        `;
        break;
      }
    }

    return html`
      <div class="toolbar">
        ${stateButtons}
        <div class="fill-gap"></div>
      </div>
    `;
  }

  private renderToolbarButton(service, icon, text, serviceData = {}, isRequest = true): TemplateResult | void {
    let useText = '';
    try {
      useText = localize(text);
    } catch (e) {
      useText = text;
    }
    return html`
      <div class="tooltip">
        <ha-icon-button
          .path=${icon}
          .label=${useText}
          @click=${() => this.callService(service, isRequest, serviceData)}
        ></ha-icon-button>
        <span class="tooltiptext">${useText}</span>
      </div>
    `;
  }

  private renderCompact(): TemplateResult | void {
    const state = this.status; //  this.entity;
    return html`
      <ha-card>
        <div class="preview-compact">
          ${this.renderImage(state)}

          <div class="metadata">${this.renderName()} ${this.renderStatus()}</div>

          <div class="infoitems">${this.renderInfoItemsCompact()}</div>

          ${this.renderStats(state)}
        </div>

        ${this.renderToolbar(state)}
      </ha-card>
    `;
  }

  private renderFull(): TemplateResult | void {
    const state = this.status; //this.entity;

    return html`
      <ha-card>
        <div class="preview">
          <div class="header">
            <div class="infoitems-left">${this.renderInfoItemsLeft()}</div>

            <div class="infoitems">${this.renderInfoItemsRight()}</div>
          </div>

          ${this.renderImage(state)}

          <div class="metadata">${this.renderStatus()}</div>

          ${this.renderCollapsibleInfo()} ${this.renderStats(state)}
        </div>

        ${this.renderToolbar(state)}
      </ha-card>
    `;
  }

  private renderCustomCardTheme(): TemplateResult | void {
    switch (this.customCardTheme) {
      case 'theme_custom': {
        break;
      }
      case 'theme_default': {
        this.style.setProperty('--custom-card-background-color', '#03A9F4');
        this.style.setProperty('--custom-text-color', '#FFFFFF');
        this.style.setProperty('--custom-primary-color', '#03A9F4');
        this.style.setProperty('--custom-icon-color', '#FFFFFF');
        break;
      }
      case 'theme_transp_blue': {
        this.style.setProperty('--custom-card-background-color', 'transparent');
        this.style.setProperty('--custom-text-color', '#03A9F4');
        this.style.setProperty('--custom-primary-color', '#03A9F4');
        this.style.setProperty('--custom-icon-color', '#03A9F4');
        break;
      }
      case 'theme_transp_black': {
        this.style.setProperty('--custom-card-background-color', 'transparent');
        this.style.setProperty('--custom-text-color', 'black');
        this.style.setProperty('--custom-primary-color', 'black');
        this.style.setProperty('--custom-icon-color', 'black');
        break;
      }
      case 'theme_transp_white': {
        this.style.setProperty('--custom-card-background-color', 'transparent');
        this.style.setProperty('--custom-text-color', 'white');
        this.style.setProperty('--custom-primary-color', 'white');
        this.style.setProperty('--custom-icon-color', 'white');
        break;
      }
      case 'theme_lightgrey_blue': {
        this.style.setProperty('--custom-card-background-color', 'lightgrey');
        this.style.setProperty('--custom-text-color', '#03A9F4');
        this.style.setProperty('--custom-primary-color', '#03A9F4');
        this.style.setProperty('--custom-icon-color', '#03A9F4');
        break;
      }
      default: {
        this.style.setProperty('--custom-card-background-color', '#03A9F4');
        this.style.setProperty('--custom-text-color', '#FFFFFF');
        this.style.setProperty('--custom-primary-color', '#03A9F4');
        this.style.setProperty('--custom-icon-color', '#FFFFFF');
        break;
      }
    }
  }

  render(): TemplateResult | void {
    this.renderCustomCardTheme();

    if (!this.entity) {
      return html`
        <ha-card>
          <div class="preview not-available">
            <div class="metadata">
              <div class="not-available">${localize('common.not_available')}</div>
            </div>
          </div>
        </ha-card>
      `;
    }

    if (this.compactView) {
      return this.renderCompact();
    } else {
      return this.renderFull();
    }
  }
}
