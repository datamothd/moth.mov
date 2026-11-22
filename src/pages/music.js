import { backArrowIcon, albumArtworkIcon } from '../icons.js';
import { tracks as fallbackTracks } from '../data/music.js';
import { musicStyles } from '../styles/music.js';
import {
  spaceBackgroundMarkup,
  spaceBackgroundStyles,
  createSpaceBackgroundScript,
} from '../components/space-background.js';
import { sharedStyles } from '../styles/shared.js';
import { createSignature } from '../components/signature.js';

const escapeHtml = value => value.replace(/[&<>"']/g, character => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
})[character]);

const trackList = tracks => tracks.map(track => `
      <li>
        <div class="track-artwork" aria-hidden="true">
          ${albumArtworkIcon}
          <img src="${escapeHtml(track.artworkUrl)}" alt="" decoding="async">
        </div>
        <p class="track-name">
          <span class="track-title">${escapeHtml(track.title)}</span>
          <span class="track-artist">${escapeHtml(track.artist)}</span>
        </p>
        <audio
          src="${escapeHtml(track.url)}"
          aria-label="${escapeHtml(track.label)}"
          controls
          preload="none"
          crossorigin="anonymous"
        ></audio>
      </li>`).join('');

export const musicPage = (tracks = fallbackTracks) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#000000">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700&display=swap"
    rel="stylesheet"
  >
  <title>music · moth.mov</title>
  <style>
${spaceBackgroundStyles}
${sharedStyles}
${musicStyles}
  </style>
</head>
<body>
  ${spaceBackgroundMarkup}
  <main class="music-card">
    <h1>music (currently in rotation)</h1>
    <ul class="tracks" tabindex="0" aria-label="Tracks">${trackList(tracks)}
    </ul>
  </main>
  ${createSignature('music.moth.mov')}
  <a class="navigation-link back" href="https://moth.mov/socials" aria-label="Back to moth.mov">
    ${backArrowIcon}
    <span>back</span>
  </a>
  <script>
    document.querySelectorAll('.tracks audio').forEach(player => {
      player.volume = 0.5;
    });
    document.querySelectorAll('.track-artwork img').forEach(cover => {
      if (cover.complete && !cover.naturalWidth) cover.remove();
      else cover.addEventListener('error', () => cover.remove(), { once: true });
    });
    ${createSpaceBackgroundScript('music')}
  <\/script>
</body>
</html>`;
