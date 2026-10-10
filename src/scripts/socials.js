import { audioVisualizerScript } from './audio-visualizer.js';

export const socialsScript = `
${audioVisualizerScript}
    (() => {
      const player = document.querySelector('.music-player');
      const startVisualizer = setupAudioVisualizer(player);
      const profile = document.querySelector('.profile');
      const prompt = document.querySelector('.entry-prompt');
      const tracks = [
        {
          title: "I Am Robot And Proud - Places We're Trying to Find",
          url: "https://music.moth.mov/I%20Am%20Robot%20And%20Proud%20-%20Places%20We're%20Trying%20to%20Find.flac",
        },
        {
          title: "Accelera Deck - Crystallized",
          url: "https://music.moth.mov/Accelera%20Deck%20-%20Crystallized.flac",
        },
        {
          title: "Tek Lintowe - Salt Looks Like Sugar",
          url: "https://music.moth.mov/Tek%20lintowe%20-%20Salt%20Looks%20Like%20Sugar.flac",
        },
        {
          title: "Akira Yamaoka - Heaven's Night",
          url: "https://music.moth.mov/Akira%20Yamaoka%20-%20Heaven's%20Night.flac",
        },
        {
          title: "Akira Yamaoka - Lament of Heavens Night",
          url: "https://music.moth.mov/Akira%20Yamaoka%20-%20Lament%20of%20Heavens%20Night.flac",
        },
      ];
      const track = tracks[Math.floor(Math.random() * tracks.length)];
      player.src = track.url;
      player.volume = 0.3;
      player.loop = true;
      const widget = document.querySelector('.music-widget');
      const songTitle = document.querySelector('.song-title');
      const scroll = document.querySelector('.song-title-scroll');
      const label = 'music.moth.mov / ' + track.title;
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

    (() => {
      const canvas = document.querySelector('.sky');
      const context = canvas.getContext('2d');
      const animation = {
        mobileBreakpointPx: 600,
        maxPixelRatio: 1.5,
        frameDurationMs: 1000 / 60,
        maxElapsedMs: 50,
        maxStars: 220,
        starAreaPx2: 6500,
        starRadiusMinPx: 0.3,
        starRadiusMaxPx: 1.4,
        starAlphaMin: 0.15,
        starAlphaMax: 0.7,
        starSpeedMinRadPerMs: 0.0003,
        starSpeedMaxRadPerMs: 0.001,
        maxMeteors: 5,
        meteorDurationMinMs: 2500,
        meteorDurationMaxMs: 3167,
        meteorLengthMinPx: 150,
        meteorLengthMaxPx: 230,
        meteorDelayMinMs: 1900,
        meteorDelayMaxMs: 3300,
        meteorVelocityXPxPerMs: -0.288,
        meteorVelocityYPxPerMs: 0.162,
        meteorTailYRatio: 0.56,
        meteorMobileStrokePx: 1.5,
        meteorDesktopStrokePx: 2,
        meteorRadiusPx: 2.3,
        meteorShadowPx: 8,
      };
      const randomBetween = (min, max) => min + Math.random() * (max - min);
      const meteors = [];
      let widthPx = 0;
      let heightPx = 0;
      let stars = [];
      let frame = 0;
      let lastTimeMs = null;
      let nextMeteorMs = 0;

      function resize() {
        cancelAnimationFrame(frame);
        widthPx = innerWidth;
        heightPx = innerHeight;
        const pixelRatio = Math.min(devicePixelRatio || 1, animation.maxPixelRatio);
        canvas.width = Math.round(widthPx * pixelRatio);
        canvas.height = Math.round(heightPx * pixelRatio);
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        const starCount = Math.min(
          animation.maxStars,
          Math.round(widthPx * heightPx / animation.starAreaPx2)
        );
        stars = Array.from({ length: starCount }, () => ({
          xPx: Math.random() * widthPx,
          yPx: Math.random() * heightPx,
          radiusPx: randomBetween(animation.starRadiusMinPx, animation.starRadiusMaxPx),
          alpha: randomBetween(animation.starAlphaMin, animation.starAlphaMax),
          phaseRad: randomBetween(0, Math.PI * 2),
          speedRadPerMs: randomBetween(
            animation.starSpeedMinRadPerMs,
            animation.starSpeedMaxRadPerMs
          ),
        }));
        meteors.length = 0;
        lastTimeMs = null;
        nextMeteorMs = 0;
        frame = requestAnimationFrame(draw);
      }
      function draw(timeMs) {
        const elapsedMs = lastTimeMs === null
          ? animation.frameDurationMs
          : Math.min(timeMs - lastTimeMs, animation.maxElapsedMs);
        lastTimeMs = timeMs;
        context.clearRect(0, 0, widthPx, heightPx);
        for (const star of stars) {
          const shimmer = Math.sin(timeMs * star.speedRadPerMs + star.phaseRad);
          const alpha = star.alpha * (0.65 + 0.35 * shimmer);
          context.fillStyle = 'rgba(230, 232, 255, ' + alpha + ')';
          context.beginPath();
          context.arc(star.xPx, star.yPx, star.radiusPx, 0, Math.PI * 2);
          context.fill();
        }
        if (timeMs >= nextMeteorMs) {
          const count = Math.min(nextMeteorMs === 0 ? 2 : 1, animation.maxMeteors - meteors.length);
          for (let index = 0; index < count; index++) {
            meteors.push({
              xPx: randomBetween(widthPx * 0.55, widthPx * 0.95),
              yPx: randomBetween(heightPx * 0.08, heightPx * 0.48),
              lengthPx: randomBetween(animation.meteorLengthMinPx, animation.meteorLengthMaxPx),
              ageMs: 0,
              durationMs: randomBetween(
                animation.meteorDurationMinMs,
                animation.meteorDurationMaxMs
              ),
            });
          }
          nextMeteorMs = timeMs + randomBetween(
            animation.meteorDelayMinMs,
            animation.meteorDelayMaxMs
          );
        }
        for (let index = meteors.length - 1; index >= 0; index--) {
          const meteor = meteors[index];
          meteor.xPx += animation.meteorVelocityXPxPerMs * elapsedMs;
          meteor.yPx += animation.meteorVelocityYPxPerMs * elapsedMs;
          meteor.ageMs += elapsedMs;
          if (meteor.ageMs >= meteor.durationMs) {
            meteors.splice(index, 1);
            continue;
          }
          const fade = Math.sin(meteor.ageMs / meteor.durationMs * Math.PI);
          const tailXPx = meteor.xPx + meteor.lengthPx;
          const tailYPx = meteor.yPx - meteor.lengthPx * animation.meteorTailYRatio;
          const trail = context.createLinearGradient(tailXPx, tailYPx, meteor.xPx, meteor.yPx);
          trail.addColorStop(0, 'rgba(255, 255, 255, 0)');
          trail.addColorStop(0.75, 'rgba(235, 240, 255, ' + fade * 0.58 + ')');
          trail.addColorStop(1, 'rgba(255, 255, 255, ' + fade + ')');
          context.strokeStyle = trail;
          context.lineWidth = widthPx < animation.mobileBreakpointPx
            ? animation.meteorMobileStrokePx
            : animation.meteorDesktopStrokePx;
          context.shadowColor = 'rgba(255, 255, 255, ' + fade * 0.7 + ')';
          context.shadowBlur = animation.meteorShadowPx;
          context.beginPath();
          context.moveTo(tailXPx, tailYPx);
          context.lineTo(meteor.xPx, meteor.yPx);
          context.stroke();
          context.fillStyle = 'rgba(255, 255, 255, ' + fade + ')';
          context.beginPath();
          context.arc(meteor.xPx, meteor.yPx, animation.meteorRadiusPx, 0, Math.PI * 2);
          context.fill();
          context.shadowBlur = 0;
        }
        frame = requestAnimationFrame(draw);
      }
      addEventListener('resize', resize, { passive: true });
      resize();
    })();
`;
