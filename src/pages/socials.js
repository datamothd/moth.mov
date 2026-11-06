import { spaceBackgroundMarkup, spaceBackgroundStyles } from '../components/space-background.js';
import { sharedStyles } from '../styles/shared.js';
import { socialsStyles } from '../styles/socials.js';
import { getSocialsTheme } from '../styles/socials-theme.js';
import { socialsScript } from '../scripts/socials.js';
import { passportDexIcon, tiktokIcon, discordIcon } from '../icons.js';

export const socialsPage = (tracks, season, effect = 'meteors') => {
  const theme = getSocialsTheme(season);
  const { highlight, shadow } = theme;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="${shadow}">
  <meta name="description" content="Find Kirby around the internet.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  >
  <title>kirby \xB7 moth.mov</title>
  <style>
${sharedStyles}
${spaceBackgroundStyles}
${socialsStyles(theme)}
  </style>
</head>
<body>
  <svg width="0" height="0" style="position: absolute" aria-hidden="true" focusable="false">
    <defs>
      <filter id="social-tint" color-interpolation-filters="sRGB">
        <feFlood flood-color="${highlight}" />
        <feComposite in2="SourceAlpha" operator="in" />
      </filter>
    </defs>
  </svg>
  ${spaceBackgroundMarkup}
  <div class="glow" aria-hidden="true"></div>
  <div class="shell">
    <div class="entry-dimmer" aria-hidden="true"></div>
    <section class="music-widget" aria-label="Music player" hidden>
      <audio
        class="music-player"
        controls
        preload="auto"
        crossorigin="anonymous"
      ></audio>
        <div class="music-artwork" role="img" aria-label="Album artwork placeholder">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/></svg>
        </div>
        <div class="music-info">
          <p class="music-title"></p>
          <p class="music-artist"></p>
        </div>
        <div class="music-transport">
          <div class="music-playback-controls">
          <button class="music-previous" type="button" aria-label="Previous song"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 5h3v14H5zm14 0v14L9 12z"/></svg></button>
        <button class="music-toggle" type="button" aria-label="Play">
          <svg class="music-play-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
          <svg class="music-pause-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6.5" y="5" width="4" height="14" rx="1.5"/><rect x="13.5" y="5" width="4" height="14" rx="1.5"/></svg>
        </button>
          <button class="music-next" type="button" aria-label="Next song"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 5h3v14h-3zM5 5l10 7-10 7z"/></svg></button>
          </div>
          <svg class="music-control-divider" viewBox="0 0 12 28" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" aria-hidden="true"><path d="M10 4 2 24"/></svg>
        <div class="music-volume-control">
          <button class="music-volume-toggle" type="button" aria-label="Mute" aria-pressed="false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4zM15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/></svg>
          </button>
          <input class="music-volume" type="range" min="0" max="1" value="0.3" step="0.01" aria-label="Volume" aria-orientation="horizontal">
        </div>
        </div>
      <div class="music-footer">
      <input class="music-seek" type="range" min="0" max="0" value="0" step="0.1" aria-label="Seek" disabled>
        <span class="music-time">0:00 / 0:00</span>
      </div>
      <span class="music-status" role="status"></span>
    </section>
    <main>
      <div class="profile-stage">
        <section class="profile" inert tabindex="-1" aria-label="Kirby's social links">
          <canvas class="audio-visualizer" hidden aria-hidden="true"></canvas>
          <div class="avatar-wrap">
            <img
              class="avatar"
              src="/profile.webp?v=${Date.now()}"
              alt="Kirby avatar"
              referrerpolicy="no-referrer"
            >
          </div>
          <div class="details">
            <h1>kirby</h1>
            <p class="handle">@kirbymybae</p>
            <nav class="links" aria-label="Social profiles">
              <a
                class="social"
                href="https://passportdex.com/kirby"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="PassportDex"
              >
                <img src="${passportDexIcon}" alt="" aria-hidden="true">
              </a>
              <a
                class="social social--tiktok"
                href="https://www.tiktok.com/@turntableterry"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <img src="${tiktokIcon}" alt="" aria-hidden="true">
              </a>
              <a
                class="social"
                href="https://discord.com/users/975433734633455616"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
              >
                <img src="${discordIcon}" alt="" aria-hidden="true">
              </a>
            </nav>
          </div>
        </section>
        <button class="entry-prompt" type="button">&gt;&gt; enter the wired &lt;&lt;</button>
      </div>
    </main>
    <a class="navigation-link back" href="/" aria-label="Back to moth.mov">
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
    <p class="path">/ kirby</p>
    <p class="signature">moth.mov</p>
  </div>
  <script>${socialsScript(tracks, theme, effect)}<\/script>
</body>
</html>`;
};
