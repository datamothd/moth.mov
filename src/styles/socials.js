import { getSocialsTheme } from './socials-theme.js';

export const socialsStyles = ({ highlight, muted, shadow, accent } = getSocialsTheme()) => `
    :root {
      --highlight: ${highlight};
      --muted: ${muted};
      --shadow: ${shadow};
      --accent: ${accent};
      --background: color-mix(in srgb, var(--shadow) 12%, #000);
      --text: color-mix(in srgb, var(--highlight) 22%, #fff);
      --main-padding: calc(var(--page-edge-bottom) + var(--navigation-height) + 20px);
      --audio-visualizer-height: clamp(24px, 6dvh, 72px);
      --audio-visualizer-gap: 12px;
      --profile-padding: 12px;
      --profile-gap: var(--profile-padding);
      --profile-radius: 42px;
      --avatar-size: clamp(168px, 22.5vw, 234px);
      --avatar-frame-padding: 6px;
      --heading-font-size: clamp(51px, 7.5vw, 87px);
      --handle-font-size: calc(var(--heading-font-size) * 0.225);
      --handle-margin-top: calc(var(--heading-font-size) * -0.24 + 6px);
      --handle-margin-bottom: 12px;
      --social-width: 58px;
      --social-height: 66px;
      --social-icon-size: 56px;
      --social-icon-offset-y: -8px;
      --social-icon-scale: 1.15;
      --entry-fade-duration: 400ms;
      --dimmer-fade-duration: 1000ms;
    }
    html {
      min-height: 100%;
      background: var(--background);
    }
    body {
      min-height: 100dvh;
      margin: 0;
      overflow-x: hidden;
      color: var(--text);
      font-family: var(--font-family);
      background: var(--background);
    }
    .glow {
      position: fixed;
      inset: -25%;
      pointer-events: none;
      background:
        radial-gradient(ellipse 31% 45% at 29% 25%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 78%),
        radial-gradient(ellipse 37% 30% at 70% 62%, color-mix(in srgb, var(--shadow) 38%, transparent), transparent 80%),
        radial-gradient(ellipse 24% 36% at 84% 18%, color-mix(in srgb, var(--muted) 15%, transparent), transparent 80%),
        radial-gradient(ellipse 35% 32% at 69% 65%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 80%);
      filter: blur(70px);
    }
    .shell {
      position: relative;
      z-index: 1;
      height: 100dvh;
      display: flex;
      flex-direction: column;
    }
    .back {
      --navigation-padding-left: 12px;
      --navigation-padding-right: 14px;
      --navigation-hover-x: -3px;
      --navigation-hover-y: 0;
      --navigation-layer: 5;
      color: var(--highlight);
      border-color: color-mix(in srgb, var(--muted) 55%, transparent);
      background: color-mix(in srgb, var(--shadow) 30%, transparent);
    }
    .back::before {
      background: radial-gradient(circle at 32% 72%, color-mix(in srgb, var(--accent) 30%, transparent), transparent 55%);
    }
    .back:hover,
    .back:focus-visible {
      color: var(--text);
      background: color-mix(in srgb, var(--shadow) 65%, transparent);
      border-color: var(--highlight);
      box-shadow: 0 0 24px color-mix(in srgb, var(--accent) 18%, transparent);
      outline-color: var(--highlight);
    }
    .signature,
    .path {
      z-index: 4;
      color: var(--highlight);
    }
    .music-widget {
      --profile-radius: 28px;
      position: fixed;
      top: var(--page-edge-horizontal);
      left: var(--page-edge-horizontal);
      z-index: 2;
      width: 380px;
      max-width: calc(100vw - var(--page-edge-horizontal) * 2);
      display: grid;
      grid-template-columns: 130px minmax(0, 1fr);
      grid-template-rows: 70px 36px 24px;
      column-gap: 12px;
      padding: 12px;
      color: #f1f1f1;
      -webkit-user-select: none;
      user-select: none;
    }
    .music-player,
    .music-widget[hidden],
    .audio-visualizer[hidden],
    .music-cover[hidden] {
      display: none;
    }
    .music-artwork {
      grid-column: 1;
      grid-row: 1 / 4;
      width: 100%;
      aspect-ratio: 1;
      align-self: center;
      display: grid;
      place-items: center;
      min-height: 0;
      overflow: hidden;
      border-radius: var(--profile-radius);
      border: var(--border-width) solid #ffffff26;
      background: linear-gradient(145deg, #ffffff12, #ffffff05);
      color: #bcbcbc;
    }
    .music-artwork svg {
      grid-area: 1 / 1;
      width: 40px;
      height: 40px;
      opacity: 0.65;
    }
    .music-cover {
      grid-area: 1 / 1;
      display: block;
      width: 100%;
      height: 100%;
      min-width: 0;
      min-height: 0;
      object-fit: cover;
      border-radius: inherit;
    }
    .music-artwork.has-artwork svg {
      visibility: hidden;
    }
    .music-info {
      grid-column: 2;
      grid-row: 1;
      min-width: 0;
      padding-top: 3px;
    }
    .music-title, .music-artist {
      margin: 0 0 -3px;
      padding-bottom: 3px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .music-title {
      display: block;
      color: inherit;
      text-decoration: none;
      font-size: 23px;
      line-height: 26px;
      font-weight: 500;
      letter-spacing: -0.575px;
    }
    .music-title:hover, .music-title:focus-visible {
      text-decoration: underline;
      text-underline-offset: 3px;
    }
    .music-artist {
      font-size: 16px;
      line-height: 20px;
      color: #aaa;
    }
    .music-transport {
      grid-column: 2;
      grid-row: 2;
      display: grid;
      grid-template-columns: 96px 12px minmax(0, 1fr);
      align-items: center;
      column-gap: 6px;
    }
    .music-playback-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 0;
    }
    .music-control-divider {
      width: 12px;
      height: 28px;
      opacity: 0.55;
    }
    .music-playback-controls > button, .music-volume-toggle {
      display: grid;
      place-items: center;
      border: 0;
      border-radius: 50%;
      background: transparent;
      color: inherit;
      cursor: pointer;
    }
    .music-playback-controls > button {
      flex: 0 1 32px;
      min-width: 0;
      width: 32px;
      height: 36px;
      padding: 1px;
    }
    .music-playback-controls > button svg {
      width: min(29px, 100%);
      height: 29px;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linejoin: round;
      stroke-linecap: round;
    }
    .music-playback-controls svg,
    .music-volume-toggle svg {
      filter: drop-shadow(0 0 8px #ffffff30) drop-shadow(0 0 18px #ffffff1a);
    }
    .music-toggle .music-pause-icon,
    .music-toggle.is-playing .music-play-icon {
      display: none;
    }
    .music-toggle.is-playing .music-pause-icon {
      display: block;
    }
    .music-footer {
      grid-column: 2;
      grid-row: 3;
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }
    .music-widget input[type="range"] {
      appearance: none;
      -webkit-appearance: none;
      touch-action: none;
      display: block;
      min-width: 0;
      height: 24px;
      padding: 0;
      margin: 0;
      background: transparent;
      cursor: pointer;
    }
    .music-widget input:disabled {
      cursor: default;
      opacity: 0.45;
    }
    .music-widget button:focus-visible,
    .music-widget input:focus-visible {
      outline: 2px solid #ddd;
      outline-offset: 3px;
    }
    .music-seek {
      flex: 1 1 0;
      width: 100%;
      --progress: 0%;
    }
    .music-widget input::-webkit-slider-runnable-track {
      height: 5px;
      border-radius: 5px;
      background: linear-gradient(to right, #eee var(--progress), #ffffff35 var(--progress));
    }
    .music-widget input::-webkit-slider-thumb {
      appearance: none;
      -webkit-appearance: none;
      width: 13px;
      height: 13px;
      margin-top: -4px;
      border: 0;
      border-radius: 50%;
      background: #f5f5f5;
    }
    .music-widget input::-moz-range-track {
      height: 5px;
      border-radius: 5px;
      background: linear-gradient(to right, #eee var(--progress), #ffffff35 var(--progress));
    }
    .music-widget input::-moz-range-thumb {
      width: 13px;
      height: 13px;
      border: 0;
      border-radius: 50%;
      background: #f5f5f5;
    }
    .music-time {
      flex: none;
      white-space: nowrap;
      font-size: 12px;
      line-height: 18px;
      font-variant-numeric: tabular-nums;
      color: #ccc;
      text-shadow: 0 0 8px #ffffff30, 0 0 18px #ffffff1a;
    }
    .music-volume-control {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 6px;
      min-width: 0;
    }
    .music-volume-toggle {
      flex: none;
      width: 26px;
      height: 28px;
      padding: 3px;
    }
    .music-volume-toggle svg {
      width: 22px;
      height: 22px;
      stroke-width: 2.75;
    }
    .music-volume-toggle[aria-pressed="true"] {
      opacity: 0.5;
    }
    .music-volume {
      flex: 1 1 54px;
      width: 54px;
      --progress: 30%;
    }
    .music-status {
      grid-column: 1 / -1;
      font-size: 11px;
      color: #aaa;
    }
    .music-status:empty {
      display: none;
    }
    @media (max-width: 480px) {
      .music-widget {
        grid-template-columns: 92px minmax(0, 1fr);
        grid-template-rows: 56px 36px 24px;
        column-gap: 10px;
      }
      .music-artwork {
        grid-row: 1 / 3;
      }
      .music-title {
        font-size: 20px;
        line-height: 23px;
        letter-spacing: -0.5px;
      }
      .music-artist {
        font-size: 14px;
      }
      .music-footer {
        grid-column: 1 / -1;
        gap: 10px;
        align-self: end;
      }
      .music-time {
        font-size: 11px;
      }
    }
    .audio-visualizer {
      position: absolute;
      bottom: calc(100% + var(--audio-visualizer-gap));
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 40px);
      height: var(--audio-visualizer-height);
      z-index: 2;
      pointer-events: none;
      opacity: 0;
      transition: opacity 600ms ease;
    }
    body.entered .audio-visualizer {
      opacity: 1;
    }
    .entry-dimmer {
      position: fixed;
      inset: 0;
      z-index: 3;
      background: rgba(0, 0, 0, 0.5);
      opacity: 1;
      visibility: visible;
      pointer-events: none;
      transition:
        opacity var(--dimmer-fade-duration) cubic-bezier(0.22, 0.61, 0.36, 1),
        visibility 0ms linear var(--dimmer-fade-duration);
    }
    .profile-stage {
      position: relative;
      max-width: 100%;
    }
    body:not(.entered) .profile {
      visibility: hidden;
      opacity: 0;
    }
    body:not(.entered) {
      cursor: pointer;
    }
    .entry-prompt {
      position: absolute;
      top: calc(100% + 28px);
      left: 50%;
      z-index: 4;
      transform: translateX(-50%);
      width: max-content;
      max-width: calc(100vw - var(--page-gutter) * 2);
      padding: 12px 0;
      border: 0;
      background: transparent;
      color: var(--highlight);
      font-family: var(--font-family);
      font-size: clamp(22px, 3vw, 34px);
      font-weight: 600;
      line-height: 1.4;
      letter-spacing: calc(clamp(22px, 3vw, 34px) * 0.045);
      cursor: pointer;
      text-align: center;
      text-shadow: 0 0 24px color-mix(in srgb, var(--accent) 40%, transparent);
      opacity: 1;
      visibility: visible;
      transition:
        opacity var(--entry-fade-duration) ease,
        visibility 0ms linear var(--entry-fade-duration);
    }
    .entry-prompt:focus-visible {
      outline: var(--focus-width) solid var(--highlight);
      outline-offset: 6px;
      border-radius: 8px;
    }
    body.entered .entry-dimmer,
    body.entered .entry-prompt {
      opacity: 0;
      visibility: hidden;
    }
    body.entered .profile {
      animation: profile-enter 470ms both;
    }

    @keyframes profile-enter {
      0% {
        transform: scale(0.1);
        animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
      }
      70% {
        transform: scale(1.03);
        animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
      }
      100% {
        transform: scale(1);
      }
    }

    main {
      flex: 1;
      min-height: 0;
      display: grid;
      place-items: center;
      padding: var(--main-padding) var(--page-gutter);
    }
    .profile {
      -webkit-user-select: none;
      user-select: none;
      position: relative;
      z-index: 4;
      width: fit-content;
      max-width: 100%;
      display: flex;
      align-items: center;
      gap: var(--profile-gap);
      padding: var(--profile-padding);
    }
    .profile,
    .music-widget {
      border: var(--border-width) solid color-mix(in srgb, var(--highlight) 32%, transparent);
      border-radius: var(--profile-radius);
      background: linear-gradient(
        145deg,
        color-mix(in srgb, var(--muted) 22%, transparent),
        color-mix(in srgb, var(--shadow) 18%, transparent) 58%,
        color-mix(in srgb, var(--accent) 12%, transparent)
      );
      backdrop-filter: blur(18px);
    }
    .profile {
      box-shadow:
        0 26px 80px rgba(0, 0, 0, 0.4),
        0 0 60px color-mix(in srgb, var(--shadow) 24%, transparent),
        inset 0 1px 0 color-mix(in srgb, var(--highlight) 18%, transparent);
    }
    .avatar-wrap {
      flex: none;
      width: var(--avatar-size);
      aspect-ratio: 1;
      padding: var(--avatar-frame-padding);
      border-radius: var(--profile-radius);
      border: var(--border-width) solid color-mix(in srgb, var(--highlight) 55%, transparent);
      background: color-mix(in srgb, var(--muted) 22%, transparent);
      box-shadow:
        0 0 68px color-mix(in srgb, var(--accent) 16%, transparent),
        0 27px 105px rgba(0, 0, 0, 0.34);
    }
    .avatar {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: calc(var(--profile-radius) - var(--avatar-frame-padding) - var(--border-width));
      background: var(--shadow);
    }
    .details {
      min-width: 0;
      max-width: 100%;
    }
    h1 {
      margin: 0;
      padding-inline-end: calc(var(--heading-font-size) * 0.065);
      text-indent: calc(var(--heading-font-size) * -0.05);
      color: var(--highlight);
      font-size: var(--heading-font-size);
      line-height: 1.1;
      letter-spacing: calc(var(--heading-font-size) * -0.065);
      font-weight: 700;
    }
    .handle {
      margin: var(--handle-margin-top) 0 var(--handle-margin-bottom);
      color: var(--highlight);
      font-size: var(--handle-font-size);
      letter-spacing: calc(var(--handle-font-size) * 0.02);
    }
    .links {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
    .social {
      display: grid;
      grid-template: minmax(0, 1fr) / minmax(0, 1fr);
      place-items: center;
      width: var(--social-width);
      height: var(--social-height);
      color: var(--highlight);
      text-decoration: none;
    }
    .social:focus-visible {
      outline: var(--focus-width) solid var(--highlight);
      outline-offset: var(--focus-offset);
    }
    .social img {
      width: var(--social-icon-size);
      height: var(--social-icon-size);
      filter:
        url(#social-tint)
        drop-shadow(0 0 4px color-mix(in srgb, var(--muted) 40%, transparent))
        drop-shadow(0 0 10px color-mix(in srgb, var(--accent) 22%, transparent));
      translate: 0 var(--social-icon-offset-y);
      scale: var(--social-icon-scale);
      transition: scale 450ms cubic-bezier(0.22, 0.75, 0.2, 1);
    }
    .social:hover img,
    .social:focus-visible img {
      scale: 1.45;
    }
    .social--tiktok {
      --social-icon-size: 67px;
    }

    @media (max-width: 600px), (max-height: 850px), (pointer: coarse) {
      .music-widget {
        position: relative;
        top: auto;
        left: auto;
        flex: none;
        margin: var(--page-edge-horizontal) 0 0 var(--page-edge-horizontal);
      }
      .music-widget[hidden] {
        display: block;
        visibility: hidden;
      }
    }

    @media (max-width: 600px), (max-height: 850px) {
      :root {
        --handle-margin-top: 6px;
        --social-icon-offset-y: 0px;
      }
      main {
        grid-template-rows: minmax(0, 1fr);
        padding-top: calc(var(--audio-visualizer-height) + var(--audio-visualizer-gap) + 16px);
        padding-bottom: 0;
        margin-bottom: var(--main-padding);
      }
      .profile-stage {
        width: 100%;
        height: 100%;
        min-height: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .entry-prompt {
        position: fixed;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }

    @media (min-width: 601px) {
      .profile {
        scale: 1.414;
      }
    }

    @media (min-width: 601px) and (max-height: 600px) {
      :root {
        --profile-padding: 8px;
        --avatar-size: clamp(96px, 26dvh, 156px);
        --heading-font-size: clamp(32px, 8.5dvh, 51px);
        --handle-font-size: 19.5px;
        --handle-margin-bottom: 6px;
        --social-width: 44px;
        --social-height: 44px;
        --social-icon-size: 40px;
      }
      .social--tiktok {
        --social-icon-size: 48px;
      }
    }

    @media (max-width: 600px) {
      :root {
        --page-gutter: 16px;
        --profile-padding: clamp(12px, 2dvh, 16px);
        --profile-gap: 6px;
        --avatar-size: min(352px, calc(100vw - (var(--page-gutter) + var(--profile-padding) + var(--border-width)) * 2));
        --heading-font-size: clamp(36px, 6.5dvh, 51px);
        --handle-font-size: 19.5px;
        --handle-margin-bottom: 0px;
        --social-width: clamp(44px, 7dvh, 58px);
        --social-height: clamp(50px, 8dvh, 66px);
        --social-icon-size: calc(var(--social-height) - 10px);
        --social-icon-scale: 1.25;
      }
      html,
      body {
        overflow: hidden;
      }
      .profile-stage {
        translate: 0 -3dvh;
      }
      .profile {
        width: 100%;
        min-height: 0;
        flex-direction: column;
        padding-bottom: 0;
        backdrop-filter: blur(3px);
      }
      .avatar-wrap {
        contain: size;
        flex: 0 1 var(--avatar-size);
        width: auto;
        max-width: 100%;
        min-height: 0;
      }
      .details {
        flex: none;
        text-align: center;
      }
      .links {
        justify-content: center;
        padding-block: var(--profile-padding);
      }
      .social--tiktok {
        --social-icon-size: calc(var(--social-height) + 1px);
      }
    }
    @media (max-height: 520px) {
      main {
        align-items: start;
        overflow: hidden;
      }
      .profile-stage {
        height: auto;
        min-height: 100%;
      }
      .profile {
        flex: none;
      }
    }
    @media (max-width: 600px) and (max-height: 520px) {
      .avatar-wrap {
        flex-basis: clamp(80px, 25dvh, 140px);
      }
    }
    @media (max-width: 600px), (pointer: coarse) {
      .music-widget {
        display: block;
        height: 54px;
        padding: 0;
        border: 0;
        border-radius: 0;
        background: transparent;
        backdrop-filter: none;
      }
      .music-widget > :not(.music-player):not(.music-status) {
        display: none;
      }
      .music-widget .music-player {
        display: block;
        width: 100%;
        height: 54px;
      }
    }
`;
