import { css } from 'lit';

export default css`
  :host {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  ha-card {
    flex-direction: column;
    flex: 1;
    position: relative;
    padding: 0px;
    // border-radius: 4px;
    // overflow: hidden;    // Removed to show tooltips outside of card

    // border-color: coral;
    // border-style: solid;
  }

  .preview {
    background: var(--custom-card-background-color); //var(--custom-primary-color);
    cursor: pointer;
    overflow: hidden;
    position: relative;

    // border-color: yellow;
    // border-style: solid;
  }

  .preview-compact {
    background: var(--custom-card-background-color); //var(--custom-primary-color);
    cursor: pointer;
    overflow: hidden;
    position: relative;
    height: 220px;

    // border-color: yellow;
    // border-style: solid;
  }

  .preview.not-available {
    filter: grayscale(1);
  }

  @keyframes cleaning {
    0% {
      transform: rotate(0) translate(0);
    }
    5% {
      transform: rotate(0) translate(0, -10px);
    }
    10% {
      transform: rotate(0) translate(0, 5px);
    }
    15% {
      transform: rotate(0) translate(0);
    }
    /* Turn left */
    20% {
      transform: rotate(30deg) translate(0);
    }
    25% {
      transform: rotate(30deg) translate(0, -10px);
    }
    30% {
      transform: rotate(30deg) translate(0, 5px);
    }
    35% {
      transform: rotate(30deg) translate(0);
    }
    40% {
      transform: rotate(0) translate(0);
    }
    /* Turn right */
    45% {
      transform: rotate(-30deg) translate(0);
    }
    50% {
      transform: rotate(-30deg) translate(0, -10px);
    }
    55% {
      transform: rotate(-30deg) translate(0, 5px);
    }
    60% {
      transform: rotate(-30deg) translate(0);
    }
    70% {
      transform: rotate(0deg) translate(0);
    }
    /* Staying still */
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes returning {
    0% {
      transform: rotate(0);
    }
    25% {
      transform: rotate(10deg);
    }
    50% {
      transform: rotate(0);
    }
    75% {
      transform: rotate(-10deg);
    }
    100% {
      transform: rotate(0);
    }
  }

  .charger {
    display: block;
    max-width: 90%;
    max-height: 300px;
    image-rendering: crisp-edges;
    margin: 30px auto 20px auto;

    // border-color: red;
    // border-style: dashed;
  }

  .charger-compact {
    display: block;
    // max-width: 50%;
    // width: 130px;
    max-width: 400px;
    max-height: 130px;
    image-rendering: crisp-edges;
    margin: 20px auto 10px 20px;
    position: absolute;
    // left: -150px;
    // top: -20px;
    left: 10px;
    top: 0px;

    // border-color: red;
    // border-style: dashed;
  }

  .keba-leds-container {
    position: absolute;
    top: 100px;
    width: 100%;
  }

  .keba-leds {
    margin-right: auto;
    margin-left: auto;
    animation: blink 3s infinite;
    width: 42px;
    //height: 10px;
    // border-radius: 2px;
  }

  .keba-leds-green {
    background: lime;
  }

  .keba-leds-blue {
    background: blue;
  }

  @keyframes blink {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .charger.led {
    position: relative;
    top: -167px;
    // position: absolute;
    // top: 95px;
    // left: 245px;
    width: 2px;
    transform: rotate(90deg);

    // border-color: red;
    // border-style: dashed;
  }

  .charger.led-compact {
    // position: relative;
    position: absolute;
    top: 20px;
    // position: absolute;
    // top: 95px;
    // left: -170px;
    left: 77px;
    top: 22px;
    width: 1.4px;
    transform: rotate(90deg);

    // border-color: red;
    // border-style: dashed;
  }

  .charger.charging,
  .charger.on {
    animation: cleaning 5s linear infinite;
  }

  .charger.returning {
    animation: returning 2s linear infinite;
  }

  .charger.paused {
    opacity: 100%;
  }

  .charger.standby {
    opacity: 50%;
  }

  .fill-gap {
    flex-grow: 1;
  }

  .header {
    height: 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: var(--custom-text-color);

    // border-color: green;
    // border-style: dashed;
  }

  .infoitems {
    // display: flex;
    height: 250px;
    text-align: right;
    // font-weight: bold;
    // transform: translate(-10px, 50%);
    color: var(--custom-text-color);
    top: 30px;
    right: 20px;
    position: absolute;

    // border-color: darkblue;
    // border-style: dashed;
  }

  .infoitems-left {
    text-align: center;
    color: var(--custom-text-color);

    height: 250px;
    text-align: right;
    // transform: translate(10px, 50%);
    top: 30px;
    left: 20px;
    position: absolute;

    // border-color: darkgreen;
    // border-style: dashed;
  }

  .infoitems-item {
    // display: flex;
    // spacing: 0px 0 40
    // text-align: right;
    padding: 5px;
    font-weight: normal;
    color: var(--custom-text-color);

    // border: 1px;
    // border-style: dotted;
  }

  .status {
    display: block;
    align-items: center;
    justify-content: center;
    text-align: center;

    // border-color: pink;
    // border-style: dashed;
  }

  .status-compact {
    // display: block;
    // align-items: center;
    // justify-content: center;
    // text-align: center;
    // position: relative;
    // top: -250px;
    // // left: 200px;
    // // padding-left: 200px;

    display: block;
    // align-items: center;
    // justify-content: center;
    // text-align: center;
    // font-weight: bold;
    color: var(--custom-text-color);
    position: absolute;
    left: 160px;
    top: 65px;

    // border-color: pink;
    // border-style: dashed;
  }

  .status-text {
    color: var(--custom-text-color);
    white-space: nowrap;
    font-weight: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-left: calc(20px + 9px); /* size + margin of spinner */
    text-transform: uppercase;
    font-size: 22px;
  }
  .status-text-compact {
    color: var(--custom-text-color);
    white-space: nowrap;
    font-weight: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    // margin-left: calc(20px + 9px); /* size + margin of spinner */
    text-transform: uppercase;
    font-size: 16px;
  }

  .status-detail-text {
    color: var(--custom-text-color);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-transform: uppercase;
    font-size: 9px;
  }

  .status-detail-text-compact {
    // margin-left: calc(20px + 9px); /* size + margin of spinner */
    color: var(--custom-text-color);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-transform: uppercase;
    font-size: 9px;
  }

  .status ha-circular-progress {
    --mdc-theme-primary: var(--custom-card-background-color); /* hack to override the color */
    min-width: 24px;
    width: 24px;
    height: 24px;
    margin-left: 9px;
  }

  .charger-name {
    text-align: center;
    // font-weight: bold;
    color: var(--custom-text-color);
    font-size: 16px;

    // border-color: grey;
    // border-style: dashed;
  }

  .charger-name-compact {
    // display: block;
    // align-items: center;
    // justify-content: center;
    // text-align: center;
    // font-weight: bold;
    color: var(--custom-text-color);
    font-size: 16px;
    // position: relative;
    position: absolute;
    left: 160px;
    top: 55px;
    // border-color: grey;
    // border-style: dashed;
  }

  .not-available {
    text-align: center;
    color: var(--custom-text-color);
    font-size: 16px;
  }

  .metadata {
    display: block;
    margin: 20px auto;
    position: relative;
    top: -10px;

    border-color: pink;
    // border-style: dashed;
  }

  .stats {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    color: var(--custom-text-color);

    // border-color: black;
    // border-style: dashed;
  }

  .stats-compact {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    color: var(--custom-text-color);

    width: 100%;
    position: absolute;
    left: 0px;
    top: 160px;

    // border-color: black;
    // border-style: dashed;
  }

  .stats-block {
    margin: 10px 0px;
    text-align: center;
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    flex-grow: 1;
    // border-color: black;
    // border-style: dashed;
  }

  .stats-block:last-child {
    border: 0px;
  }

  .stats-value {
    font-size: 20px;
    font-weight: normal;
  }

  ha-icon {
    // color: #fff;
    color: var(--custom-icon-color);
  }

  .toolbar {
    // background: var(--lovelace-background, var(--primary-background-color));
    min-height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    // border-color: black;
    // border-style: dashed;
  }

  .toolbar ha-icon-button {
    color: var(--custom-primary-color);
    flex-direction: column;
    width: 44px;
    height: 44px;
    --mdc-icon-button-size: 44px;
    margin: 5px 0;

    // border-color: red;
    // border-style: dashed;
  }

  .toolbar ha-icon-button:first-child {
    margin-left: 5px;
  }

  .toolbar ha-icon-button:last-child {
    margin-right: 5px;
  }

  .toolbar paper-button {
    color: var(--custom-primary-color);
    flex-direction: column;
    margin-right: 10px;
    padding: 10px;
    cursor: pointer;

    // border-color: blue;
    // border-style: dashed;
  }

  .toolbar ha-icon-button:active,
  .toolbar paper-button:active {
    opacity: 0.4;
    background: rgba(0, 0, 0, 0.1);
  }

  .toolbar paper-button {
    color: var(--custom-primary-color);
    flex-direction: row;
  }

  .toolbar ha-icon {
    color: var(--custom-primary-color);
    padding-right: 15px;
  }

  /* Tooltip container */

  .tooltip {
    position: relative;
    display: inline-block;
    // border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
  }

  /* Tooltip text */
  .tooltip {
    position: relative;
    display: inline-block;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 160px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 1px 0;
    position: absolute;
    z-index: 1;
    top: 110%;
    left: 50%;
    margin-left: -80px;
  }

  .tooltip .tooltiptext::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent black transparent;
  }

  .tooltip-right .tooltiptext-right {
    visibility: hidden;
    width: 160px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 1px 0;
    position: absolute;
    z-index: 1;
    margin-left: -80px;
    top: 5px;
    right: 105%;
  }

  .tooltip-right .tooltiptext-right::after {
    content: ' ';
    position: absolute;
    top: 50%;
    left: 100%; /* To the right of the tooltip */
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent transparent black;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
  }

  .tooltip-right:hover .tooltiptext-right {
    visibility: visible;
  }

  /* CSS COLLAPSIBLE */

  input[type='checkbox'] {
    display: none;
  }

  .lbl-toggle {
    display: block;
    // text-align: right;
    // padding: 1rem;
    padding: 5px;
    // margin: auto;
    color: var(--custom-text-color);
    background: transparent;
    // transition: all 0.25s ease-out;
    position: absolute;
    // bottom: 70px;
    top: 330px;
    right: 0px;
    // left: 40%;

    width: 30px;
    height: 30px;
    // align: right;
    // float: right;
    z-index: 1;
    // margin-left: auto;
    // margin-right: auto;

    // border-style: dotted;
    // border-color: red;
  }

  .collapsible-content {
    max-height: 0px;
    overflow: hidden;

    // transition: max-height .25s ease-in-out;
  }

  .toggle:checked + .lbl-toggle + .collapsible-content {
    max-height: 200px;
    // height: 200px;
    position: relative;
    top: 0px;
    // margin-left: auto;
    // margin-right: auto;
    // width: 100%;
    margin: auto;

    text-align: center;
    vertical-align: middle;
    background: transparent;

    display: block;
    flex-direction: row;
    justify-content: space-evenly;
    color: var(--custom-text-color);

    // border-style: solid;
    // border-color: red;
  }

  .collapsible-content .content-inner {
    color: var(--custom-text-color);
    background: transparent;
    text-align: center;
    max-height: 200px;
    height: 70px;
    // vertical-align: middle;
    // width: 100%;
    // z-index: 3;
    content: '';
    clear: both;
    display: table;

    margin-left: auto;
    margin-right: auto;

    // border-style: dashed;
    // border-color: white;
  }

  .collapsible-item {
    display: inline;
    text-align: center;
    align-items: center;
    padding: 5px;
    // font-weight: normal;
    // border: 1px;
    // border-style: dotted;
    justify-content: center;
    vertical-align: middle;
  }

  /* collapsible info */

  .lbl-toggle-info {
    display: block;
    padding: 5px;
    color: var(--custom-text-color);
    background: transparent;
    // transition: all 0.25s ease-out;
    position: absolute;
    // bottom: 100px;
    top: 300px;
    right: 0px;
    width: 30px;
    height: 30px;
    z-index: 1;

    // border-style: dotted;
    // border-color: darkblue;
  }

  .toggle-info:checked + .lbl-toggle-info + .collapsible-content-info {
    max-height: 200px;
    // height: 200px;
    position: relative;
    top: 0px;
    // margin-left: auto;
    // margin-right: auto;
    // width: 100%;
    margin: auto;

    text-align: center;
    vertical-align: middle;
    background: transparent;

    display: block;
    flex-direction: row;
    justify-content: space-evenly;
    color: var(--custom-text-color);

    // border-style: solid;
    // border-color: red;
  }

  .collapsible-content-info .content-inner-info {
    color: var(--custom-text-color);
    background: transparent;
    text-align: center;
    max-height: 200px;
    height: 70px;
    // vertical-align: middle;
    // width: 100%;
    // z-index: 3;
    content: '';
    clear: both;
    display: table;

    margin-left: auto;
    margin-right: auto;

    // border-style: dashed;
    // border-color: white;
  }

  // .wrap-collabsible-info {
  //   // display: flex;
  //   // margin-bottom: 1.2rem 0;
  //   // border-style: solid;
  //   // min-height:0px;
  //   // max-height:300px;
  //   height: 50px;

  //   // border-top: 1px solid rgba(255, 255, 255, 0.2);
  //   // display: flex;
  //   // flex-direction: row;
  //   // justify-content: space-evenly;
  //   // color: var(--custom-text-color);

  //   text-align: left;
  //   vertical-align: top;

  //   display: block;
  //   // flex-direction: row;
  //   // justify-content: space-evenly;
  //   // color: var(--custom-text-color);
  //   margin: auto;

  //   border-color: black;
  //   border-style: solid;

  // }

  // .wrap-collabsible {
  //   // display: flex;
  //   // margin-bottom: 1.2rem 0;
  //   // border-style: solid;
  //   // min-height:0px;
  //   // max-height:300px;
  //   height: 50px;

  //   // border-top: 1px solid rgba(255, 255, 255, 0.2);
  //   // display: flex;
  //   // flex-direction: row;
  //   // justify-content: space-evenly;
  //   // color: var(--custom-text-color);

  //   text-align: left;
  //   vertical-align: top;

  //   display: block;
  //   // flex-direction: row;
  //   // justify-content: space-evenly;
  //   // color: var(--custom-text-color);
  //   margin: auto;

  //   border-color: red;
  //   border-style: solid;

  // }

  .collapsible-content-info {
    max-height: 0px;
    overflow: hidden;

    // transition: max-height .25s ease-in-out;
  }

  /* collapsible limits */

  .lbl-toggle-lim {
    display: block;
    padding: 5px;
    color: var(--custom-text-color);
    background: transparent;
    // transition: all 0.25s ease-out;
    position: absolute;
    // bottom: 100px;
    top: 270px;
    right: 0px;
    width: 30px;
    height: 30px;
    z-index: 1;

    // border-style: dotted;
    // border-color: darkblue;
  }

  .toggle-lim:checked + .lbl-toggle-lim + .collapsible-content-lim {
    max-height: 200px;
    // height: 200px;
    position: relative;
    top: 0px;
    // margin-left: auto;
    // margin-right: auto;
    // width: 100%;
    margin: auto;

    text-align: center;
    vertical-align: middle;
    background: transparent;

    display: block;
    flex-direction: row;
    justify-content: space-evenly;
    color: var(--custom-text-color);

    // border-style: solid;
    // border-color: red;
  }

  .collapsible-content-lim .content-inner-lim {
    color: var(--custom-text-color);
    background: transparent;
    text-align: center;
    max-height: 200px;
    height: 70px;
    // vertical-align: middle;
    // width: 100%;
    // z-index: 3;
    content: '';
    clear: both;
    display: table;

    margin-left: auto;
    margin-right: auto;
    padding-bottom: 15px;

    // border-style: dashed;
    // border-color: white;
  }

  // .wrap-collabsible-lim {
  //   // display: flex;
  //   // margin-bottom: 1.2rem 0;
  //   // border-style: solid;
  //   // min-height:0px;
  //   // max-height:300px;
  //   height: 50px;

  //   // border-top: 1px solid rgba(255, 255, 255, 0.2);
  //   // display: flex;
  //   // flex-direction: row;
  //   // justify-content: space-evenly;
  //   // color: var(--custom-text-color);

  //   text-align: left;
  //   vertical-align: top;

  //   display: block;
  //   // flex-direction: row;
  //   // justify-content: space-evenly;
  //   // color: var(--custom-text-color);
  //   margin: auto;

  //   border-color: black;
  //   border-style: solid;

  // }

  .collapsible-content-lim {
    max-height: 0px;
    overflow: hidden;

    // transition: max-height .25s ease-in-out;
  }
`;
