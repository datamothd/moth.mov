import { audioVisualizerScript } from './audio-visualizer.js';
import { musicOrigin, tracks } from '../data/music.js';
import { createSpaceBackgroundScript } from './space.js';
import { highlight, accent } from '../styles/socials-theme.js';

const toRgb = color => color.match(/\w{2}/g).map(channel => parseInt(channel, 16)).join(', ');
const starTint = toRgb(highlight);

export const socialsScript = `
${audioVisualizerScript}
    (() => {
      const player = document.querySelector('.music-player');
      const startVisualizer = setupAudioVisualizer(player, '${highlight}');
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
      for (const [index, copy] of Array.from(scroll.children).entries()) {
        const link = document.createElement('a');
        link.href = '${musicOrigin}';
        link.textContent = '${new URL(musicOrigin).hostname}';
        if (index > 0) {
          link.tabIndex = -1;
          copy.setAttribute('aria-hidden', 'true');
        }
        copy.replaceChildren(link, document.createTextNode(' / ' + track.label + '    '));
      }
      let characterOffset = 0;
      let pointerDown = false;

      songTitle.addEventListener('pointerdown', () => { pointerDown = true; });
      window.addEventListener('pointerup', () => { pointerDown = false; });
      window.addEventListener('pointercancel', () => { pointerDown = false; });
      songTitle.addEventListener('focusin', event => {
        if (!event.target.matches('a:focus-visible')) return;
        characterOffset = 0;
        scroll.style.transform = 'translateX(0)';
      });

      function advanceSongTitle() {
        if (document.hidden || player.paused || pointerDown ||
            songTitle.matches(':hover') || songTitle.querySelector('a:focus-visible')) return;
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

${createSpaceBackgroundScript('socials', { starTint, meteorTint: starTint, meteorTrailTint: toRgb(accent) })}
`;
