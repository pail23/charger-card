import { LovelaceCard, LovelaceCardConfig, LovelaceCardEditor } from 'custom-card-helpers';

declare global {
  interface HTMLElementTagNameMap {
    'keba-charger-card-editor': LovelaceCardEditor;
    'hui-error-card': LovelaceCard;
  }
}

// TODO Add your configuration elements here for type-checking
export interface KebaChargerCardConfig extends LovelaceCardConfig {
  type: string;
  name?: string;
  entity?: string;
  smartChargingEntity?: string;
  chargerImage?: string;
  domain?: string;
  customCardTheme?: string;
  show_leds?: boolean;
  show_name?: boolean;
  show_status?: boolean;
  show_stats?: boolean;
  show_collapsibles?: boolean;
  show_toolbar?: boolean;
  compact_view?: boolean;
}
