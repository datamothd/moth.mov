import { sharedStyles } from '../styles/shared.js';
import { socialsStyles } from '../styles/socials.js';
import { socialsScript } from '../scripts/socials.js';
import { passportDexIcon, tiktokIcon, discordIcon } from '../icons.js';

export const socialsPage = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#000000">
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
${socialsStyles}
  </style>
</head>
<body>
  <canvas class="sky" aria-hidden="true"></canvas>
  <div class="glow" aria-hidden="true"></div>
  <div class="shell">
    <div class="entry-dimmer" aria-hidden="true"></div>
    <div class="music-widget" hidden>
      <audio
      class="music-player"
      controls
      hidden
      preload="auto"
      crossorigin="anonymous"
      ></audio>
      <div class="song-title" role="img" aria-label="Current song">
        <div class="song-title-scroll" aria-hidden="true"><span></span><span></span></div>
      </div>
    </div>
    <main>
      <div class="profile-stage">
        <section class="profile" inert tabindex="-1" aria-label="Kirby's social links">
          <canvas class="audio-visualizer" hidden aria-hidden="true"></canvas>
          <div class="avatar-wrap">
            <img
              class="avatar"
              src="https://r2.guns.lol/b9ed69aa-58da-4422-b0ec-71de1e83fde8.webp"
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
  <script>${socialsScript}<\/script>
</body>
</html>`;
