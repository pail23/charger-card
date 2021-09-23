# Keba Charger Card

[![hacs][hacs-image]][hacs-url]
[![Buy Me A Coffee][buymeacoffee-image]][buymeacoffee-url]

> Keba Charger card for [Home Assistant][home-assistant] Lovelace UI

By default, Home Assistant does not provide any card for controlling chargers for electrical vehicles (EVs). This card displays the state and allows to control your charger.

![Preview of keba-charger-card][preview-image]

## Installing

**💡 Tip:** If you like this project consider buying me a cup of ☕️:

<a href="https://www.buymeacoffee.com/tmjo" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/default-black.png" alt="Buy Me A Coffee" width="150px">
</a>

### HACS

This card is not yet available as default in [HACS][hacs] (Home Assistant Community Store), but can still be installed through HACS by adding this repository as a custom repository inside HACS settings.

### Manual

1. Download `keba-charger-card.js` file from the [latest-release].
2. Put `keba-charger-card.js` file into your `config/www` folder.
3. Add reference to `keba-charger-card.js` in Lovelace. There are two ways to do that:
   1. **Using UI:** _Configuration_ → _Lovelace Dashboards_ → _Resources_ → Click Plus button → Set _Url_ as `/local/keba-charger-card.js` → Set _Resource type_ as `JavaScript Module`.
   2. **Using YAML:** Add following code to `lovelace` section.
      ```yaml
      resources:
        - url: /local/keba-charger-card.js
          type: module
      ```
4. Add `custom:keba-charger-card` to Lovelace UI as any other card (using either editor or YAML configuration).

## Using the card

This card can be configured using Lovelace UI editor.

1. In Lovelace UI, click 3 dots in top left corner.
2. Click _Configure UI_.
3. Click Plus button to add a new card.
4. Find _Custom: Charger Card_ in the list.
5. Choose `entity` and select the main status sensor of your charger.
6. Now you should see the preview of the card!
7. Do your customizations in UI editor or manually in code editor.

_Sorry, there is no support for `actions` and `stats` in visual UI editor yet._

Typical example of using this card in YAML config would look like this:

```yaml
type: 'custom:keba-charger-card'
entity: binary_sensor.keba_p30_status
```

Here is what every option means:

| Name                |   Type    | Default      | Description                                                                                                         |
| ------------------- | :-------: | ------------ | ------------------------------------------------------------------------------------------------------------------- |
| `type`              | `string`  | **Required** | `custom:keba-charger-card`                                                                                          |
| `entity`            | `string`  | **Required** | An entity_id within the `sensor` domain. Must be the main status of your charger.                                   |
| `customCardTheme`   | `string`  | Optional     | Select a custom theme of colors, or use "theme_custom" to apply the theme you use in HA                             |
| `chargerImage`      | `string`  | Anthracite   | Select a charger image from defaults                                                                                |
| `customImage`       | `string`  | Optional     | Path to custom image of your charger. Better to have `png` or `svg`. This will override the chargerImage selection. |
| `compact_view`      | `boolean` | `false`      | Show compact view of the card.                                                                                      |
| `show_name`         | `boolean` | `true`       | Show friendly name of the charger.                                                                                  |
| `show_leds`         | `boolean` | `true`       | Show status leds for the charger, fits best with Easee chargers.                                                    |
| `show_status`       | `boolean` | `true`       | Show status of the charger.                                                                                         |
| `show_collapsibles` | `boolean` | `true`       | Show collapsible menu buttons                                                                                       |
| `show_toolbar`      | `boolean` | `true`       | Show toolbar with actions.                                                                                          |
| `show_stats`        | `boolean` | `true`       | Show data table (stats). If not modified in `stats`, default values are shown.                                      |
| `stats`             | `object`  | Optional     | Custom per state stats for your charger or something else, leave empty for default data fields                      |
| `actions`           | `object`  | Optional     | Custom actions for your charger.                                                                                    |

### `stats` object

In addition to the charger info, you can use any sensor or sensor attribute of your choosing to be shown in the stats data table section:

| Name        |   Type   | Default  | Description                                              |
| ----------- | :------: | -------- | -------------------------------------------------------- |
| `entity_id` | `string` | Optional | An entity_id with state, i.e. `easee_status`.            |
| `attribute` | `string` | Optional | Attribute name of the stat, i.e. `circuit_ratedCurrent`. |
| `unit`      | `string` | Optional | Unit of measure, i.e. `A`.                               |
| `subtitle`  | `string` | Optional | Friendly name of the stat, i.e. `Rated Current`.         |

### `actions` object

You can define [custom scripts][ha-scripts] or use services for custom actions and add them to this card with `actions` option.

| Name           |   Type   | Default                           | Description                                             |
| -------------- | :------: | --------------------------------- | ------------------------------------------------------- |
| `name`         | `string` | Optional                          | Friendly name of the action, i.e. `Update FW`.          |
| `service`      | `string` | Optional                          | A service to call, i.e. `easee.update_firmware`.        |
| `icon`         | `string` | Optional                          | Any icon for action button.                             |
| `service_data` | `object` | `service_data` for `service` call | Verify necessary data in HA Developer Tools -> Services |

## Features

- Animations: If choosing the default images of Easee chargers in any color, you can also choose to show leds which will behave according to charger status. This is identical to how the charger looks physically and similar to the Easee app and web site. Two leds for standby, all leds when connected, flashing while charging and so on. If SmartCharging is enabled, leds will be blue.
- Collapsible menu buttons: Click on one of the menu buttons (if you enabled them) to get more info, config or limit settings.
- Possibility to set current limits from UI
- Stats items (data table) will depend on charger status and show most relevant information unless you choose to customize it
- Action items on toolbar will depend on charger status and show most relevant actions. Custom actions are added in addition to defaults.

## Supported languages

This card supports translations. Please, help to add more translations and improve existing ones. Here's a list of supported languages:

- English
- Norsk bokmål (Norwegian)
- Svenska (by [jockesoft](https://github.com/jockesoft))
- German (by [DeerMaximum](https://github.com/DeerMaximum))
- [_Your language?_][add-translation]

## Supported models

This card currently supports charging robots from <a href='https://easee-international.com/'>Easee</a>. It could be modified to support basically any charger, but adoptions of the code will be necessary since there is no platform in Home Assistant for chargers making the interface identical.

Supported chargers:

- Easee
- [_Your charger?_][edit-readme]

## Development

Want to contribute to the project?

First of all, thanks! Check [contributing guideline](./CONTRIBUTING.md) for more information.

## Inspiration

This project is heavily inspired by:

- <a href="https://github.com/denysdovhan" target="_blank">denysdovhan</a> for inspiration to this card, the ideas are taken from his <a href="https://github.com/denysdovhan/vacuum-card" target="_blank">vacuum card</a>. Make sure to <a href="https://www.buymeacoffee.com/denysdovhan" target="_blank">buy him a coffee</a> too!

Huge thanks for the ideas and efforts 👍

## License

MIT © [Tor Magne Johannessen][tmjo]

<!-- Badges -->

[npm-url]: https://npmjs.org/package/keba-charger-card
[hacs-url]: https://github.com/custom-components/hacs
[hacs-image]: https://img.shields.io/badge/HACS-Custom-orange.svg
[buymeacoffee-url]: https://www.buymeacoffee.com/tmjo
[buymeacoffee-image]: https://img.shields.io/badge/support-buymeacoffee-222222.svg?style=flat-square

<!-- References -->

[home-assistant]: https://www.home-assistant.io/
[hacs]: https://hacs.xyz
[preview-image]: https://user-images.githubusercontent.com/54450177/97765425-56874900-1b12-11eb-9c0c-87721e0b5748.png
[latest-release]: https://github.com/tmjo/lovelace-charger-card/releases/latest
[ha-scripts]: https://www.home-assistant.io/docs/scripts/
[edit-readme]: https://github.com/tmjo/lovelace-charger-card/edit/master/README.md
[add-translation]: https://github.com/tmjo/lovelace-charger-card/tree/master/src/translations
[tmjo]: https://github.com/tmjo
