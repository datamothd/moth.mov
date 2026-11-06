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
      const nativePlayer = window.matchMedia('(max-width: 600px), (pointer: coarse)');
      player.controls = nativePlayer.matches;
      const startVisualizer = setupAudioVisualizer(player, '${highlight}');
      const profile = document.querySelector('.profile');
      const prompt = document.querySelector('.entry-prompt');
      const tracks = ${JSON.stringify(tracks).replace(/</g, '\\u003c')};
      let trackIndex = Math.floor(Math.random() * tracks.length);
      const track = tracks[trackIndex];
      player.src = track.url;
      let volumeLevel = nativePlayer.matches ? 1 : 0.3;
      startVisualizer.setVolume(volumeLevel);
      nativePlayer.addEventListener('change', () => {
        player.controls = nativePlayer.matches;
        volumeLevel = nativePlayer.matches ? 1 : 0.3;
        startVisualizer.setVolume(volumeLevel);
        syncVolume();
        syncArtwork(tracks[trackIndex]);
      });
      player.loop = true;
      const widget = document.querySelector('.music-widget');
      const toggle = document.querySelector('.music-toggle');
      const seek = document.querySelector('.music-seek');
      const volume = document.querySelector('.music-volume');
      const volumeControl = document.querySelector('.music-volume-control');
      const mute = document.querySelector('.music-volume-toggle');
      const time = document.querySelector('.music-time');
      const status = document.querySelector('.music-status');
      const title = document.querySelector('.music-title');
      const artist = document.querySelector('.music-artist');
      const artwork = document.querySelector('.music-artwork');
      const cover = document.querySelector('.music-cover');
      let artworkRequest;
      let seekTime = null;
      function syncArtwork(currentTrack) {
        artworkRequest = null;
        cover.hidden = true;
        cover.removeAttribute('src');
        artwork.classList.remove('has-artwork');
        artwork.setAttribute('aria-label', 'Album artwork placeholder');
        if (nativePlayer.matches || !currentTrack.artworkUrl) return;
        const request = new Image();
        artworkRequest = request;
        request.onload = () => {
          if (artworkRequest !== request) return;
          cover.src = currentTrack.artworkUrl;
          cover.hidden = false;
          artwork.classList.add('has-artwork');
          artwork.setAttribute('aria-label', currentTrack.title + ' by ' + currentTrack.artist + ' album artwork');
        };
        request.src = currentTrack.artworkUrl;
      }
      title.textContent = title.title = track.title;
      artist.textContent = artist.title = track.artist;
      syncArtwork(track);

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
        const duration = Number.isFinite(player.duration) ? Math.max(0, player.duration) : 0;
        const position = Math.min(duration, Math.max(0, seekTime ?? player.currentTime));
        const elapsed = formatTime(position);
        const total = formatTime(duration);
        seek.disabled = duration <= 0;
        seek.max = duration;
        seek.value = position;
        seek.style.setProperty('--progress', (duration > 0 ? position / duration * 100 : 0) + '%');
        seek.setAttribute('aria-valuetext', elapsed + ' of ' + total);
        time.textContent = elapsed + ' / ' + total;
        time.setAttribute('aria-label', elapsed + ' elapsed, ' + total + ' total');
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
        seekTime = null;
        player.src = next.url;
        title.textContent = title.title = next.title;
        artist.textContent = artist.title = next.artist;
        syncArtwork(next);
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
        seekTime = Number(seek.value);
        syncProgress();
      });
      seek.addEventListener('change', () => {
        if (!seek.disabled) player.currentTime = Number(seek.value);
        seekTime = null;
        syncProgress();
      });
      volume.addEventListener('input', () => {
        volumeLevel = Number(volume.value);
        startVisualizer.setVolume(volumeLevel);
        player.muted = false;
        syncVolume();
      });
      volumeControl.addEventListener('wheel', event => {
        if (event.ctrlKey || event.deltaY === 0) return;
        event.preventDefault();
        const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 800 : 1);
        volumeLevel = Math.min(1, Math.max(0, (player.muted ? 0 : volumeLevel) - Math.max(-0.1, Math.min(0.1, delta / 2000))));
        startVisualizer.setVolume(volumeLevel);
        player.muted = false;
        syncVolume();
      }, { passive: false });
      mute.addEventListener('click', () => {
        if (volumeLevel === 0) {
          volumeLevel = 0.3;
          startVisualizer.setVolume(volumeLevel);
          player.muted = false;
        }
        else player.muted = !player.muted;
        syncVolume();
      });
      function syncVolume() {
        volume.value = player.muted ? 0 : volumeLevel;
        volume.style.setProperty('--progress', Number(volume.value) * 100 + '%');
        const silent = player.muted || volumeLevel === 0;
        mute.setAttribute('aria-label', silent ? 'Unmute' : 'Mute');
        mute.setAttribute('aria-pressed', String(silent));
      }
      player.addEventListener('volumechange', () => syncVolume());
      for (const slider of [seek, volume]) {
        let pointerId = null;
        const updateSlider = event => {
          const bounds = slider.getBoundingClientRect();
          const thumb = window.matchMedia('(any-pointer: coarse)').matches ? 22 : 13;
          const fraction = Math.min(1, Math.max(0, (event.clientX - bounds.left - thumb / 2) / Math.max(1, bounds.width - thumb)));
          slider.value = Number(slider.min) + fraction * (Number(slider.max) - Number(slider.min));
          slider.dispatchEvent(new Event('input', { bubbles: true }));
        };
        slider.addEventListener('pointerdown', event => {
          if (event.pointerType === 'mouse' || slider.disabled || pointerId !== null) return;
          event.preventDefault();
          pointerId = event.pointerId;
          slider.setPointerCapture(pointerId);
          slider.focus({ preventScroll: true });
          updateSlider(event);
        });
        slider.addEventListener('pointermove', event => {
          if (event.pointerId !== pointerId) return;
          event.preventDefault();
          updateSlider(event);
        });
        const endDrag = event => {
          if (event.pointerId !== pointerId) return;
          if (event.type === 'pointerup') updateSlider(event);
          pointerId = null;
          if (slider.hasPointerCapture(event.pointerId)) slider.releasePointerCapture(event.pointerId);
          slider.dispatchEvent(new Event('change', { bubbles: true }));
        };
        slider.addEventListener('pointerup', endDrag);
        slider.addEventListener('pointercancel', endDrag);
        slider.addEventListener('lostpointercapture', endDrag);
      }
      for (const event of ['play', 'pause', 'ended']) player.addEventListener(event, syncPlayback);
      for (const event of ['loadedmetadata', 'durationchange', 'timeupdate', 'seeked', 'ended', 'emptied']) {
        player.addEventListener(event, syncProgress);
      }
      player.addEventListener('error', () => {
        status.textContent = 'Audio unavailable. Try again.';
        syncPlayback();
      });
      syncPlayback();
      syncProgress();
      syncVolume();

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
