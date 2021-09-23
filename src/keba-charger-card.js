import { LitElement, html } from 'lit-element';
import { hasConfigOrEntityChanged, fireEvent } from 'custom-card-helpers';
import './keba-charger-card-editor';
import localize from './localize';
import styles from './styles';
import * as cconst from './const';

if (!customElements.get('ha-icon-button')) {
  customElements.define(
    'ha-icon-button',
    class extends customElements.get('paper-icon-button') {}
  );
}

class ChargerCard extends LitElement {
  static get properties() {
    return {
      hass: Object,
      config: Object,
      requestInProgress: Boolean,
    };
  }

  static get styles() {
    return styles;
  }

  static async getConfigElement() {
    return document.createElement('charger-card-editor');
  }

  static getStubConfig(hass, entities) {
    const [chargerEntity] = entities.filter(
      (eid) => eid.substr(0, eid.indexOf('.')) === 'sensor'
    );

    return {
      entity: chargerEntity || '',
      image: 'default',
    };
  }

  get entity() {
    return this.hass.states[this.config.entity];
  }

  get chargerId() {
    return this.hass.states[this.config.entity].attributes['id'];
  }

  get chargerDomain() {
    // if (this.config.domain === undefined) {
    return cconst.CHARGERDOMAIN;
    // }
  }

  get status() {
    const pluggedIn = this.getEntityState(
      this.getEntity(cconst.ENTITIES.cableLocked)
    );
    // console.log(pluggedIn);
    if (pluggedIn == 'off') {
      return cconst.CHARGERSTATUS.STANDBY_1;
    }
    const chargingState = this.getEntityState(
      this.getEntity(cconst.ENTITIES.chargingState)
    );
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

  get usedChargerLimit() {
    const {
      dynamicChargerCurrent,
      dynamicCircuitCurrent,
      maxChargerCurrent,
      maxCircuitCurrent,
    } = this.getEntities();
    const circuitRatedCurrent = this.hass.states[this.config.entity].attributes[
      'circuit_ratedCurrent'
    ];
    const usedChargerLimit = Math.min(
      this.getEntityState(dynamicChargerCurrent),
      this.getEntityState(dynamicCircuitCurrent),
      this.getEntityState(maxChargerCurrent),
      this.getEntityState(maxCircuitCurrent),
      circuitRatedCurrent
    );
    return usedChargerLimit;
  }

  get image() {
    let imgselected = this.config.chargerImage || cconst.DEFAULTIMAGE;

    const chargerImage = cconst.CHARGER_IMAGES.find(({ name }) => {
      if (name === imgselected) {
        return name;
      }
    });

    if (
      this.config.customImage === undefined ||
      this.config.customImage === ''
    ) {
      try {
        return chargerImage.img;
      } catch (err) {
        return null;
      }
    }
    return this.config.customImage;
  }

  get customCardTheme() {
    if (this.config.customCardTheme === undefined) {
      return cconst.DEFAULT_CUSTOMCARDTHEME;
    }
    return this.config.customCardTheme;
  }

  get showLeds() {
    if (this.config.show_leds === undefined) {
      return true;
    }
    return this.config.show_leds;
  }

  get showName() {
    if (this.config.show_name === undefined) {
      return true;
    }
    return this.config.show_name;
  }

  get showStatus() {
    if (this.config.show_status === undefined) {
      return true;
    }
    return this.config.show_status;
  }

  get showStats() {
    if (this.config.show_stats === undefined) {
      return true;
    }
    return this.config.show_stats;
  }

  get showCollapsibles() {
    if (this.config.show_collapsibles === undefined) {
      return true;
    }
    return this.config.show_collapsibles;
  }

  get showToolbar() {
    if (this.config.show_toolbar === undefined) {
      return true;
    }
    return this.config.show_toolbar;
  }

  get compactView() {
    if (this.config.compact_view === undefined) {
      return false;
    }
    return this.config.compact_view;
  }
  get useStatsDefault() {
    if (this.config.stats === undefined) {
      return true;
    }
    return false;
  }

  get entityBasename() {
    return this.config.entity
      .split('.')[1]
      .replace(cconst.STATUS_ENTITY_BASE, '');
  }

  getEntityId(entity_base) {
    try {
      return (
        entity_base.split('.')[0] +
        '.' +
        this.entityBasename +
        '_' +
        entity_base.split('.')[1]
      );
    } catch (err) {
      return null;
    }
  }

  getEntityBase(entity_id) {
    try {
      return (
        entity_id.split('.')[0] +
        '.' +
        entity_id.split('.')[1].replace(this.entityBasename + '_', '')
      );
    } catch (err) {
      return null;
    }
  }

  getEntities() {
    const cableLocked = this.getEntity(cconst.ENTITIES.cableLocked);
    const cableLockedPermanently = this.getEntity(
      cconst.ENTITIES.cableLockedPermanently
    );
    const chargingState = this.getEntity(cconst.ENTITIES.chargingState);
    const basicSchedule = this.getEntity(cconst.ENTITIES.basicSchedule);
    const circuitCurrent = this.getEntity(cconst.ENTITIES.circuitCurrent);
    const costPerKwh = this.getEntity(cconst.ENTITIES.costPerKwh);
    const dynamicChargerCurrent = this.getEntity(
      cconst.ENTITIES.dynamicChargerCurrent
    );
    const dynamicCircuitCurrent = this.getEntity(
      cconst.ENTITIES.dynamicCircuitCurrent
    );
    const enableIdleCurrent = this.getEntity(cconst.ENTITIES.enableIdleCurrent);
    const offlineCircuitCurrent = this.getEntity(
      cconst.ENTITIES.offlineCircuitCurrent
    );
    const inCurrent = this.getEntity(cconst.ENTITIES.inCurrent);
    const isEnabled = this.getEntity(cconst.ENTITIES.isEnabled);
    const maxChargerCurrent = this.getEntity(cconst.ENTITIES.maxChargerCurrent);
    const maxCircuitCurrent = this.getEntity(cconst.ENTITIES.maxCircuitCurrent);
    const isOnline = this.getEntity(cconst.ENTITIES.isOnline);
    const outputCurrent = this.getEntity(cconst.ENTITIES.outputCurrent);
    const reasonForNoCurrent = this.getEntity(
      cconst.ENTITIES.reasonForNoCurrent
    );
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

  getEntity(entity_base) {
    try {
      return this.hass.states[this.getEntityId(entity_base)];
    } catch (err) {
      return null;
    }
  }

  getEntityState(entity) {
    try {
      return entity.state;
    } catch (err) {
      return null;
    }
  }

  getEntityAttribute(entity_base, attribute) {
    try {
      return entity_base.attributes[attribute];
    } catch (err) {
      return null;
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

  getStatsDefault(state) {
    console.log('getStatsDefault ' + state);
    switch (state) {
      case cconst.CHARGERSTATUS.STANDBY_1: {
        return [
          {
            entity_id: this.getEntityId(cconst.ENTITIES.sessionEnergy),
            unit: 'kWh',
            subtitle: localize('charger_status.sessionEnergy'),
          },
          {
            calcValue: this.usedChargerLimit,
            unit: 'A',
            subtitle: 'Current Limit',
          },
          {
            entity_id: this.getEntityId(cconst.ENTITIES.cableLocked),
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
            entity_id: this.getEntityId(cconst.ENTITIES.sessionEnergy),
            unit: 'kWh',
            subtitle: localize('charger_status.sessionEnergy'),
          },
          {
            entity_id: this.getEntityId(cconst.ENTITIES.smartCharging),
            unit: '',
            subtitle: 'Smart Charging',
          },
        ];
      }
      case cconst.CHARGERSTATUS.CHARGING_3: {
        return [
          {
            entity_id: this.getEntityId(cconst.ENTITIES.sessionEnergy),
            unit: 'kWh',
            subtitle: 'Energy',
          },
          {
            entity_id: this.getEntityId(cconst.ENTITIES.energyPerHour),
            unit: 'kWh/h',
            subtitle: 'Rate',
          },
          {
            entity_id: this.getEntityId(cconst.ENTITIES.circuitCurrent),
            unit: 'A',
            subtitle: 'Circuit',
          },
          {
            entity_id: this.getEntityId(cconst.ENTITIES.outputCurrent),
            unit: 'A',
            subtitle: 'Allowed',
          },
          {
            entity_id: this.getEntityId(cconst.ENTITIES.inCurrent),
            unit: 'A',
            subtitle: 'Actual',
          },
          {
            entity_id: this.getEntityId(cconst.ENTITIES.totalPower),
            unit: 'kW',
            subtitle: 'Power',
          },
        ];
      }
      case cconst.CHARGERSTATUS.READY_4: {
        return [
          {
            entity_id: this.getEntityId(cconst.ENTITIES.sessionEnergy),
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
            entity_id: this.getEntityId(cconst.ENTITIES.sessionEnergy),
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
            entity_id: this.getEntityId(cconst.ENTITIES.sessionEnergy),
            unit: 'kWh',
            subtitle: localize('charger_status.sessionEnergy'),
          },
          {
            calcValue: this.usedChargerLimit,
            unit: 'A',
            subtitle: 'Current Limit',
          },
          {
            entity_id: this.getEntityId(cconst.ENTITIES.basicSchedule),
            unit: '',
            subtitle: 'Schedule',
          },
        ];
      }
    }
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
      changedProps.get('hass') &&
      changedProps.get('hass').states[this.config.entity].state !==
        this.hass.states[this.config.entity].state
    ) {
      this.requestInProgress = false;
    }
  }

  handleMore(entity = this.entity) {
    fireEvent(
      this,
      'hass-more-info',
      {
        entityId: entity.entity_id,
      },
      {
        bubbles: true,
        composed: true,
      }
    );
  }

  setServiceData(service, isRequest, e) {
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
      charger_id: this.chargerId,
      ...options,
    });

    if (isRequest) {
      // this.requestInProgress = true; //TODO: Removed, must be improved to check all sensors
      this.requestUpdate();
    }
  }

  getAttributes(entity) {
    const {
      status,
      state,
      friendly_name,
      name,
      site_name,
      icon,
    } = entity.attributes;

    return {
      status: status || state,
      friendly_name,
      name,
      site_name,
      icon,
    };
  }

  imageLed(state, smartCharging) {
    let chargingMode = 'normal';
    if (smartCharging == 'on') {
      chargingMode = 'smart';
    }
    return (
      cconst.LEDIMAGES[chargingMode][state] ||
      cconst.LEDIMAGES[chargingMode]['DEFAULT']
    );
  }

  renderImage(state) {
    let compactview = '';
    if (this.compactView) {
      compactview = '-compact';
    }

    if (!this.image) {
      return html``;
    }
    return html` <img
        class="charger${compactview}"
        src="${this.image}"
        @click="${() => this.handleMore()}"
        ?more-info="true"
      />${this.renderLeds(state)}`;
  }

  renderLeds(state) {
    if (this.showLeds) {
      let compactview = '';
      if (this.compactView) {
        compactview = '-compact';
      }

      const smartCharging = this.getEntityState(
        this.getEntity(cconst.ENTITIES.smartCharging)
      );
      return html`<img
        class="charger led${compactview}"
        src="${this.imageLed(state, smartCharging)}"
        @click="${() => this.handleMore()}"
        ?more-info="true"
      /> `;
    }
    return html``;
  }

  renderStats(state) {
    /* SHOW DATATABLE */
    if (!this.showStats) {
      return html``;
    }
    let compactview = '';
    if (this.compactView) {
      compactview = '-compact';
    }

    /* DEFAULT DATATABLE */
    if (this.useStatsDefault) {
      const statsList = this.getStatsDefault(state) || [];
      return html`<div class="stats${compactview}">
        ${this.renderStatsList(state, statsList)}
      </div>`;
      /* CUSTOM DATATABLE */
    } else {
      const { stats = {} } = this.config;
      const statsList = stats[state] || stats.default || [];
      return html`<div class="stats${compactview}">
        ${this.renderStatsList(state, statsList)}
      </div>`;
    }
  }

  renderStatsList(state, statsList) {
    return statsList.map(
      ({ entity_id, attribute, calcValue, unit, subtitle }) => {
        if (!entity_id && !attribute && !calcValue) {
          return html``;
        } else if (calcValue) {
          return this.renderStatsHtml(calcValue, unit, subtitle);
        }
        this.getEntity();
        try {
          const value = attribute
            ? this.hass.states[entity_id].attributes[attribute]
            : this.hass.states[entity_id].state;
          return this.renderStatsHtml(
            value,
            unit,
            subtitle,
            this.hass.states[entity_id]
          );
        } catch (err) {
          return null;
        }
      }
    );
  }

  renderStatsHtml(value, unit, subtitle, entity = this.entity) {
    return html`
      <div
        class="stats-block"
        @click="${() => this.handleMore(entity)}"
        ?more-info="true"
      >
        <span class="stats-value">${value}</span>
        ${unit}
        <div class="stats-subtitle">${subtitle}</div>
      </div>
    `;
  }

  renderName() {
    //    const { name, site_name } = this.getAttributes(this.entity);
    if (!this.showName) {
      return html``;
    }

    let compactview = '';
    if (this.compactView) {
      compactview = '-compact';
    }

    return html`
      <div
        class="charger-name${compactview}"
        @click="${() => this.handleMore()}"
        ?more-info="true"
      >
        Keba P30
      </div>
    `;
  }

  renderStatus() {
    if (!this.showStatus) {
      return html``;
    }

    let compactview = '';
    if (this.compactView) {
      compactview = '-compact';
    }

    const localizedStatus = localize(`status.${this.status}`) || this.status;

    return html`
      <div
        class="status${compactview}"
        @click="${() => this.handleMore()}"
        ?more-info="true"
      >
        <span class="status-text${compactview}" alt=${localizedStatus}>
          ${localizedStatus}
        </span>
        <ha-circular-progress
          .active=${this.requestInProgress}
          size="small"
        ></ha-circular-progress>
      </div>
    `;
  }

  renderCollapsibleConfig() {
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
    let localizedClickForConfig = localize('common.click_for_config');

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
            ${this.renderCollapsibleItems(
              cableLockedPermanently,
              'Permanently Locked'
            )}
            ${this.renderCollapsibleItems(cableLocked, 'Locked')}
            ${this.renderCollapsibleItems(smartCharging, 'Smart Charging')}
          </div>
        </div>
      </div>
    `;
  }

  renderCollapsibleInfo() {
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

    let localizedClickForStatus = localize('common.click_for_info');

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
            ${this.renderCollapsibleItems(
              voltage,
              localize('common.voltage'),
              true
            )}
            ${this.renderCollapsibleItems(totalPower, localize('common.power'))}
            ${this.renderCollapsibleItems(
              inCurrent,
              localize('common.charger_current'),
              true
            )}
            ${this.renderCollapsibleItems(
              circuitCurrent,
              localize('common.circuit_current'),
              true
            )}
            ${this.renderCollapsibleItems(
              energyPerHour,
              localize('common.energy_per_hour')
            )}
            ${this.renderCollapsibleItems(
              sessionEnergy,
              localize('charger_status.sessionEnergy')
            )}
            ${this.renderCollapsibleItems(
              energyLifetime,
              localize('common.lifetime_energy'),
              true
            )}
          </div>
        </div>
      </div>
    `;
  }

  renderCollapsibleLimits() {
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
    let localizedClickForLimits = localize('common.click_for_limits');

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
              'Max Charger',
              undefined,
              'Max Charger Limit',
              true
            )}
            ${this.renderCollapsibleDropDownItems(
              dynamicChargerCurrent,
              cconst.SERVICES.chargerDynCurrent,
              'Dyn Charger',
              undefined,
              'Dyn Charger Limit',
              true
            )}
            ${this.renderCollapsibleDropDownItems(
              maxCircuitCurrent,
              cconst.SERVICES.circuitMaxCurrent,
              'Max Circuit',
              undefined,
              'Max Circuit Limit',
              true
            )}
            ${this.renderCollapsibleDropDownItems(
              dynamicCircuitCurrent,
              cconst.SERVICES.circuitDynCurrent,
              'Dyn Circuit',
              undefined,
              'Dyn Circuit Limit',
              true
            )}
            ${this.renderCollapsibleDropDownItems(
              offlineCircuitCurrent,
              cconst.SERVICES.circuitOfflineCurrent,
              'Off Lim',
              undefined,
              'Offline Limit',
              true
            )}
          </div>
        </div>
      </div>
    `;
  }

  renderCollapsibleItems(entity, tooltip, round = false) {
    if (entity === null || entity === undefined) {
      return html`x`;
    }

    let value = this.getEntityState(entity);
    let icon = this.renderIcon(entity);
    let useUnit = this.getEntityAttribute(entity, 'unit_of_measurement');
    if (round) {
      value = Math.round(value);
    }
    return html`
      <div
        class="collapsible-item"
        @click="${() => this.handleMore(entity)}"
        ?more-info="true"
      >
        <div class="tooltip">
          <ha-icon icon="${icon}"></ha-icon>
          <br />${value} ${useUnit}
          <span class="tooltiptext">${tooltip}</span>
        </div>
      </div>
    `;
  }

  renderCollapsibleServiceItems(
    entity,
    service,
    text,
    icon,
    tooltip,
    isRequest = true,
    options = {}
  ) {
    let useIcon = icon;
    if (icon === null || icon === undefined) {
      useIcon = this.renderIcon(entity);
    }

    return html`
      <div
        class="collapsible-item"
        @click="${() => this.callService(service, isRequest, options)}"
      >
        <div class="tooltip">
          <ha-icon icon="${useIcon}"></ha-icon>
          <br />${text}
          <span class="tooltiptext">${tooltip}</span>
        </div>
      </div>
    `;
  }

  renderCollapsibleDropDownItems(
    entity,
    service,
    text,
    icon,
    tooltip,
    isRequest = true
  ) {
    if (entity === null || entity === undefined) {
      return html``;
    }

    const sources = cconst.CURRENTLIMITS;
    let value = this.getEntityState(entity);
    let selected = sources.indexOf(value);
    let useUnit = this.getEntityAttribute(entity, 'unit_of_measurement');
    let useIcon = icon === undefined ? this.renderIcon(entity) : icon;

    return html`
      <paper-menu-button
        slot="dropdown-trigger"
        .noAnimations=${true}
        @click="${(e) => e.stopPropagation()}"
      >
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
          @click="${(e) => this.setServiceData(service, isRequest, e)}"
        >
          ${sources.map(
            (item) => html`<paper-item value=${item}>${item}</paper-item>`
          )}
        </paper-listbox>
      </paper-menu-button>
    `;
  }

  renderInfoItemsLeft() {
    const { isOnline } = this.getEntities();
    return html` ${this.renderInfoItem(isOnline, localize('common.online'))} `;
  }

  renderInfoItemsRight() {
    const { totalPower, voltage } = this.getEntities();
    return html`
      ${this.renderInfoItem(voltage, localize('common.voltage'), true)}
      ${this.renderInfoItem(totalPower, localize('common.power'))}
    `;
  }

  renderInfoItemsCompact() {
    const { totalPower, voltage } = this.getEntities();
    return html`
      ${this.renderInfoItem(voltage, localize('common.voltage'), true)}
      ${this.renderInfoItem(totalPower, localize('common.power'), true)}
    `;
  }

  renderInfoItem(entity, tooltip, round = false) {
    if (entity === null || entity === undefined) {
      return html``;
    }
    let value = this.getEntityState(entity);
    let useUnit = this.getEntityAttribute(entity, 'unit_of_measurement');
    let icon = this.renderIcon(entity);
    if (round) {
      value = Math.round(value);
    }
    return html`
      <div
        class="infoitems-item"
        @click="${() => this.handleMore(entity)}"
        ?more-info="true"
      >
        <div class="tooltip">
          <ha-icon icon="${icon}"></ha-icon>
          ${value} ${useUnit}
          <span class="tooltiptext">${tooltip}</span>
        </div>
      </div>
    `;
  }

  renderIcon(entity) {
    let entity_id = entity.entity_id;
    let icon =
      this.getEntityAttribute(entity, 'icon') == !null
        ? this.getEntityAttribute(entity, 'icon')
        : cconst.ICONS[this.getEntityBase(entity_id)] || 'mdi:cancel';
    let domainIcon =
      this.getEntityAttribute(entity, 'device_class') == !null
        ? domainIcon(
            this.getEntityAttribute(entity, 'device_class'),
            this.getEntityState(entity)
          )
        : false;
    return domainIcon || icon;
  }

  renderToolbar(state) {
    /* SHOW TOOLBAR */
    if (!this.showToolbar) {
      return html``;
    }

    /* CUSTOM BUTTONS FROM CONFIG */
    const { actions = [] } = this.config;
    const customButtons = actions.map(
      ({ name, service, icon, service_data }) => {
        return this.renderToolbarButton(service, icon, name, service_data);
      }
    );

    let stateButtons = html``;

    /* STATE BUTTONS */
    switch (state) {
      case cconst.CHARGERSTATUS.STANDBY_1: {
        stateButtons = html``;
        break;
      }
      case cconst.CHARGERSTATUS.PAUSED_2: {
        stateButtons = html`
          ${this.renderToolbarButton('disable', 'hass:stop', 'common.stop')}
          ${this.renderToolbarButton(
            'enable',
            'hass:play-pause',
            'common.continue'
          )}
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
          ${this.renderToolbarButton('disable', 'hass:stop', 'common.stop')}
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

  renderToolbarButton(
    service,
    icon,
    text,
    service_data = {},
    isRequest = true
  ) {
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
          @click="${() => this.callService(service, isRequest, service_data)}"
        ></ha-icon-button>
        <span class="tooltiptext">${useText}</span>
      </div>
    `;
  }

  renderCompact() {
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

  renderFull() {
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

          ${this.renderCollapsibleConfig()} ${this.renderCollapsibleInfo()}
          ${this.renderCollapsibleLimits()} ${this.renderStats(state)}
        </div>

        ${this.renderToolbar(state)}
      </ha-card>
    `;
  }

  renderCustomCardTheme() {
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

  render() {
    this.renderCustomCardTheme();

    if (!this.entity) {
      return html`
        <ha-card>
          <div class="preview not-available">
            <div class="metadata">
              <div class="not-available">
                ${localize('common.not_available')}
              </div>
            <div>
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

customElements.define('keba-charger-card', ChargerCard);
console.info(
  `%cKEBA-CHARGER-CARD ${cconst.VERSION} IS INSTALLED`,
  'color: green; font-weight: bold',
  ''
);

window.customCards = window.customCards || [];
window.customCards.push({
  preview: true,
  type: 'keba-charger-card',
  name: localize('common.name'),
  description: localize('common.description'),
});
