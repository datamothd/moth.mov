import { audioVisualizerScript } from './audio-visualizer.js';
import { tracks as fallbackTracks } from '../data/music.js';
import { createSpaceBackgroundScript } from './space.js';
import { getSocialsTheme } from '../styles/socials-theme.js';

const toRgb = color => color.match(/\w{2}/g).map(channel => parseInt(channel, 16)).join(', ');
export const socialsScript = (tracks = fallbackTracks, { highlight, accent } = getSocialsTheme(), effect = 'meteors') => {
  const starTint = toRgb(highlight);
  return `
${audioVisualizerScript}
    (() => {
      const player = document.querySelector('.music-player');
      const startVisualizer = setupAudioVisualizer(player, '${highlight}');
      const profile = document.querySelector('.profile');
      const prompt = document.querySelector('.entry-prompt');
      const tracks = ${JSON.stringify(tracks).replace(/</g, '\\u003c')};
      let trackIndex = Math.floor(Math.random() * tracks.length);
      const track = tracks[trackIndex];
      player.src = track.url;
      player.volume = 0.3;
      player.loop = true;
      const widget = document.querySelector('.music-widget');
      const toggle = document.querySelector('.music-toggle');
      const seek = document.querySelector('.music-seek');
      const volume = document.querySelector('.music-volume');
      const mute = document.querySelector('.music-volume-toggle');
      const time = document.querySelector('.music-time');
      const status = document.querySelector('.music-status');
      const title = document.querySelector('.music-title');
      const artist = document.querySelector('.music-artist');
      title.textContent = track.title;
      title.title = track.title;
      artist.textContent = track.artist;
      artist.title = track.artist;

      function formatTime(value) {
        const seconds = Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
        return Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2, '0');
      }

      function syncPlayback() {
        const playing = !player.paused && !player.ended;
        toggle.classList.toggle('is-playing', playing);
        toggle.setAttribute('aria-label', playing ? 'Pause' : 'Play');
      }

      function syncProgress() {
        const duration = Number.isFinite(player.duration) ? player.duration : 0;
        seek.disabled = duration <= 0;
        seek.max = duration;
        seek.value = player.currentTime;
        seek.style.setProperty('--progress', (duration > 0 ? Math.min(100, Math.max(0, player.currentTime / duration * 100)) : 0) + '%');
        seek.setAttribute('aria-valuetext', formatTime(player.currentTime) + ' of ' + formatTime(duration));
        const totalSeconds = Math.ceil(duration);
        const elapsedSeconds = Math.min(totalSeconds, Math.floor(player.currentTime));
        time.textContent = formatTime(elapsedSeconds) + ' / ' + formatTime(totalSeconds);
        time.setAttribute('aria-label', formatTime(elapsedSeconds) + ' elapsed, ' + formatTime(totalSeconds) + ' total');
      }

      function play() {
        status.textContent = '';
        startVisualizer();
        player.play().catch(() => {
          status.textContent = 'Playback unavailable. Try again.';
          syncPlayback();
        });
      }

      function changeTrack(offset) {
        const wasPlaying = !player.paused;
        trackIndex = (trackIndex + offset + tracks.length) % tracks.length;
        const next = tracks[trackIndex];
        player.src = next.url;
        title.textContent = title.title = next.title;
        artist.textContent = artist.title = next.artist;
        status.textContent = '';
        syncProgress();
        syncPlayback();
        if (wasPlaying) play();
      }
      document.querySelector('.music-previous').addEventListener('click', () => changeTrack(-1));
      document.querySelector('.music-next').addEventListener('click', () => changeTrack(1));
      toggle.addEventListener('click', () => {
        if (player.paused) play();
        else player.pause();
      });
      seek.addEventListener('input', () => {
        player.currentTime = Number(seek.value);
        syncProgress();
      });
      volume.addEventListener('input', () => {
        player.volume = Number(volume.value);
        player.muted = false;
      });
      mute.addEventListener('click', () => {
        if (player.volume === 0) {
          player.volume = 0.3;
          player.muted = false;
        }
        else player.muted = !player.muted;
      });
      player.addEventListener('volumechange', () => {
        volume.value = player.muted ? 0 : player.volume;
        volume.style.setProperty('--progress', Number(volume.value) * 100 + '%');
        const silent = player.muted || player.volume === 0;
        mute.setAttribute('aria-label', silent ? 'Unmute' : 'Mute');
        mute.setAttribute('aria-pressed', String(silent));
      });
      for (const event of ['play', 'pause', 'ended']) player.addEventListener(event, syncPlayback);
      for (const event of ['loadedmetadata', 'durationchange', 'timeupdate', 'emptied']) {
        player.addEventListener(event, syncProgress);
      }
      player.addEventListener('error', () => {
        status.textContent = 'Audio unavailable. Try again.';
        syncPlayback();
      });
      syncPlayback();
      syncProgress();

      function enter(event) {
        if (event.target.closest('.back')) return;
        document.removeEventListener('click', enter);
        play();
        widget.hidden = false;
        profile.inert = false;
        document.body.classList.add('entered');
        if (document.activeElement === prompt) profile.focus({ preventScroll: true });
        prompt.disabled = true;
      }

      document.addEventListener('click', enter);
    })();

${createSpaceBackgroundScript('socials', { effect, starTint, meteorTint: starTint, meteorTrailTint: toRgb(accent) })}
`;
};
