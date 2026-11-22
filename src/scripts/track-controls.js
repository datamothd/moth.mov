export const trackControlsScript = `
    (() => {
      const nativeControls = window.matchMedia('(max-width: 600px), (pointer: coarse)');
      const formatTime = value => {
        const seconds = Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
        return Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2, '0');
      };
      document.querySelectorAll('.tracks audio').forEach(player => {
        player.volume = 0.5;
        const controls = player.nextElementSibling;
        const play = controls.querySelector('.track-play');
        const seek = controls.querySelector('.track-seek');
        const time = controls.querySelector('.track-time');
        const volumeControl = controls.querySelector('.track-volume');
        const mute = volumeControl.querySelector('button');
        const volume = volumeControl.querySelector('input');
        function syncMode() {
          controls.hidden = nativeControls.matches;
          player.hidden = !nativeControls.matches;
          player.controls = nativeControls.matches;
        }
        function syncPlayback() {
          const playing = !player.paused && !player.ended;
          play.firstElementChild.toggleAttribute('hidden', playing);
          play.lastElementChild.toggleAttribute('hidden', !playing);
          play.setAttribute('aria-label', playing ? 'Pause' : 'Play');
        }
        function syncProgress() {
          const duration = Number.isFinite(player.duration) ? player.duration : 0;
          const elapsed = formatTime(player.currentTime);
          const total = formatTime(duration);
          seek.disabled = duration <= 0;
          seek.max = duration;
          seek.value = player.currentTime;
          seek.style.setProperty('--progress', (duration > 0 ? player.currentTime / duration * 100 : 0) + '%');
          seek.setAttribute('aria-valuetext', elapsed + ' of ' + total);
          time.textContent = elapsed + ' / ' + total;
        }
        function syncVolume() {
          volume.value = player.muted ? 0 : player.volume;
          volume.style.setProperty('--progress', Number(volume.value) * 100 + '%');
          const silent = Number(volume.value) === 0;
          mute.setAttribute('aria-label', silent ? 'Unmute' : 'Mute');
          mute.setAttribute('aria-pressed', String(silent));
        }
        function setVolume(value) {
          player.volume = Math.min(1, Math.max(0, value));
          player.muted = false;
          syncVolume();
        }
        play.addEventListener('click', () => {
          if (player.paused) player.play().catch(() => { time.textContent = 'Unavailable'; });
          else player.pause();
        });
        seek.addEventListener('input', () => { player.currentTime = Number(seek.value); });
        mute.addEventListener('click', () => {
          if (player.volume === 0) setVolume(0.5);
          else player.muted = !player.muted;
        });
        volume.addEventListener('input', () => setVolume(Number(volume.value)));
        volumeControl.addEventListener('wheel', event => {
          if (nativeControls.matches || event.ctrlKey || event.deltaY === 0) return;
          event.preventDefault();
          const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 800 : 1);
          setVolume((player.muted ? 0 : player.volume) - Math.max(-0.1, Math.min(0.1, delta / 2000)));
        }, { passive: false });
        for (const event of ['play', 'pause', 'ended']) player.addEventListener(event, syncPlayback);
        for (const event of ['durationchange', 'timeupdate', 'emptied']) player.addEventListener(event, syncProgress);
        player.addEventListener('volumechange', syncVolume);
        nativeControls.addEventListener('change', syncMode);
        syncPlayback();
        syncProgress();
        syncVolume();
        syncMode();
      });
    })();
`;
