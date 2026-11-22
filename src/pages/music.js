import { backArrowIcon, albumArtworkIcon, musicPlayIcon, musicPauseIcon, musicVolumeIcon } from '../icons.js';
import { tracks as fallbackTracks } from '../data/music.js';
import { musicStyles } from '../styles/music.js';
import { trackControlsScript } from '../scripts/track-controls.js';
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
          <img src="${escapeHtml(track.artworkUrl)}" alt="" decoding="async" draggable="false">
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
        <div class="track-controls" role="group" aria-label="${escapeHtml(track.label)} playback" hidden>
          <button class="track-play" type="button" aria-label="Play">
            ${musicPlayIcon}
            ${musicPauseIcon}
          </button>
          <input class="track-seek" type="range" min="0" max="0" step="any" aria-label="Seek" disabled>
          <span class="track-time">0:00 / 0:00</span>
          <div class="track-volume">
            <button type="button" aria-label="Mute" aria-pressed="false">
              ${musicVolumeIcon}
            </button>
            <input type="range" min="0" max="1" step="0.01" value="0.5" aria-label="Volume">
          </div>
        </div>
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
    ${trackControlsScript}
    document.querySelectorAll('.track-artwork img').forEach(cover => {
      if (cover.complete && !cover.naturalWidth) cover.remove();
      else cover.addEventListener('error', () => cover.remove(), { once: true });
    });
    ${createSpaceBackgroundScript('music')}
  <\/script>
</body>
</html>`;
