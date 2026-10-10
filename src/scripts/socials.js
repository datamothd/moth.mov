import { audioVisualizerScript } from './audio-visualizer.js';
import { musicOrigin, tracks } from '../data/music.js';
import { createSkyBackgroundScript } from './sky.js';

export const socialsScript = `
${audioVisualizerScript}
    (() => {
      const player = document.querySelector('.music-player');
      const startVisualizer = setupAudioVisualizer(player);
      const profile = document.querySelector('.profile');
      const prompt = document.querySelector('.entry-prompt');
      const tracks = ${JSON.stringify(tracks).replace(/</g, '\\u003c')};
      const track = tracks[Math.floor(Math.random() * tracks.length)];
      player.src = track.url;
      player.volume = 0.3;
      player.loop = true;
      const widget = document.querySelector('.music-widget');
      const songTitle = document.querySelector('.song-title');
      const scroll = document.querySelector('.song-title-scroll');
      const label = '${new URL(musicOrigin).hostname} / ' + track.label;
      const scrollingLabel = label + '    ';
      songTitle.setAttribute('aria-label', label);
      songTitle.title = label;
      for (const copy of scroll.children) copy.textContent = scrollingLabel;
      let characterOffset = 0;

      function advanceSongTitle() {
        if (document.hidden || player.paused) return;
        characterOffset = (characterOffset + 1) % scrollingLabel.length;
        const characterWidth = scroll.children[0].getBoundingClientRect().width / scrollingLabel.length;
        scroll.style.transform = 'translateX(-' + characterOffset * characterWidth + 'px)';
      }

      function enter(event) {
        if (event.target.closest('.back')) return;
        document.removeEventListener('click', enter);
        startVisualizer();
        player.play().catch(() => {});
        player.hidden = false;
        widget.hidden = false;
        window.setInterval(advanceSongTitle, 240);
        profile.inert = false;
        document.body.classList.add('entered');
        if (document.activeElement === prompt) profile.focus({ preventScroll: true });
        prompt.disabled = true;
      }

      document.addEventListener('click', enter);
    })();

${createSkyBackgroundScript()}
`;
