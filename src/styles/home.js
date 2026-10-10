export const homeStyles = `
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
