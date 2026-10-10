import { tracks } from '../data/music.js';
import { musicStyles } from '../styles/music.js';
import {
  spaceBackgroundMarkup,
  spaceBackgroundStyles,
  createSpaceBackgroundScript,
} from '../components/space-background.js';
import { sharedStyles } from '../styles/shared.js';

const escapeHtml = value => value.replace(/[&<>"']/g, character => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
})[character]);

const trackList = tracks.map(track => `
      <li>
        <p>${escapeHtml(track.label)}</p>
        <audio
          src="${escapeHtml(track.url)}"
          aria-label="${escapeHtml(track.label)}"
          controls
          preload="none"
          crossorigin="anonymous"
        ></audio>
      </li>`).join('');

export const musicPage = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#000000">
  <title>music · moth.mov</title>
  <style>
${spaceBackgroundStyles}
${musicStyles}
${sharedStyles}
  </style>
</head>
<body>
  ${spaceBackgroundMarkup}
  <main>
    <h1>music</h1>
    <ul class="tracks">${trackList}
    </ul>
    <p class="signature">music.moth.mov</p>
    <a class="navigation-link back" href="https://moth.mov/" aria-label="Back to moth.mov">
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <line x1="15.5" y1="10" x2="4.5" y2="10" />
        <line x1="4.5" y1="10" x2="9" y2="5.5" />
        <line x1="4.5" y1="10" x2="9" y2="14.5" />
      </svg>
      <span>back</span>
    </a>
  </main>
  <script>${createSpaceBackgroundScript()}<\/script>
</body>
</html>`;
