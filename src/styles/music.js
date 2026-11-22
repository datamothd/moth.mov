import { backStyles, cardStyles, musicControlStyles } from './shared.js';

export const musicStyles = `
    :root {
      --highlight: #ffffff;
      --muted: #888888;
      --shadow: #000000;
      --accent: #ffffff;
      --text: #ffffff;
      --profile-radius: clamp(24px, 5vw, 42px);
      color-scheme: dark;
      background: #000000;
      color: #ffffff;
      font-family: var(--font-family);
    }
    html,
    body {
      overflow: hidden;
    }
    body {
      margin: 0;
      height: 100dvh;
      display: grid;
      grid-template-rows: minmax(0, 1fr);
      place-items: center;
      padding: calc(var(--page-edge-bottom) + var(--navigation-height) + 8px) clamp(14px, 4vw, 24px);
    }
    .music-card {${cardStyles}
      --card-corner-opacity-scale: 0.6;
      --card-center-opacity: 14%;
      position: relative;
      width: min(100%, 560px);
      max-height: 100%;
      display: flex;
      flex-direction: column;
      padding: clamp(14px, 4vw, 28px);
      backdrop-filter: blur(3px);
      box-shadow: 0 18px 56px rgba(0, 0, 0, 0.24);
    }
    .music-card h1,
    .track-artwork {
      -webkit-user-select: none;
      user-select: none;
    }
    .music-card h1 {
      flex: none;
      margin: 0 0 22px;
      text-align: center;
      font-size: clamp(1.25rem, 5.5vw, 1.8rem);
      line-height: 1.2;
    }
    .tracks {
      list-style: none;
      display: grid;
      gap: 12px;
      margin: 0;
      padding: 0;
      overflow-y: auto;
      overscroll-behavior-y: contain;
      scrollbar-width: thin;
      scrollbar-color: #ffffff42 transparent;
    }
    .tracks li {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      gap: 4px 12px;
    }
    .track-artwork {
      position: relative;
      grid-row: span 2;
      align-self: center;
      display: grid;
      place-items: center;
      width: clamp(42px, 14vw, 62px);
      aspect-ratio: 1;
      overflow: hidden;
      border: var(--border-width) solid #ffffff26;
      border-radius: 12px;
      background: linear-gradient(145deg, #ffffff12, #ffffff05);
      color: #aaa;
    }
    .track-artwork svg {
      width: 46%;
    }
    .track-artwork img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .track-name {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: 2px 8px;
      margin: 0;
      line-height: 1.25;
      overflow-wrap: anywhere;
    }
    .track-title {
      font-weight: 700;
    }
    .track-artist {
      color: #bcbcbc;
      font-size: 0.875rem;
    }
    .tracks audio:not([hidden]) {
      display: block;
      width: 100%;
      height: 40px;
    }
    .track-controls:not([hidden]),
    .track-volume {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .track-controls:not([hidden]) {
      height: 36px;
      margin-block: 2px;
      padding-inline: 8px;
      border: var(--border-width) solid #ffffff24;
      border-radius: 12px;
      background: #ffffff0a;
      user-select: none;
    }
    .track-controls button {
      display: grid;
      place-items: center;
      width: 32px;
      height: 34px;
      flex: none;
      padding: 1px;
      border: 0;
      border-radius: 50%;
      background: transparent;
      color: inherit;
      cursor: pointer;
    }
    .track-controls svg {
      width: 29px;
      height: 29px;
      filter: drop-shadow(0 0 8px #ffffff30) drop-shadow(0 0 18px #ffffff1a);
    }
    .track-play svg {
      stroke: currentColor;
      stroke-width: 2;
      stroke-linejoin: round;
      stroke-linecap: round;
    }
    .track-controls svg[hidden] {
      display: none;
    }
    .track-volume button {
      width: 26px;
      height: 28px;
      padding: 3px;
    }
    .track-volume svg {
      width: 22px;
      height: 22px;
      stroke-width: 2.75;
    }
    .track-volume button[aria-pressed="true"] {
      opacity: 0.5;
    }
${musicControlStyles}
    .track-seek {
      flex: 1;
    }
    .track-time {
      white-space: nowrap;
      font-size: 12px;
      font-variant-numeric: tabular-nums;
      color: #ccc;
      text-shadow: 0 0 8px #ffffff30, 0 0 18px #ffffff1a;
    }
    .track-volume input {
      width: 54px;
    }
${backStyles}
    a {
      color: inherit;
    }
    @media (max-width: 600px) {
      body {
        padding-top: var(--page-edge-horizontal);
      }
    }
`;
