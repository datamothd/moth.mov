import { tracks } from '../data/music.js';
import { musicStyles } from '../styles/music.js';
import {
  skyBackgroundMarkup,
  skyBackgroundStyles,
  createSkyBackgroundScript,
} from '../components/sky-background.js';

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
${skyBackgroundStyles}
${musicStyles}
  </style>
</head>
<body>
  ${skyBackgroundMarkup}
  <main>
    <h1>music</h1>
    <ul class="tracks">${trackList}
    </ul>
    <a href="https://moth.mov/">back to moth.mov</a>
  </main>
  <script>${createSkyBackgroundScript()}<\/script>
</body>
</html>`;
