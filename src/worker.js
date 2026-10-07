// src/styles/shared.js
var sharedStyles = `
    :root {
      --font-family: Manrope, sans-serif;
      --page-edge-horizontal: clamp(20px, 3vw, 48px);
      --page-edge-bottom: clamp(18px, 3vw, 42px);
      --page-gutter: 24px;
      --border-width: 1px;
      --footer-font-size: clamp(13px, 1.15vw, 18px);
      --footer-letter-spacing: 0.02em;
      --footer-path-gap: 9px;
      --navigation-height: 42px;
      --navigation-font-size: var(--footer-font-size);
      --navigation-gap: 10px;
      --navigation-padding-left: 14px;
      --navigation-padding-right: 12px;
      --navigation-radius: 12px;
      --navigation-icon-size: 18px;
      --navigation-hover-x: 3px;
      --navigation-hover-y: -3px;
      --navigation-duration: 450ms;
      --navigation-layer: 1;
      --focus-width: 2px;
      --focus-offset: 4px;
    }
    * {
      box-sizing: border-box;
    }
    .navigation-link {
      position: fixed;
      left: var(--page-edge-horizontal);
      bottom: var(--page-edge-bottom);
      z-index: var(--navigation-layer);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--navigation-gap);
      height: var(--navigation-height);
      padding-top: 0;
      padding-right: var(--navigation-padding-right);
      padding-bottom: 0;
      padding-left: var(--navigation-padding-left);
      overflow: hidden;
      border: var(--border-width) solid rgba(153, 139, 224, 0.18);
      border-radius: var(--navigation-radius);
      background: rgba(54, 44, 105, 0.2);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.035),
        0 6px 24px rgba(0, 0, 0, 0.08);
      color: rgba(231, 238, 255, 0.58);
      font-family: var(--font-family);
      font-size: var(--navigation-font-size);
      font-weight: 500;
      line-height: 1;
      letter-spacing: var(--footer-letter-spacing);
      text-decoration: none;
      backdrop-filter: blur(10px);
      transition:
        color var(--navigation-duration) ease,
        background var(--navigation-duration) ease,
        border-color var(--navigation-duration) ease,
        box-shadow var(--navigation-duration) ease;
    }
    .navigation-link::before {
      content: '';
      position: absolute;
      inset: -35%;
      pointer-events: none;
      background: radial-gradient(circle at 32% 72%, rgba(139, 112, 238, 0.3), transparent 55%);
      opacity: 0;
      transform: translate(-12%, 12%);
      transition:
        opacity var(--navigation-duration) ease,
        transform var(--navigation-duration) ease;
    }
    .navigation-link svg,
    .navigation-link span {
      position: relative;
    }
    .navigation-link svg {
      width: var(--navigation-icon-size);
      height: var(--navigation-icon-size);
      flex: none;
      transition: transform var(--navigation-duration) ease;
    }
    .navigation-link:hover,
    .navigation-link:focus-visible {
      color: #ffffff;
      background: rgba(76, 52, 180, 0.56);
      border-color: rgba(176, 158, 246, 0.58);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.17),
        0 0 0 4px rgba(125, 91, 222, 0.06),
        0 8px 30px rgba(72, 43, 167, 0.24);
    }
    .navigation-link:hover::before,
    .navigation-link:focus-visible::before {
      opacity: 1;
      transform: translate(0, 0);
    }
    .navigation-link:hover svg,
    .navigation-link:focus-visible svg {
      transform: translate(var(--navigation-hover-x), var(--navigation-hover-y));
    }
    .navigation-link:focus-visible {
      outline: var(--focus-width) solid #b9a8ff;
      outline-offset: var(--focus-offset);
    }
    .signature,
    .path {
      position: fixed;
      right: var(--page-edge-horizontal);
      z-index: 2;
      margin: 0;
      color: #e7eeff;
      font-family: var(--font-family);
      font-size: var(--footer-font-size);
      font-weight: 500;
      line-height: 1;
      letter-spacing: var(--footer-letter-spacing);
      opacity: 0.34;
      pointer-events: none;
      user-select: none;
    }
    .signature {
      bottom: var(--page-edge-bottom);
    }
    .path {
      bottom: calc(var(--page-edge-bottom) + var(--footer-font-size) + var(--footer-path-gap));
      text-align: right;
    }

    @media (max-width: 600px) {
      :root {
        --navigation-height: 46px;
        --navigation-font-size: 18px;
        --navigation-icon-size: 20px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .navigation-link,
      .navigation-link::before,
      .navigation-link svg {
        transition: none;
      }
    }
`;

// src/styles/home.js
var homeStyles = `
    html,
    body {
      width: 100%;
      height: 100%;
      margin: 0;
      overflow: hidden;
    }
    body {
      background:
        radial-gradient(ellipse at 72% 40%, rgba(44, 76, 126, 0.22), transparent 34%),
        radial-gradient(ellipse at 28% 64%, rgba(73, 40, 108, 0.16), transparent 38%),
        radial-gradient(ellipse at 50% 110%, rgba(20, 55, 88, 0.25), transparent 50%),
        #050711;
    }
    canvas {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      display: block;
    }
    .haze {
      position: fixed;
      inset: -20%;
      pointer-events: none;
      background: conic-gradient(
        from 205deg at 55% 50%,
        transparent 0 24%,
        rgba(97, 123, 181, 0.035) 31%,
        transparent 39% 100%
      );
      filter: blur(32px);
    }
    .ratings-link {
      bottom: calc(
        var(--page-edge-bottom) + var(--navigation-height) + 10px
      );
    }

    @media (max-width: 600px) {
      .haze {
        filter: none;
        opacity: 0.55;
      }
    }
`;

// src/scripts/home.js
var homeScript = `
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

// src/icons.js
var passportDexIcon = "data:image/webp;base64,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";
var discordIcon = "data:image/webp;base64,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";
var tiktokIcon = "data:image/webp;base64,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";
var navigationArrowIcon = `
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <line x1="4.5" y1="15.5" x2="15.5" y2="4.5" />
      <line x1="6.5" y1="4.5" x2="15.5" y2="4.5" />
      <line x1="15.5" y1="4.5" x2="15.5" y2="13.5" />
    </svg>
`;

// src/pages/home.js
var homePage = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#050711">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Manrope:wght@500&display=swap"
    rel="stylesheet"
  >
  <title>moth.mov</title>
  <style>
${sharedStyles}
${homeStyles}
  </style>
</head>
<body>
  <canvas aria-hidden="true"></canvas>
  <div class="haze" aria-hidden="true"></div>
  <a class="navigation-link" href="/kirby" aria-label="Socials">
    <span>socials</span>
    ${navigationArrowIcon}
  </a>
  <a class="navigation-link ratings-link" href="/ratings" aria-label="Ratings">
    <span>ratings</span>
    ${navigationArrowIcon}
  </a>
  <p class="signature">moth.mov</p>
  <script>${homeScript}  <\/script>
</body>
</html>`;

// src/styles/socials.js
var socialsStyles = `
    :root {
      --main-padding: calc(var(--page-edge-bottom) + var(--navigation-height) + 20px);
      --audio-visualizer-height: clamp(24px, 6dvh, 72px);
      --audio-visualizer-gap: 12px;
      --profile-padding: 20px;
      --profile-gap: var(--profile-padding);
      --profile-radius: 42px;
      --avatar-size: clamp(168px, 22.5vw, 234px);
      --avatar-frame-padding: 6px;
      --heading-font-size: clamp(51px, 7.5vw, 87px);
      --handle-font-size: calc(var(--heading-font-size) * 0.225);
      --handle-margin-top: calc(var(--heading-font-size) * -0.24 + 6px);
      --handle-margin-bottom: 12px;
      --social-width: 58px;
      --social-height: 66px;
      --social-icon-size: 56px;
      --social-icon-offset-y: -8px;
      --social-icon-scale: 1.15;
      --entry-fade-duration: 400ms;
      --dimmer-fade-duration: 1000ms;
    }
    html {
      min-height: 100%;
      background: #000000;
    }
    body {
      min-height: 100dvh;
      margin: 0;
      overflow-x: hidden;
      color: #f1f1ff;
      font-family: var(--font-family);
      background: #000000;
    }
    .sky {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .glow {
      position: fixed;
      inset: -25%;
      pointer-events: none;
      background:
        radial-gradient(ellipse 31% 45% at 29% 25%, rgba(255, 255, 255, 0.08), transparent 78%),
        radial-gradient(ellipse 37% 30% at 70% 62%, rgba(255, 255, 255, 0.095), transparent 80%),
        radial-gradient(ellipse 24% 36% at 84% 18%, rgba(255, 255, 255, 0.04), transparent 80%);
      filter: blur(70px);
    }
    .shell {
      position: relative;
      z-index: 1;
      height: 100dvh;
      display: flex;
      flex-direction: column;
    }
    .back {
      --navigation-padding-left: 12px;
      --navigation-padding-right: 14px;
      --navigation-hover-x: -3px;
      --navigation-hover-y: 0;
      --navigation-layer: 5;
    }
    .signature,
    .path {
      z-index: 4;
    }
    .music-widget {
      position: fixed;
      top: var(--page-edge-horizontal);
      left: var(--page-edge-horizontal);
      z-index: 2;
      width: 300px;
      max-width: calc(100vw - var(--page-edge-horizontal) * 2);
    }
    .music-player {
      display: block;
      width: 100%;
      color-scheme: dark;
    }
    .music-widget[hidden],
    .music-player[hidden],
    .audio-visualizer[hidden] {
      display: none;
    }
    .song-title {
      position: relative;
      padding: 7px 0;
      overflow: hidden;
      color: #ffffff;
      font: 12px/20px 'Courier New', monospace;
      letter-spacing: -0.7px;
      text-shadow:
        -0.6px 0 rgba(255, 255, 255, 0.75),
        0.8px 0.4px rgba(255, 255, 255, 0.55),
        0 0 4px rgba(255, 255, 255, 0.40),
        0 0 12px rgba(255, 255, 255, 0.35);
    }
    .song-title::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: repeating-linear-gradient(
        to bottom, transparent 0 2px, rgba(0, 0, 0, 0.22) 2px 3px
      );
    }
    .song-title-scroll {
      display: flex;
      width: max-content;
    }
    .song-title-scroll span {
      white-space: pre;
      flex-shrink: 0;
      transform: scaleY(1.6);
    }
    .audio-visualizer {
      position: absolute;
      bottom: calc(100% + var(--audio-visualizer-gap));
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 40px);
      height: var(--audio-visualizer-height);
      z-index: 2;
      pointer-events: none;
      opacity: 0;
      transition: opacity 600ms ease;
    }
    body.entered .audio-visualizer {
      opacity: 1;
    }
    .entry-dimmer {
      position: fixed;
      inset: 0;
      z-index: 3;
      background: rgba(0, 0, 0, 0.5);
      opacity: 1;
      visibility: visible;
      pointer-events: none;
      transition:
        opacity var(--dimmer-fade-duration) cubic-bezier(0.22, 0.61, 0.36, 1),
        visibility 0ms linear var(--dimmer-fade-duration);
    }
    .profile-stage {
      position: relative;
      max-width: 100%;
    }
    body:not(.entered) .profile {
      visibility: hidden;
      opacity: 0;
    }
    body:not(.entered) {
      cursor: pointer;
    }
    .entry-prompt {
      position: absolute;
      top: calc(100% + 28px);
      left: 50%;
      z-index: 4;
      transform: translateX(-50%);
      width: max-content;
      max-width: calc(100vw - var(--page-gutter) * 2);
      padding: 12px 0;
      border: 0;
      background: transparent;
      color: #ffffff;
      font-family: var(--font-family);
      font-size: clamp(22px, 3vw, 34px);
      font-weight: 600;
      line-height: 1.4;
      letter-spacing: 0.045em;
      cursor: pointer;
      text-align: center;
      text-shadow: 0 0 24px rgba(255, 255, 255, 0.25);
      opacity: 1;
      visibility: visible;
      transition:
        opacity var(--entry-fade-duration) ease,
        visibility 0ms linear var(--entry-fade-duration);
    }
    .entry-prompt:focus-visible {
      outline: var(--focus-width) solid #ffffff;
      outline-offset: 6px;
      border-radius: 8px;
    }
    body.entered .entry-dimmer,
    body.entered .entry-prompt {
      opacity: 0;
      visibility: hidden;
    }
    body.entered .profile {
      animation: profile-enter 470ms both;
    }

    @keyframes profile-enter {
      0% {
        transform: scale(0.1);
        animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
      }
      70% {
        transform: scale(1.03);
        animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
      }
      100% {
        transform: scale(1);
      }
    }

    main {
      flex: 1;
      min-height: 0;
      display: grid;
      place-items: center;
      padding: var(--main-padding) var(--page-gutter);
    }
    .profile {
      position: relative;
      z-index: 4;
      width: fit-content;
      max-width: 100%;
      display: flex;
      align-items: center;
      gap: var(--profile-gap);
      padding: var(--profile-padding);
      border: var(--border-width) solid rgba(255, 255, 255, 0.16);
      border-radius: var(--profile-radius);
      background: linear-gradient(
        145deg,
        rgba(255, 255, 255, 0.075),
        rgba(255, 255, 255, 0.027) 58%,
        rgba(255, 255, 255, 0.045)
      );
      box-shadow:
        0 26px 80px rgba(0, 0, 0, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.09);
      backdrop-filter: blur(18px);
    }
    .avatar-wrap {
      flex: none;
      width: var(--avatar-size);
      aspect-ratio: 1;
      padding: var(--avatar-frame-padding);
      border-radius: var(--profile-radius);
      border: var(--border-width) solid rgba(255, 255, 255, 0.3);
      background: rgba(255, 255, 255, 0.06);
      box-shadow:
        0 0 68px rgba(255, 255, 255, 0.08),
        0 27px 105px rgba(0, 0, 0, 0.34);
    }
    .avatar {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: calc(var(--profile-radius) - var(--avatar-frame-padding) - var(--border-width));
      background: #181629;
    }
    .details {
      min-width: 0;
      max-width: 100%;
    }
    h1 {
      margin: 0;
      padding-inline-end: 0.065em;
      /* Align Manrope's leading glyph bearing independently of tracking. */
      text-indent: -0.05em;
      color: #ffffff;
      font-size: var(--heading-font-size);
      line-height: 1.1;
      letter-spacing: -0.065em;
      font-weight: 700;
    }
    .handle {
      margin: var(--handle-margin-top) 0 var(--handle-margin-bottom);
      color: #ffffff;
      font-size: var(--handle-font-size);
      letter-spacing: var(--footer-letter-spacing);
    }
    .links {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
    .social {
      display: grid;
      grid-template: minmax(0, 1fr) / minmax(0, 1fr);
      place-items: center;
      width: var(--social-width);
      height: var(--social-height);
      color: #ffffff;
      text-decoration: none;
    }
    .social:focus-visible {
      outline: var(--focus-width) solid #ffffff;
      outline-offset: var(--focus-offset);
    }
    .social img {
      width: var(--social-icon-size);
      height: var(--social-icon-size);
      filter:
        drop-shadow(0 0 5px rgba(255, 255, 255, 0.85))
        drop-shadow(0 0 13px rgba(255, 255, 255, 0.45));
      translate: 0 var(--social-icon-offset-y);
      scale: var(--social-icon-scale);
      transition: scale 450ms cubic-bezier(0.22, 0.75, 0.2, 1);
    }
    .social:hover img,
    .social:focus-visible img {
      scale: 1.45;
    }
    .social--tiktok {
      --social-icon-size: 67px;
    }

    /* Reserve the player's own height when it shares the card's horizontal space. */
    @media (max-width: 600px), (max-height: 600px) {
      :root {
        --handle-margin-top: 6px;
        --social-icon-offset-y: 0px;
      }
      .music-widget {
        position: relative;
        top: auto;
        left: auto;
        flex: none;
        margin: var(--page-edge-horizontal) auto 0;
      }
      .music-widget[hidden],
      .music-player[hidden] {
        display: block;
        visibility: hidden;
      }
      main {
        grid-template-rows: minmax(0, 1fr);
        padding-top: calc(var(--audio-visualizer-height) + var(--audio-visualizer-gap) + 16px);
        padding-bottom: 0;
        margin-bottom: var(--main-padding);
      }
      .profile-stage {
        width: 100%;
        height: 100%;
        min-height: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .entry-prompt {
        position: fixed;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }

    @media (min-width: 601px) and (max-height: 600px) {
      :root {
        --profile-padding: 12px;
        --avatar-size: clamp(96px, 26dvh, 156px);
        --heading-font-size: clamp(32px, 8.5dvh, 51px);
        --handle-font-size: 19.5px;
        --handle-margin-bottom: 6px;
        --social-width: 44px;
        --social-height: 44px;
        --social-icon-size: 40px;
      }
      .social--tiktok {
        --social-icon-size: 48px;
      }
    }

    @media (max-width: 600px) {
      :root {
        --page-gutter: 16px;
        --profile-padding: clamp(12px, 2dvh, 16px);
        --profile-gap: 6px;
        --avatar-size: min(352px, calc(100vw - (var(--page-gutter) + var(--profile-padding) + var(--border-width)) * 2));
        --heading-font-size: clamp(36px, 6.5dvh, 51px);
        --handle-font-size: 19.5px;
        --handle-margin-bottom: 0px;
        --social-width: clamp(44px, 7dvh, 58px);
        --social-height: clamp(50px, 8dvh, 66px);
        --social-icon-size: calc(var(--social-height) - 10px);
        --social-icon-scale: 1.25;
      }
      html,
      body {
        overflow: hidden;
      }
      .profile-stage {
        translate: 0 -3dvh;
      }
      .profile {
        width: 100%;
        min-height: 0;
        flex-direction: column;
        padding-bottom: 0;
      }
      .avatar-wrap {
        contain: size;
        flex: 0 1 var(--avatar-size);
        width: auto;
        max-width: 100%;
        min-height: 0;
      }
      .details {
        flex: none;
        text-align: center;
      }
      .links {
        justify-content: center;
        padding-block: var(--profile-padding);
      }
      .social--tiktok {
        --social-icon-size: calc(var(--social-height) + 1px);
      }
    }
    @media (max-height: 520px) {
      main {
        align-items: start;
        overflow: hidden;
      }
      .profile-stage {
        height: auto;
        min-height: 100%;
      }
      .profile {
        flex: none;
      }
    }
    @media (max-width: 600px) and (max-height: 520px) {
      .avatar-wrap {
        flex-basis: clamp(80px, 25dvh, 140px);
      }
    }
`;

// src/scripts/audio-visualizer.js
var audioVisualizerScript = `
function setupAudioVisualizer(player) {
  const canvas = document.querySelector('.audio-visualizer');
  const drawing = canvas?.getContext('2d');
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!drawing || !AudioContextClass) return () => {};

  const barCount = 20;
  const levels = new Float32Array(barCount);
  let audioContext;
  let analyser;
  let frequencies;
  let frame = 0;
  let previousTime = null;
  let width = 0;
  let height = 0;

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    drawing.setTransform(ratio, 0, 0, ratio, 0, 0);
    wake();
  }

  function wake() {
    if (!frame && !document.hidden) {
      previousTime = null;
      frame = requestAnimationFrame(draw);
    }
  }

  function draw(time) {
    frame = 0;
    const elapsed = previousTime === null ? 16 : Math.min(time - previousTime, 64);
    previousTime = time;
    const playing = analyser && audioContext.state === 'running'
      && !player.paused && !player.ended && !player.seeking && player.readyState >= 3;
    if (playing) analyser.getFloatFrequencyData(frequencies);
    drawing.clearRect(0, 0, width, height);
    drawing.fillStyle = 'rgba(235, 240, 255, 0.72)';
    const spacing = width / barCount;
    const barWidth = Math.max(1, spacing * 0.65);
    const binHz = audioContext ? audioContext.sampleRate / analyser.fftSize : 1;
    const maxFrequency = audioContext ? Math.min(16000, audioContext.sampleRate / 2) : 16000;
    const smoothing = 1 - Math.exp(-elapsed / (playing ? 60 : 180));
    let moving = false;
    for (let index = 0; index < barCount; index++) {
      let target = 0;
      if (playing) {
        const low = Math.max(1, Math.floor(40 * Math.pow(maxFrequency / 40, index / barCount) / binHz));
        const high = Math.min(frequencies.length, Math.max(low + 1,
          Math.ceil(40 * Math.pow(maxFrequency / 40, (index + 1) / barCount) / binHz)));
        let sum = 0;
        // Decibel readings retain bass dynamics that byte scaling would clip.
        for (let bin = low; bin < high; bin++) sum += Math.max(-90, frequencies[bin]);
        const level = Math.max(0, (sum / Math.max(1, high - low) + 90) / 90);
        const bassBalance = 0.6 + 0.4 * index / (barCount - 1);
        target = Math.min(1, level * 1.5 * bassBalance);
      }
      levels[index] += (target - levels[index]) * smoothing;
      if (!playing && levels[index] < 0.002) levels[index] = 0;
      moving ||= levels[index] > 0;
      const barHeight = 1 + levels[index] * (height - 4);
      drawing.fillRect(index * spacing + (spacing - barWidth) / 2, height - barHeight, barWidth, barHeight);
    }
    if ((playing || moving) && !document.hidden) frame = requestAnimationFrame(draw);
    else previousTime = null;
  }

  function start() {
    try {
      if (!audioContext) {
        audioContext = new AudioContextClass();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        analyser.smoothingTimeConstant = 0.15;
        frequencies = new Float32Array(analyser.frequencyBinCount);
        const source = audioContext.createMediaElementSource(player);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        audioContext.addEventListener('statechange', wake);
        canvas.hidden = false;
        resize();
      }
      if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
      wake();
    } catch {
      canvas.hidden = true;
    }
  }

  player.addEventListener('play', start);
  for (const event of ['playing', 'pause', 'ended', 'waiting', 'seeking', 'seeked', 'emptied']) {
    player.addEventListener(event, wake);
  }
  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = null;
    } else wake();
  });
  return start;
}
`;

// src/scripts/socials.js
var socialsScript = `
${audioVisualizerScript}
    (() => {
      const player = document.querySelector('.music-player');
      const startVisualizer = setupAudioVisualizer(player);
      const profile = document.querySelector('.profile');
      const prompt = document.querySelector('.entry-prompt');
      const tracks = [
        {
          title: "I Am Robot And Proud - Places We're Trying to Find",
          url: "https://music.moth.mov/I%20Am%20Robot%20And%20Proud%20-%20Places%20We're%20Trying%20to%20Find.flac?visualizer=2",
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

// src/pages/socials.js
var socialsPage = `<!doctype html>
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

// src/pages/ratings.js
var ratingsPage = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ratings</title>
</head>
<body>
  <p>THIS PAGE IS EMPTY. SCRAM.</p>
</body>
</html>`;

// src/worker.js
var htmlHeaders = {
  "content-type": "text/html; charset=UTF-8",
  "cache-control": "no-store"
};
var socialsAliases = /* @__PURE__ */ new Set(["/socials", "/kirbymybae", "/kirby/"]);
var pages = /* @__PURE__ */ new Map([
  ["/kirby", socialsPage],
  ["/ratings", ratingsPage]
]);
var worker_default = {
  fetch(request) {
    const { hostname, pathname, origin } = new URL(request.url);
    if (hostname === "moth.mov" && socialsAliases.has(pathname)) {
      return Response.redirect("https://moth.mov/kirby", 308);
    }
    if (pathname !== "/" && !pages.has(pathname) && !socialsAliases.has(pathname)) {
      return Response.redirect(`${origin}/`, 302);
    }
    const page = hostname === "moth.mov" ? pages.get(pathname) ?? homePage : homePage;
    return new Response(page, { headers: htmlHeaders });
  }
};
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map
