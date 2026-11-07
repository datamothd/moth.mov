export const sharedStyles = `
    :root {
      --font-family: Manrope, sans-serif;
      --page-edge-horizontal: clamp(20px, 3vw, 48px);
      --page-edge-bottom: clamp(18px, 3vw, 42px);
      --page-gutter: 24px;
      --border-width: 1px;
      --footer-font-size: clamp(13px, 1.15vw, 18px);
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
      --navigation-duration: 225ms;
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
      padding: 0 var(--navigation-padding-right) 0 var(--navigation-padding-left);
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
      letter-spacing: calc(var(--navigation-font-size) * 0.02);
      text-decoration: none;
      backdrop-filter: blur(10px);
      transition:
        color var(--navigation-duration) ease,
        background-color var(--navigation-duration) ease,
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
      transition: opacity var(--navigation-duration) ease;
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
      letter-spacing: calc(var(--footer-font-size) * 0.02);
      opacity: 0.34;
      pointer-events: none;
      user-select: none;
    }
    .signature {
      bottom: var(--page-edge-bottom);
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .signature-github {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1em;
      height: 1em;
      color: inherit;
      text-decoration: none;
      pointer-events: auto;
    }
    .signature-github svg {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    .signature-github .signature-github-glow {
      position: absolute;
      inset: 0;
      pointer-events: none;
      filter: blur(5px) drop-shadow(0 0 1px currentColor);
      transform: scale(1.25);
      opacity: 0;
      transition: opacity var(--navigation-duration) ease;
    }
    .signature-github:hover .signature-github-glow,
    .signature-github:focus-visible .signature-github-glow {
      opacity: 0.5;
    }
    .signature-github:focus-visible {
      outline: var(--focus-width) solid currentColor;
      outline-offset: var(--focus-offset);
      border-radius: 50%;
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
      .navigation-link svg,
      .navigation-link:hover svg,
      .navigation-link:focus-visible svg {
        transform: none;
        transition: none;
      }
    }
`;
