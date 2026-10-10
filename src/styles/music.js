export const musicStyles = `
    :root {
      color-scheme: dark;
      background: #000000;
      color: #ffffff;
      font-family: system-ui, sans-serif;
    }
    body {
      margin: 0;
      min-height: 100dvh;
    }
    main {
      position: relative;
      max-width: 640px;
      margin: 0 auto;
      padding: 32px 20px;
    }
    h1 {
      margin-top: 0;
    }
    .tracks {
      list-style: none;
      margin: 0 0 32px;
      padding: 0;
    }
    .tracks li + li {
      margin-top: 28px;
    }
    .tracks p {
      margin: 0 0 8px;
      overflow-wrap: anywhere;
    }
    .tracks audio {
      display: block;
      width: 100%;
    }
    a {
      color: inherit;
    }
`;
