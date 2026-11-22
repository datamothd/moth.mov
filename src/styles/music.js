import { backStyles, cardStyles } from './shared.js';

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
    h1 {
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
    .tracks audio {
      display: block;
      width: 100%;
      height: 40px;
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
