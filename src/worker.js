import { homePage } from './pages/home.js';
import { socialsPage } from './pages/socials.js';
import { ratingsPage } from './pages/ratings.js';

const htmlHeaders = {
  "content-type": "text/html; charset=UTF-8",
  "cache-control": "no-store"
};
const socialsAliases = new Set(["/socials", "/kirbymybae", "/kirby/"]);
const pages = new Map([
  ["/kirby", socialsPage],
  ["/ratings", ratingsPage]
]);
export default {
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
