import { highlight, muted, shadow, accent } from './socials-theme.js';

export const socialsStyles = `
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
      --profile-padding: 20px;
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
        radial-gradient(ellipse 24% 36% at 84% 18%, color-mix(in srgb, var(--muted) 15%, transparent), transparent 80%);
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
      position: fixed;
      top: var(--page-edge-horizontal);
      left: var(--page-edge-horizontal);
      z-index: 2;
      width: 300px;
      max-width: calc(100vw - var(--page-edge-horizontal) * 2);
    }
    .music-player {
      display: block;
      width: 100%;
      color-scheme: dark;
    }
    .music-widget[hidden],
    .music-player[hidden],
    .audio-visualizer[hidden] {
      display: none;
    }
    .song-title {
      position: relative;
      padding: 7px 0;
      overflow: hidden;
      color: var(--text);
      font: 12px/20px 'Courier New', monospace;
      letter-spacing: -0.7px;
      text-shadow:
        0 0 4px color-mix(in srgb, var(--highlight) 40%, transparent),
        0 0 12px color-mix(in srgb, var(--accent) 35%, transparent);
    }
    .song-title::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: repeating-linear-gradient(
        to bottom, transparent 0 2px, rgba(0, 0, 0, 0.22) 2px 3px
      );
    }
    .song-title-scroll {
      display: flex;
      width: max-content;
    }
    .song-title-scroll span {
      white-space: pre;
      flex-shrink: 0;
      transform: scaleY(1.6);
    }
    .song-title-scroll a {
      color: inherit;
      text-decoration: none;
    }
    .song-title-scroll a:hover,
    .song-title-scroll a:focus-visible {
      text-decoration: underline;
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
      letter-spacing: 0.045em;
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
      position: relative;
      z-index: 4;
      width: fit-content;
      max-width: 100%;
      display: flex;
      align-items: center;
      gap: var(--profile-gap);
      padding: var(--profile-padding);
      border: var(--border-width) solid color-mix(in srgb, var(--highlight) 32%, transparent);
      border-radius: var(--profile-radius);
      background: linear-gradient(
        145deg,
        color-mix(in srgb, var(--muted) 22%, transparent),
        color-mix(in srgb, var(--shadow) 18%, transparent) 58%,
        color-mix(in srgb, var(--accent) 12%, transparent)
      );
      box-shadow:
        0 26px 80px rgba(0, 0, 0, 0.4),
        0 0 60px color-mix(in srgb, var(--shadow) 24%, transparent),
        inset 0 1px 0 color-mix(in srgb, var(--highlight) 18%, transparent);
      backdrop-filter: blur(18px);
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
      padding-inline-end: 0.065em;
      /* Align Manrope's leading glyph bearing independently of tracking. */
      text-indent: -0.05em;
      color: var(--highlight);
      font-size: var(--heading-font-size);
      line-height: 1.1;
      letter-spacing: -0.065em;
      font-weight: 700;
    }
    .handle {
      margin: var(--handle-margin-top) 0 var(--handle-margin-bottom);
      color: var(--highlight);
      font-size: var(--handle-font-size);
      letter-spacing: var(--footer-letter-spacing);
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

    /* Reserve the player's own height when it shares the card's horizontal space. */
    @media (max-width: 600px), (max-height: 600px) {
      :root {
        --handle-margin-top: 6px;
        --social-icon-offset-y: 0px;
      }
      .music-widget {
        position: relative;
        top: auto;
        left: auto;
        flex: none;
        margin: var(--page-edge-horizontal) auto 0;
      }
      .music-widget[hidden],
      .music-player[hidden] {
        display: block;
        visibility: hidden;
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

    @media (min-width: 601px) and (max-height: 600px) {
      :root {
        --profile-padding: 12px;
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
`;
