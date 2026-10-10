const defaults = {
  mobileBreakpointPx: 600,
  maxPixelRatio: 1.5,
  mobilePixelRatio: 1.5,
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
  shiftStars: false,
  starShiftMinMs: 15000,
  starShiftMaxMs: 45000,
  starHideMinMs: 700,
  starHideMaxMs: 1800,
  starTint: '230, 232, 255',
  blueStarChance: 0,
  replaceMeteors: false,
  maxMeteors: 5,
  meteorDurationMinMs: 2500,
  meteorDurationMaxMs: 3167,
  meteorLengthMinPx: 150,
  meteorLengthMaxPx: 230,
  meteorDelayMinMs: 1900,
  meteorDelayMaxMs: 3300,
  meteorStartXMin: 0.55,
  meteorStartXMax: 0.95,
  meteorStartYMin: 0.08,
  meteorStartYMax: 0.48,
  meteorVelocityXPxPerMs: -0.288,
  meteorVelocityYPxPerMs: 0.162,
  meteorTailXRatio: 1,
  meteorTailYRatio: 0.56,
  meteorMobileStrokePx: 1.5,
  meteorDesktopStrokePx: 2,
  meteorRadiusPx: 2.3,
  meteorShadowPx: 8,
  blueMeteors: false,
};

const presets = {
  socials: {},
  home: {
    mobilePixelRatio: 1,
    maxStars: 180,
    starAreaPx2: 8500,
    starRadiusMinPx: 0.45,
    starRadiusMaxPx: 1.5,
    starAlphaMin: 1,
    starAlphaMax: 1,
    starSpeedMinRadPerMs: 0.00015,
    starSpeedMaxRadPerMs: 0.00035,
    shiftStars: true,
    starTint: '235, 240, 255',
    blueStarChance: 0.18,
    replaceMeteors: true,
    meteorDurationMinMs: 3704,
    meteorDurationMaxMs: 11112,
    meteorLengthMinPx: 180,
    meteorLengthMaxPx: 260,
    meteorDelayMinMs: 250,
    meteorDelayMaxMs: 700,
    meteorStartXMin: 0.48,
    meteorStartYMin: 0.05,
    meteorStartYMax: 0.55,
    meteorTailXRatio: 0.685714,
    meteorTailYRatio: 0.385714,
    meteorMobileStrokePx: 2,
    meteorRadiusPx: 2.4,
    blueMeteors: true,
  },
};

const spaceBackgroundScript = `
function setupSpaceBackground(canvas, animation) {
  const context = canvas?.getContext('2d');
  if (!context) return () => {};

  const randomBetween = (min, max) => min + Math.random() * (max - min);
  let widthPx = 0;
  let heightPx = 0;
  let stars = [];
  let meteors = [];
  let pendingMeteorTimesMs = [];
  let frame = 0;
  let lastTimeMs = null;
  let nextMeteorMs = 0;
  let hasSeeded = false;

  function wake() {
    if (!frame && !document.hidden) {
      lastTimeMs = null;
      frame = requestAnimationFrame(draw);
    }
  }

  function resize() {
    cancelAnimationFrame(frame);
    frame = 0;
    widthPx = window.innerWidth;
    heightPx = window.innerHeight;
    const resizeTimeMs = performance.now();
    const pixelRatio = Math.min(
      window.devicePixelRatio || 1,
      widthPx < animation.mobileBreakpointPx ? animation.mobilePixelRatio : animation.maxPixelRatio
    );
    canvas.width = Math.round(widthPx * pixelRatio);
    canvas.height = Math.round(heightPx * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    const starCount = Math.min(animation.maxStars, Math.round(widthPx * heightPx / animation.starAreaPx2));
    stars = Array.from({ length: starCount }, () => ({
      xPx: Math.random() * widthPx,
      yPx: Math.random() * heightPx,
      radiusPx: randomBetween(animation.starRadiusMinPx, animation.starRadiusMaxPx),
      alpha: randomBetween(animation.starAlphaMin, animation.starAlphaMax),
      phaseRad: randomBetween(0, Math.PI * 2),
      speedRadPerMs: randomBetween(animation.starSpeedMinRadPerMs, animation.starSpeedMaxRadPerMs),
      nextShiftMs: resizeTimeMs + randomBetween(animation.starShiftMinMs, animation.starShiftMaxMs),
      hideUntilMs: 0,
      tint: Math.random() < animation.blueStarChance ? '190, 210, 255' : animation.starTint,
    }));
    if (!animation.replaceMeteors) {
      meteors = [];
      nextMeteorMs = 0;
    }
    wake();
  }

  function spawnMeteor() {
    if (meteors.length >= animation.maxMeteors) return;
    meteors.push({
      xPx: randomBetween(widthPx * animation.meteorStartXMin, widthPx * animation.meteorStartXMax),
      yPx: randomBetween(heightPx * animation.meteorStartYMin, heightPx * animation.meteorStartYMax),
      lengthPx: randomBetween(animation.meteorLengthMinPx, animation.meteorLengthMaxPx),
      ageMs: 0,
      durationMs: randomBetween(animation.meteorDurationMinMs, animation.meteorDurationMaxMs),
    });
  }

  function draw(timeMs) {
    frame = 0;
    const elapsedMs = lastTimeMs === null
      ? animation.frameDurationMs
      : Math.min(timeMs - lastTimeMs, animation.maxElapsedMs);
    lastTimeMs = timeMs;
    context.clearRect(0, 0, widthPx, heightPx);

    for (const star of stars) {
      if (animation.shiftStars && timeMs >= star.nextShiftMs) {
        if (Math.random() < 0.3) {
          star.xPx = Math.random() * widthPx;
          star.yPx = Math.random() * heightPx;
          star.phaseRad = randomBetween(0, Math.PI * 2);
          star.hideUntilMs = timeMs + randomBetween(animation.starHideMinMs, animation.starHideMaxMs);
        }
        star.nextShiftMs = timeMs + randomBetween(animation.starShiftMinMs, animation.starShiftMaxMs);
      }
      if (timeMs < star.hideUntilMs) continue;
      const shimmer = Math.sin(timeMs * star.speedRadPerMs + star.phaseRad);
      const alpha = star.alpha * (animation.shiftStars ? (shimmer + 1) * 0.5 : 0.65 + 0.35 * shimmer);
      context.fillStyle = 'rgba(' + star.tint + ', ' + alpha + ')';
      context.beginPath();
      context.arc(star.xPx, star.yPx, star.radiusPx, 0, Math.PI * 2);
      context.fill();
    }

    meteors = meteors.filter(meteor => {
      const progress = meteor.ageMs / meteor.durationMs;
      const withinBounds = meteor.xPx > -meteor.lengthPx && meteor.xPx < widthPx + meteor.lengthPx
        && meteor.yPx > -meteor.lengthPx && meteor.yPx < heightPx + meteor.lengthPx;
      const visible = progress < 1 && (!animation.replaceMeteors || progress < 0.5 || withinBounds);
      if (!visible && animation.replaceMeteors) {
        pendingMeteorTimesMs.push(timeMs + randomBetween(animation.meteorDelayMinMs, animation.meteorDelayMaxMs));
      }
      return visible;
    });

    if (animation.replaceMeteors) {
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
    } else if (timeMs >= nextMeteorMs) {
      const count = Math.min(nextMeteorMs === 0 ? 2 : 1, animation.maxMeteors - meteors.length);
      for (let index = 0; index < count; index++) spawnMeteor();
      nextMeteorMs = timeMs + randomBetween(animation.meteorDelayMinMs, animation.meteorDelayMaxMs);
    }

    for (const meteor of meteors) {
      meteor.xPx += animation.meteorVelocityXPxPerMs * elapsedMs;
      meteor.yPx += animation.meteorVelocityYPxPerMs * elapsedMs;
      meteor.ageMs += elapsedMs;
      const fade = Math.max(0, Math.sin(meteor.ageMs / meteor.durationMs * Math.PI));
      const tailXPx = meteor.xPx + meteor.lengthPx * animation.meteorTailXRatio;
      const tailYPx = meteor.yPx - meteor.lengthPx * animation.meteorTailYRatio;
      const mobile = widthPx < animation.mobileBreakpointPx;
      context.lineWidth = mobile ? animation.meteorMobileStrokePx : animation.meteorDesktopStrokePx;

      if (mobile && animation.blueMeteors) {
        context.strokeStyle = 'rgba(211, 229, 255, ' + fade * 0.72 + ')';
      } else {
        const trail = context.createLinearGradient(tailXPx, tailYPx, meteor.xPx, meteor.yPx);
        trail.addColorStop(0, animation.blueMeteors ? 'rgba(163, 196, 255, 0)' : 'rgba(255, 255, 255, 0)');
        trail.addColorStop(animation.blueMeteors ? 0.7 : 0.75, animation.blueMeteors
          ? 'rgba(183, 212, 255, ' + fade * 0.45 + ')'
          : 'rgba(235, 240, 255, ' + fade * 0.58 + ')');
        trail.addColorStop(1, 'rgba(255, 255, 255, ' + fade + ')');
        context.strokeStyle = trail;
        context.shadowColor = animation.blueMeteors
          ? 'rgba(173, 211, 255, ' + fade + ')'
          : 'rgba(255, 255, 255, ' + fade * 0.7 + ')';
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
    if (!document.hidden) frame = requestAnimationFrame(draw);
  }

  function onVisibilityChange() {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTimeMs = null;
    } else wake();
  }

  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', onVisibilityChange);
  resize();

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', onVisibilityChange);
  };
}
`;

export function createSpaceBackgroundScript(preset = 'socials', overrides = {}) {
  if (!Object.hasOwn(presets, preset)) throw new Error(`Unknown space preset: ${preset}`);
  const settings = JSON.stringify({ ...defaults, ...presets[preset], ...overrides }).replace(/</g, '\\u003c');
  return `(${spaceBackgroundScript})(document.querySelector('.space'), ${settings});`;
}
