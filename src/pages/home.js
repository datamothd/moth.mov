import { spaceBackgroundMarkup, spaceBackgroundStyles } from '../components/space-background.js';
import { sharedStyles } from '../styles/shared.js';
import { homeStyles } from '../styles/home.js';
import { homeScript } from '../scripts/home.js';
import { navigationArrowIcon } from '../icons.js';

export const homePage = `<!doctype html>
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
${spaceBackgroundStyles}
${homeStyles}
  </style>
</head>
<body>
  ${spaceBackgroundMarkup}
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
