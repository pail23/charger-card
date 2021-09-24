import { LitElement, html, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import {
  HomeAssistant,
  hasConfigOrEntityChanged,
  fireEvent,
  ActionHandlerEvent,
  handleAction,
  LovelaceCardEditor,
} from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types. https://github.com/custom-cards/custom-card-helpers

import './keba-charger-card-editor';
import type { KebaChargerCardConfig } from './types';
//import { actionHandler } from './action-handler-directive';
import { CARD_VERSION } from './const';
import { localize } from './localize/localize';

import styles from './styles';
import * as cconst from './const';

console.info(`%cKEBA-CHARGER-CARD ${CARD_VERSION} IS INSTALLED`, 'color: green; font-weight: bold', '');

@customElement('keba-charger-card')
export class ChargerCard extends LitElement {

  static get styles(): CSSResultGroup {
    return styles;
  }

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement('keba-charger-card-editor');
  }

  public static getStubConfig() {
    //const [chargerEntity] = entities.filter(eid => eid.substr(0, eid.indexOf('.')) === 'binary_sensor');

    return {
      entity: '', // TODO  chargerEntity || '',
      image: 'default',
    };
  }

  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private config!: KebaChargerCardConfig;

  @property({ attribute: false }) public requestInProgress!: boolean;

  get entity() {
    return this.config.entity != undefined ? this.hass.states[this.config.entity] : null;
  }


  get chargerDomain(): string {
    if (this.config.domain === undefined) {
      return cconst.CHARGERDOMAIN;
    }
    return this.config.domain;
  }

  get status(): string {
    const pluggedIn = this.getEntityState(this.getEntity(cconst.ENTITIES.cableLocked));
    // console.log(pluggedIn);
    if (pluggedIn == 'off') {
      return cconst.CHARGERSTATUS.STANDBY_1;
    }
    const chargingState = this.getEntityState(this.getEntity(cconst.ENTITIES.chargingState));
    //const chargingStatus = this.getEntity(cconst.ENTITIES.chargingState).attributes['status']; // charging, authorization rejected,
    //console.log(chargingState);
    //console.log(chargingStatus);
    if (chargingState == 'on') {
      return cconst.CHARGERSTATUS.CHARGING_3;
    } else {
      return cconst.CHARGERSTATUS.PAUSED_2;
    }

    /*
    READY_4: 'completed',
    ERROR_5: 'error',
    CONNECTED_6: 'ready_to_charge',*/
  }

  get usedChargerLimit(): number {
    const { dynamicChargerCurrent, dynamicCircuitCurrent, maxChargerCurrent, maxCircuitCurrent } = this.getEntities();
    const circuitRatedCurrent = 0; // TODO: this.hass.states[this.config.entity].attributes['circuit_ratedCurrent'];
    const usedChargerLimit = Math.min(
      this.getEntityState(dynamicChargerCurrent),
      this.getEntityState(dynamicCircuitCurrent),
      this.getEntityState(maxChargerCurrent),
      this.getEntityState(maxCircuitCurrent),
      circuitRatedCurrent,
    );
    return usedChargerLimit;
  }

  get image(): string {
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
        return chargerImage === undefined ? undefined: chargerImage.img;
      } catch (err) {
        return '';
      }
    }
    return this.config.customImage;
  }

  get customCardTheme(): string {
    if (this.config.customCardTheme === undefined) {
      return cconst.DEFAULT_CUSTOMCARDTHEME;
    }
    return this.config.customCardTheme;
  }

  get showLeds(): boolean {
    if (this.config.show_leds === undefined) {
      return true;
    }
    return this.config.show_leds;
  }

  get showName(): boolean {
    if (this.config.show_name === undefined) {
      return true;
    }
    return this.config.show_name;
  }

  get showStatus(): boolean {
    if (this.config.show_status === undefined) {
      return true;
    }
    return this.config.show_status;
  }

  get showStats(): boolean {
    if (this.config.show_stats === undefined) {
      return true;
    }
    return this.config.show_stats;
  }

  get showCollapsibles(): boolean {
    if (this.config.show_collapsibles === undefined) {
      return true;
    }
    return this.config.show_collapsibles;
  }

  get showToolbar(): boolean {
    if (this.config.show_toolbar === undefined) {
      return true;
    }
    return this.config.show_toolbar;
  }

  get compactView(): boolean {
    if (this.config.compact_view === undefined) {
      return false;
    }
    return this.config.compact_view;
  }

  get entityBasename(): string {
    return this.config.entity === undefined ? '': this.config.entity.split('.')[1].replace(cconst.STATUS_ENTITY_BASE, '');
  }

  getEntityId(entityBase: string): string | undefined {
    try {
      return entityBase.split('.')[0] + '.' + this.entityBasename + '_' + entityBase.split('.')[1];
    } catch (err) {
      return undefined;
    }
  }

  getEntityBase(entityId: string): string | undefined{
    try {
      return entityId.split('.')[0] + '.' + entityId.split('.')[1].replace(this.entityBasename + '_', '');
    } catch (err) {
      return undefined;
    }
  }

  getEntities() {
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
    const smartCharging = this.getEntity(cconst.ENTITIES.smartCharging);
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

  getEntity(entityBase) {
    try {
      const entityId = this.getEntityId(entityBase)

      return entityId === undefined ? undefined: this.hass.states[entityId];
    } catch (err) {
      return undefined;
    }
  }

  getEntityState(entity) {
    try {
      return entity.state;
    } catch (err) {
      return undefined;
    }
  }

  getEntityAttribute(entityBase, attribute) {
    try {
      return entityBase.attributes[attribute];
    } catch (err) {
      return undefined;
    }
  }
  /**
  getEntityAttributes(entity_base) {
    try {
      return this.hass.states[this.getEntityId(entity_base)].attributes;
    } catch (err) {
      return null;
    }
  } */

  getStatsDefault(state: string) {
    switch (state) {
      case cconst.CHARGERSTATUS.STANDBY_1: {
        return [
          {
            entityId: this.getEntityId(cconst.ENTITIES.sessionEnergy),
            unit: 'kWh',
            subtitle: localize('charger_status.sessionEnergy'),
          },
          {
            calcValue: this.usedChargerLimit,
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
            calcValue: this.usedChargerLimit,
            unit: 'A',
            subtitle: 'Current Limit',
          },
          {
            entityId: this.getEntityId(cconst.ENTITIES.sessionEnergy),
            unit: 'kWh',
            subtitle: localize('charger_status.sessionEnergy'),
          },
          {
            entityId: this.getEntityId(cconst.ENTITIES.smartCharging),
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
            entityId: this.getEntityId(cconst.ENTITIES.energyPerHour),
            unit: 'kWh/h',
            subtitle: 'Rate',
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
            calcValue: this.usedChargerLimit,
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
            calcValue: this.usedChargerLimit,
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
            calcValue: this.usedChargerLimit,
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

  setConfig(config) {
    if (!config.entity) {
      throw new Error(localize('error.missing_entity'));
    }
    this.config = config;
  }

  getCardSize() {
    return 2;
  }

  shouldUpdate(changedProps) {
    return hasConfigOrEntityChanged(this, changedProps, true); //TODO: Probably not efficient to force update here?
  }

  updated(changedProps) {
    if (
      this.config.entity && changedProps.get('hass') &&
      changedProps.get('hass').states[this.config.entity].state !== this.hass.states[this.config.entity].state
    ) {
      this.requestInProgress = false;
    }
  }

  handleMore(entity): void {
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

  private _handleAction(ev: ActionHandlerEvent): void {
    if (this.hass && this.config && ev.detail.action) {
      handleAction(this, this.hass, this.config, ev.detail.action);
    }
  }

  setServiceData(service, isRequest, e): void {
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
  }

  callService(service, isRequest = true, options = {}) {
    this.hass.callService(this.chargerDomain, service, {
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

  imageLed(state: string, smartCharging: string): string {
    const chargingMode = smartCharging == 'on' ? 'smart': 'normal';
    return cconst.LEDIMAGES[chargingMode][state] || cconst.LEDIMAGES[chargingMode]['DEFAULT'];
  }

  renderImage(state): TemplateResult | void {
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

  renderLeds(state): TemplateResult | void {
    console.log(state);

    if (this.showLeds) {
      let compactview = '';
      if (this.compactView) {
        compactview = '-compact';
      }

      const smartCharging = this.getEntityState(this.getEntity(cconst.ENTITIES.smartCharging));
      return html`
        <img
          class="charger led${compactview}"
          src="${this.imageLed(state, smartCharging)}"
          @action=${this._handleAction}
        />
      `;
    }
    return html``;
  }

  renderStats(state): TemplateResult | void {
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
    return html`
      <div class="stats${compactview}">
        ${this.renderStatsList(statsList)}
      </div>
    `;
  }

  renderStatsList(statsList): TemplateResult | void {
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

  renderStatsHtml(value, unit, subtitle, entity): TemplateResult | void {
    return html`
      <div class="stats-block" @click="${() => this.handleMore(entity)}"
        ?more-info="true">
        <span class="stats-value">${value}</span>
        ${unit}
        <div class="stats-subtitle">${subtitle}</div>
      </div>
    `;
  }

  renderName(): TemplateResult | void {
    //    const { name, site_name } = this.getAttributes(this.entity);
    if (!this.showName) {
      return html``;
    }

    let compactview = '';
    if (this.compactView) {
      compactview = '-compact';
    }

    return html`
      <div class="charger-name${compactview}">
        Keba P30
      </div>
    `;
  }

  renderStatus(): TemplateResult | void {
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
        <span class="status-text${compactview}" alt=${localizedStatus}>
          ${localizedStatus}
        </span>
        <ha-circular-progress .active=${this.requestInProgress} size="small"></ha-circular-progress>
      </div>
    `;
  }

  renderCollapsibleConfig(): TemplateResult | void {
    /* SHOW COLLAPSIBLES */
    if (!this.showCollapsibles) {
      return html``;
    }

    const {
      cableLocked,
      cableLockedPermanently,
      enableIdleCurrent,
      isEnabled,
      smartCharging,
      //    updateAvailable,
    } = this.getEntities();
    //    let updateAvailableState = this.getEntityState(updateAvailable) || 'off';
    const localizedClickForConfig = localize('common.click_for_config');

    return html`
      <div class="wrap-collabsible">
        <input id="collapsible" class="toggle" type="checkbox" />
        <label for="collapsible" class="lbl-toggle">
          <div class="tooltip-right">
            <ha-icon icon="mdi:cog"></ha-icon>
            <span class="tooltiptext-right">${localizedClickForConfig}</span>
          </div>
        </label>
        <div class="collapsible-content">
          <div class="content-inner">
            ${this.renderCollapsibleItems(isEnabled, 'Enabled')}
            ${this.renderCollapsibleItems(enableIdleCurrent, 'Idle Current')}
            ${this.renderCollapsibleItems(cableLockedPermanently, 'Permanently Locked')}
            ${this.renderCollapsibleItems(cableLocked, 'Locked')}
            ${this.renderCollapsibleItems(smartCharging, 'Smart Charging')}
          </div>
        </div>
      </div>
    `;
  }

  renderCollapsibleInfo(): TemplateResult | void {
    /* SHOW COLLAPSIBLES */
    if (!this.showCollapsibles) {
      return html``;
    }

    const {
      isOnline,
      voltage,
      totalPower,
      circuitCurrent,
      inCurrent,
      sessionEnergy,
      energyPerHour,
      energyLifetime,
    } = this.getEntities();

    const localizedClickForStatus = localize('common.click_for_info');

    return html`
      <div class="wrap-collabsible-info">
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
            ${this.renderCollapsibleItems(voltage, localize('common.voltage'), true)}
            ${this.renderCollapsibleItems(totalPower, localize('common.power'))}
            ${this.renderCollapsibleItems(inCurrent, localize('common.charger_current'), true)}
            ${this.renderCollapsibleItems(circuitCurrent, localize('common.circuit_current'), true)}
            ${this.renderCollapsibleItems(energyPerHour, localize('common.energy_per_hour'))}
            ${this.renderCollapsibleItems(sessionEnergy, localize('charger_status.sessionEnergy'))}
            ${this.renderCollapsibleItems(energyLifetime, localize('common.lifetime_energy'), true)}
          </div>
        </div>
      </div>
    `;
  }

  renderCollapsibleLimits(): TemplateResult | void {
    /* SHOW COLLAPSIBLES */
    if (!this.showCollapsibles) {
      return html``;
    }

    const {
      maxChargerCurrent,
      maxCircuitCurrent,
      dynamicChargerCurrent,
      dynamicCircuitCurrent,
      offlineCircuitCurrent,
    } = this.getEntities();
    const localizedClickForLimits = localize('common.click_for_limits');

    return html`
      <div class="wrap-collabsible-lim">
        <input id="collapsible-lim" class="toggle-lim" type="checkbox" />
        <label for="collapsible-lim" class="lbl-toggle-lim">
          <div class="tooltip-right">
            <ha-icon icon="mdi:speedometer"></ha-icon>
            <span class="tooltiptext-right">${localizedClickForLimits}</span>
          </div>
        </label>
        <div class="collapsible-content-lim">
          <div class="content-inner-lim">
            ${this.renderCollapsibleDropDownItems(
              maxChargerCurrent,
              cconst.SERVICES.chargerMaxCurrent,
              undefined,
              'Max Charger Limit',
              true,
            )}
            ${this.renderCollapsibleDropDownItems(
              dynamicChargerCurrent,
              cconst.SERVICES.chargerDynCurrent,
              undefined,
              'Dyn Charger Limit',
              true,
            )}
            ${this.renderCollapsibleDropDownItems(
              maxCircuitCurrent,
              cconst.SERVICES.circuitMaxCurrent,
              undefined,
              'Max Circuit Limit',
              true,
            )}
            ${this.renderCollapsibleDropDownItems(
              dynamicCircuitCurrent,
              cconst.SERVICES.circuitDynCurrent,
              undefined,
              'Dyn Circuit Limit',
              true,
            )}
            ${this.renderCollapsibleDropDownItems(
              offlineCircuitCurrent,
              cconst.SERVICES.circuitOfflineCurrent,
              undefined,
              'Offline Limit',
              true,
            )}
          </div>
        </div>
      </div>
    `;
  }

  renderCollapsibleItems(entity, tooltip, round = false): TemplateResult | void {
    if (entity === null || entity === undefined) {
      return html`
        x
      `;
    }

    const value = round ? Math.round(this.getEntityState(entity)): this.getEntityState(entity);
    const icon = this.renderIcon(entity);
    const  useUnit = this.getEntityAttribute(entity, 'unit_of_measurement');
    return html`
      <div class="collapsible-item"
        @click="${() => this.handleMore(entity)}"
        ?more-info="true">
        <div class="tooltip">
          <ha-icon icon="${icon}"></ha-icon>
          <br />${value} ${useUnit}
          <span class="tooltiptext">${tooltip}</span>
        </div>
      </div>
    `;
  }

  renderCollapsibleServiceItems(entity, service, text, icon, tooltip, isRequest = true, options = {}): TemplateResult | void {
    let useIcon = icon;
    if (icon === null || icon === undefined) {
      useIcon = this.renderIcon(entity);
    }

    return html`
      <div class="collapsible-item" @click="${() => this.callService(service, isRequest, options)}">
        <div class="tooltip">
          <ha-icon icon="${useIcon}"></ha-icon>
          <br />${text}
          <span class="tooltiptext">${tooltip}</span>
        </div>
      </div>
    `;
  }

  renderCollapsibleDropDownItems(entity, service, icon, tooltip, isRequest = true): TemplateResult | void {
    if (entity === null || entity === undefined) {
      return html``;
    }

    const sources = cconst.CURRENTLIMITS;
    const value = this.getEntityState(entity);
    const selected = sources.indexOf(value);
    const useUnit = this.getEntityAttribute(entity, 'unit_of_measurement');
    const useIcon = icon === undefined ? this.renderIcon(entity) : icon;

    return html`
      <paper-menu-button slot="dropdown-trigger" .noAnimations=${true} @click="${e => e.stopPropagation()}">
        <paper-button slot="dropdown-trigger">
          <div class="tooltip">
            <ha-icon icon="${useIcon}"></ha-icon>
            <br />${value}${useUnit}
            <span class="tooltiptext">${tooltip}</span>
          </div>
        </paper-button>
        <paper-listbox
          slot="dropdown-content"
          selected=${selected}
          @click="${e => this.setServiceData(service, isRequest, e)}"
        >
          ${sources.map(
            item =>
              html`
                <paper-item value=${item}>${item}</paper-item>
              `,
          )}
        </paper-listbox>
      </paper-menu-button>
    `;
  }

  renderInfoItemsLeft(): TemplateResult | void {
    const { isOnline } = this.getEntities();
    return html`
      ${this.renderInfoItem(isOnline, localize('common.online'))}
    `;
  }

  renderInfoItemsRight(): TemplateResult | void {
    const { cableLocked, totalPower, voltage } = this.getEntities();
    const plugIcon = cableLocked && cableLocked.state == 'on' ? 'mdi:power-plug' : 'mdi:power-plug-off'
    return html`
      ${this.renderInfoItem(voltage, localize('common.voltage'), true)}
      ${this.renderInfoItem(totalPower, localize('common.power'))}
      <ha-icon icon="${plugIcon}"></ha-icon>
    `;
  }

  renderInfoItemsCompact(): TemplateResult | void {
    const { totalPower, voltage } = this.getEntities();
    return html`
      ${this.renderInfoItem(voltage, localize('common.voltage'), true)}
      ${this.renderInfoItem(totalPower, localize('common.power'), true)}
    `;
  }

  renderInfoItem(entity, tooltip, round = false): TemplateResult | void {
    if (entity === null || entity === undefined) {
      return html``;
    }
    const value = round ? Math.round(this.getEntityState(entity)) : this.getEntityState(entity);
    const useUnit = this.getEntityAttribute(entity, 'unit_of_measurement');
    const icon = this.renderIcon(entity);
    return html`
      <div class="infoitems-item"
        @click="${() => this.handleMore(entity)}"
        ?more-info="true">
        <div class="tooltip">
          <ha-icon icon="${icon}"></ha-icon>
          ${value} ${useUnit}
          <span class="tooltiptext">${tooltip}</span>
        </div>
      </div>
    `;
  }

  renderIcon(entity): TemplateResult | void {
    const entityId = entity.entity_id;
    const base = this.getEntityBase(entityId);
    const icon =
      this.getEntityAttribute(entity, 'icon') !== undefined
        ? this.getEntityAttribute(entity, 'icon')
        : (base === undefined ? null: cconst.ICONS[base]) || 'mdi:cancel';
    /**const domainIcon =
      this.getEntityAttribute(entity, 'device_class') == !null
        ? domainIcon(this.getEntityAttribute(entity, 'device_class'), this.getEntityState(entity))
        : false;
    return domainIcon || icon;*/
    return icon;
  }

  renderToolbar(state: string): TemplateResult | void {
    /* SHOW TOOLBAR */
    if (!this.showToolbar) {
      return html``;
    }

    /* CUSTOM BUTTONS FROM CONFIG */
    const { actions = [] } = this.config;
    const customButtons = actions.map(({ name, service, icon, serviceData }) => {
      return this.renderToolbarButton(service, icon, name, serviceData);
    });

    let stateButtons = html``;

    /* STATE BUTTONS */
    switch (state) {
      case cconst.CHARGERSTATUS.STANDBY_1: {
        stateButtons = html``;
        break;
      }
      case cconst.CHARGERSTATUS.PAUSED_2: {
        stateButtons = html`
          ${this.renderToolbarButton('enable', 'mdi:play', 'common.start')}
          ${this.renderToolbarButton('set_current', 'mdi:play-box-multiple', 'common.start', {
            current: 10,
          })}
          ${this.renderToolbarButton('set_current', 'mdi:animation-play', 'common.start', {
            current: 25,
          })}
          ${this.renderToolbarButton('set_current', 'mdi:play-speed', 'common.start', {
            current: 25,
          })}
        `;
        break;
      }
      case cconst.CHARGERSTATUS.CHARGING_3: {
        stateButtons = html`
          ${this.renderToolbarButton('disable', 'hass:stop', 'common.stop')}
        `;
        break;
      }
      case cconst.CHARGERSTATUS.READY_4: {
        stateButtons = html`
          ${this.renderToolbarButton('enable', 'hass:play', 'common.start')}
        `;
        break;
      }
      case cconst.CHARGERSTATUS.ERROR_5: {
        stateButtons = html``;
        break;
      }
      case cconst.CHARGERSTATUS.CONNECTED_6: {
        stateButtons = html`
          ${this.renderToolbarButton('disable', 'hass:stop', 'common.stop')}
        `;
        break;
      }
    }

    return html`
      <div class="toolbar">
        ${stateButtons}
        <div class="fill-gap"></div>
        ${customButtons}
      </div>
    `;
  }

  renderToolbarButton(service, icon, text, serviceData = {}, isRequest = true): TemplateResult | void {
    let useText = '';
    try {
      useText = localize(text);
    } catch (e) {
      useText = text;
    }
    return html`
      <div class="tooltip">
        <ha-icon-button
          icon="${icon}"
          title="${useText}"
          @click="${() => this.callService(service, isRequest, serviceData)}"
        ></ha-icon-button>
        <span class="tooltiptext">${useText}</span>
      </div>
    `;
  }

  renderCompact(): TemplateResult | void {
    const state = this.status; //  this.entity;
    return html`
      <ha-card>
        <div class="preview-compact">
          ${this.renderImage(state)}

          <div class="metadata">
            ${this.renderName()} ${this.renderStatus()}
          </div>

          <div class="infoitems">${this.renderInfoItemsCompact()}</div>

          ${this.renderStats(state)}
        </div>

        ${this.renderToolbar(state)}
      </ha-card>
    `;
  }

  renderFull(): TemplateResult | void {
    const state = this.status; //this.entity;

    return html`
      <ha-card>
        <div class="preview">
          <div class="header">
            <div class="infoitems-left">${this.renderInfoItemsLeft()}</div>

            <div class="infoitems">${this.renderInfoItemsRight()}</div>
          </div>

          ${this.renderImage(state)}

         <div class="metadata">
            ${this.renderName()} ${this.renderStatus()}
          </div>

          ${this.renderCollapsibleConfig()} ${this.renderCollapsibleInfo()} ${this.renderCollapsibleLimits()}
          ${this.renderStats(state)}
        </div>

        ${this.renderToolbar(state)}
      </ha-card>
    `;
  }

  renderCustomCardTheme(): TemplateResult | void {
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
              <div class="not-available">
                ${localize('common.not_available')}
              </div>
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

