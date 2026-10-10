export const homeScript = `
    (() => {
      const canvas = document.querySelector('canvas');
      const context = canvas.getContext('2d');
      const animation = {
        mobileBreakpointPx: 600,
        maxPixelRatio: 1.5,
        frameDurationMs: 1000 / 60,
        maxElapsedMs: 50,
        maxStars: 180,
        starAreaPx2: 8500,
        starRadiusMinPx: 0.45,
        starRadiusMaxPx: 1.5,
        starSpeedMinRadPerMs: 0.00015,
        starSpeedMaxRadPerMs: 0.00035,
        starShiftMinMs: 15000,
        starShiftMaxMs: 45000,
        starHideMinMs: 700,
        starHideMaxMs: 1800,
        meteorDurationMinMs: 3704,
        meteorDurationMaxMs: 11112,
        meteorLengthMinPx: 180,
        meteorLengthMaxPx: 260,
        meteorDelayMinMs: 250,
        meteorDelayMaxMs: 700,
        meteorVelocityXPxPerMs: -0.288,
        meteorVelocityYPxPerMs: 0.162,
        meteorTailXRatio: 0.685714,
        meteorTailYRatio: 0.385714,
        meteorStrokePx: 2,
        meteorRadiusPx: 2.4,
        meteorShadowPx: 8,
      };
      const randomBetween = (min, max) => min + Math.random() * (max - min);
      let widthPx = 0;
      let heightPx = 0;
      let stars = [];
      let meteors = [];
      let pendingMeteorTimesMs = [];
      let frame = 0;
      let hasSeeded = false;
      let lastTimeMs = null;

      function resize() {
        widthPx = innerWidth;
        heightPx = innerHeight;
        const resizeTimeMs = performance.now();
        const pixelRatio = Math.min(
          devicePixelRatio || 1,
          widthPx < animation.mobileBreakpointPx ? 1 : animation.maxPixelRatio
        );
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
          phaseRad: randomBetween(0, Math.PI * 2),
          speedRadPerMs: randomBetween(
            animation.starSpeedMinRadPerMs,
            animation.starSpeedMaxRadPerMs
          ),
          nextShiftMs: resizeTimeMs + randomBetween(
            animation.starShiftMinMs,
            animation.starShiftMaxMs
          ),
          hideUntilMs: 0,
          tint: Math.random() < 0.18 ? '190, 210, 255' : '235, 240, 255',
        }));
        cancelAnimationFrame(frame);
        lastTimeMs = null;
        frame = requestAnimationFrame(draw);
      }

      function spawnMeteor() {
        meteors.push({
          xPx: randomBetween(widthPx * 0.48, widthPx * 0.95),
          yPx: randomBetween(heightPx * 0.05, heightPx * 0.55),
          ageMs: 0,
          durationMs: randomBetween(animation.meteorDurationMinMs, animation.meteorDurationMaxMs),
          lengthPx: randomBetween(animation.meteorLengthMinPx, animation.meteorLengthMaxPx),
        });
      }

      function draw(timeMs) {
        const elapsedMs = lastTimeMs === null
          ? animation.frameDurationMs
          : Math.min(timeMs - lastTimeMs, animation.maxElapsedMs);
        lastTimeMs = timeMs;
        context.clearRect(0, 0, widthPx, heightPx);

        for (const star of stars) {
          if (timeMs >= star.nextShiftMs) {
            if (Math.random() < 0.3) {
              star.xPx = Math.random() * widthPx;
              star.yPx = Math.random() * heightPx;
              star.phaseRad = randomBetween(0, Math.PI * 2);
              star.hideUntilMs = timeMs + randomBetween(
                animation.starHideMinMs,
                animation.starHideMaxMs
              );
            }
            star.nextShiftMs = timeMs + randomBetween(
              animation.starShiftMinMs,
              animation.starShiftMaxMs
            );
          }
          if (timeMs < star.hideUntilMs) continue;
          const shimmer = (Math.sin(timeMs * star.speedRadPerMs + star.phaseRad) + 1) * 0.5;
          context.beginPath();
          context.arc(star.xPx, star.yPx, star.radiusPx, 0, Math.PI * 2);
          context.fillStyle = 'rgba(' + star.tint + ', ' + shimmer + ')';
          context.fill();
        }

        meteors = meteors.filter(meteor => {
          const progress = meteor.ageMs / meteor.durationMs;
          const withinBounds = meteor.xPx > -meteor.lengthPx
            && meteor.xPx < widthPx + meteor.lengthPx
            && meteor.yPx > -meteor.lengthPx
            && meteor.yPx < heightPx + meteor.lengthPx;
          const visible = progress < 1 && (progress < 0.5 || withinBounds);
          if (!visible) {
            pendingMeteorTimesMs.push(
              timeMs + randomBetween(animation.meteorDelayMinMs, animation.meteorDelayMaxMs)
            );
          }
          return visible;
        });

        if (!hasSeeded) {
          const initialCount = 1 + Math.floor(randomBetween(0, 3));
          for (let index = 0; index < initialCount; index++) spawnMeteor();
          hasSeeded = true;
        }

        pendingMeteorTimesMs = pendingMeteorTimesMs.filter(spawnAtMs => {
          if (timeMs < spawnAtMs) return true;
          spawnMeteor();
          return false;
        });

        for (const meteor of meteors) {
          meteor.xPx += animation.meteorVelocityXPxPerMs * elapsedMs;
          meteor.yPx += animation.meteorVelocityYPxPerMs * elapsedMs;
          meteor.ageMs += elapsedMs;
          const fade = Math.sin(meteor.ageMs / meteor.durationMs * Math.PI);
          const tailXPx = meteor.xPx + meteor.lengthPx * animation.meteorTailXRatio;
          const tailYPx = meteor.yPx - meteor.lengthPx * animation.meteorTailYRatio;
          context.lineWidth = animation.meteorStrokePx;

          if (widthPx < animation.mobileBreakpointPx) {
            context.strokeStyle = 'rgba(211, 229, 255, ' + fade * 0.72 + ')';
          } else {
            const gradient = context.createLinearGradient(tailXPx, tailYPx, meteor.xPx, meteor.yPx);
            gradient.addColorStop(0, 'rgba(163, 196, 255, 0)');
            gradient.addColorStop(0.7, 'rgba(183, 212, 255, ' + fade * 0.45 + ')');
            gradient.addColorStop(1, 'rgba(255, 255, 255, ' + fade + ')');
            context.strokeStyle = gradient;
            context.shadowColor = 'rgba(173, 211, 255, ' + fade + ')';
            context.shadowBlur = animation.meteorShadowPx;
          }

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
