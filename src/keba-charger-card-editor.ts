import { LitElement, html, TemplateResult, css, CSSResultGroup } from 'lit';
import { HomeAssistant, fireEvent, LovelaceCardEditor } from 'custom-card-helpers';

import { KebaChargerCardConfig } from './types';
import { customElement, property, state } from 'lit/decorators';

import { localize } from './localize/localize';
import * as cconst from './const';

@customElement('keba-charger-card-editor')
export class ChargerCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: KebaChargerCardConfig;
  @state() private _toggle?: boolean;
  @state() private _helpers?: any;
  private _initialized = false;

  public setConfig(config: KebaChargerCardConfig): void {
    this._config = config;

    if (!this._config.entity) {
      this._config.entity = this.getEntitiesByType('binary_sensor')[0] || '';
      this._config.smartChargingEntity = this.getEntitiesByType('input_boolean')[0] || '';
      fireEvent(this, 'config-changed', { config: this._config });
    }
    this.loadCardHelpers();
  }

  protected shouldUpdate(): boolean {
    if (!this._initialized) {
      this._initialize();
    }

    return true;
  }

  get _entity(): string {
    if (this._config) {
      return this._config.entity || '';
    }

    return '';
  }

  get _smartChargingEntity(): string {
    if (this._config) {
      return this._config.smartChargingEntity || '';
    }

    return '';
  }

  get _customImage(): string {
    if (this._config) {
      return this._config.customImage || '';
    }

    return '';
  }

  get _chargerImage(): string {
    if (this._config) {
      return this._config.chargerImage || cconst.DEFAULTIMAGE;
    }
    return cconst.DEFAULTIMAGE;
  }

  get _customCardTheme(): string {
    if (this._config) {
      return this._config.customCardTheme || '';
    }
    return cconst.DEFAULT_CUSTOMCARDTHEME;
  }

  private get showName(): boolean {
    if (this._config) {
      return this._config.show_name !== undefined ? this._config.show_name : true;
    }
    return true;
  }

  private get showLeds(): boolean {
    if (this._config) {
      return this._config.show_leds !== undefined ? this._config.show_leds : true;
    }
    return true;
  }

  private get showStatus(): boolean {
    if (this._config) {
      return this._config.show_status !== undefined ? this._config.show_status : true;
    }
    return true;
  }

  private get showToolbar(): boolean {
    if (this._config) {
      return this._config.show_toolbar !== undefined ? this._config.show_toolbar : true;
    }
    return true;
  }

  private get showStats(): boolean {
    if (this._config) {
      return this._config.show_stats !== undefined ? this._config.show_stats : true;
    }
    return true;
  }

  private get showCollapsibles(): boolean {
    if (this._config) {
      return this._config.show_collapsibles !== undefined ? this._config.show_collapsibles : true;
    }
    return true;
  }

  private get compactView(): boolean {
    if (this._config) {
      return this._config.compact_view !== undefined ? this._config.compact_view : false;
    }
    return false;
  }

  private getEntitiesByType(type: string) {
    return this.hass ? Object.keys(this.hass.states).filter(eid => eid.substr(0, eid.indexOf('.')) === type) : [];
  }

  render(): TemplateResult | void {
    if (!this.hass) {
      return html``;
    }

    const chargerEntities = Object.keys(this.hass.states).filter(
      eid => eid.substr(0, eid.indexOf('.')) === 'binary_sensor',
    );

    const smartChargingEntities = Object.keys(this.hass.states).filter(
      eid => eid.substr(0, eid.indexOf('.')) === 'input_boolean',
    );

    return html`
      <div class="card-config">

        <paper-dropdown-menu label="${localize('editor.entity')}" @value-changed=${
      this._valueChanged
    } .configValue=${'entity'}>
            <paper-listbox slot="dropdown-content" .selected=${chargerEntities.indexOf(this._entity)}>
              ${chargerEntities.map(entity => {
                return html`
                  <paper-item>${entity}</paper-item>
                `;
              })}
            </paper-listbox>
        </paper-dropdown-menu>

        <paper-dropdown-menu label="${localize('editor.smartChargingEntity')}" @value-changed=${
      this._valueChanged
    } .configValue=${'smartChargingEntity'}>
            <paper-listbox slot="dropdown-content" .selected=${smartChargingEntities.indexOf(
              this._smartChargingEntity,
            )}>
              ${smartChargingEntities.map(entity => {
                return html`
                  <paper-item>${entity}</paper-item>
                `;
              })}
            </paper-listbox>
        </paper-dropdown-menu>

        <paper-dropdown-menu label="${localize('editor.theme')}" @value-changed=${
      this._valueChanged
    } .configValue=${'customCardTheme'}>
            <paper-listbox slot="dropdown-content" selected="${this._customCardTheme}" attr-for-selected="value">
              ${cconst.CUSTOM_CARD_THEMES.map(customCardTheme => {
                return html`
                  <paper-item value="${customCardTheme.name}">${customCardTheme.name}</paper-item>
                `;
              })}
            </paper-listbox>
        </paper-dropdown-menu>


              <paper-dropdown-menu label="${localize('editor.chargerImage')}" @value-changed=${
      this._valueChanged
    } .configValue=${'chargerImage'}>
                <paper-listbox slot="dropdown-content" selected="${this._chargerImage}" attr-for-selected="value">
                  ${cconst.CHARGER_IMAGES.map(chargerImage => {
                    return html`
                      <paper-item value="${chargerImage.name}">${chargerImage.name}</paper-item>
                    `;
                  })}
                </paper-listbox>
              </paper-dropdown-menu>


              <paper-input label="${localize('editor.customImage')}" .value=${
      this._customImage
    } .configValue=${'customImage'} @value-changed=${this._valueChanged}"></paper-input>

          <p class="option">
            <ha-switch
              aria-label=${localize(
                this.compactView ? 'editor.compact_view_aria_label_off' : 'editor.compact_view_aria_label_on',
              )}
              .checked=${this.compactView !== false}
              .configValue=${'compact_view'}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${localize('editor.compact_view')}
          </p>

          <p class="option">
            <ha-switch
              aria-label=${localize(
                this.showName ? 'editor.show_name_aria_label_off' : 'editor.show_name_aria_label_on',
              )}
              .checked=${this.showName}
              .configValue=${'show_name'}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${localize('editor.show_name')}
          </p>

          <p class="option">
            <ha-switch
              aria-label=${localize(
                this.showLeds ? 'editor.show_leds_aria_label_off' : 'editor.show_leds_aria_label_on',
              )}
              .checked=${this.showLeds !== false}
              .configValue=${'show_leds'}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${localize('editor.show_leds')}
          </p>


          <p class="option">
            <ha-switch
              aria-label=${localize(
                this.showStatus ? 'editor.show_status_aria_label_off' : 'editor.show_status_aria_label_on',
              )}
              .checked=${this.showStatus !== false}
              .configValue=${'show_status'}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${localize('editor.show_status')}
          </p>

          <p class="option">
          <ha-switch
            aria-label=${localize(
              this.showCollapsibles
                ? 'editor.show_collapsibles_aria_label_off'
                : 'editor.show_collapsibles_aria_label_on',
            )}
            .checked=${this.showCollapsibles !== false}
            .configValue=${'show_collapsibles'}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${localize('editor.show_collapsibles')}
        </p>

          <p class="option">
            <ha-switch
              aria-label=${localize(
                this.showStats ? 'editor.show_stats_aria_label_off' : 'editor.show_stats_aria_label_on',
              )}
              .checked=${this.showStats}
              .configValue=${'show_stats'}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${localize('editor.show_stats')}
          </p>




          <p class="option">
            <ha-switch
              aria-label=${localize(
                this.showToolbar ? 'editor.show_toolbar_aria_label_off' : 'editor.show_toolbar_aria_label_on',
              )}
              .checked=${this.showToolbar !== false}
              .configValue=${'show_toolbar'}
              @change=${this._valueChanged}
            >
            </ha-switch>
            ${localize('editor.show_toolbar')}
          </p>


        </div>
      `;
  }

  private _initialize(): void {
    if (this.hass === undefined) return;
    if (this._config === undefined) return;
    if (this._helpers === undefined) return;
    this._initialized = true;
  }

  private async loadCardHelpers(): Promise<void> {
    this._helpers = await (window as any).loadCardHelpers();
  }

  _valueChanged(ev): void {
    if (!this._config || !this.hass) {
      console.log('C: no config');
      return;
    }
    const target = ev.target;

    if (this[`_${target.configValue}`] === target.value) {
      return;
    }
    if (target.configValue) {
      if (target.value === '') {
        delete this._config[target.configValue];
      } else {
        this._config = {
          ...this._config,
          [target.configValue]: target.checked !== undefined ? target.checked : target.value,
        };
      }
    }
    fireEvent(this, 'config-changed', { config: this._config });
  }

  static get styles(): CSSResultGroup {
    return css`
      .card-config paper-dropdown-menu {
        width: 100%;
      }

      .option {
        display: flex;
        align-items: center;
      }

      .option ha-switch {
        margin-right: 10px;
      }
    `;
  }
}
