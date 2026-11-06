import { homePage } from './pages/home.js';
import { socialsPage } from './pages/socials.js';
import { ratingsPage } from './pages/ratings.js';
import { musicPage } from './pages/music.js';
import { loadPreferences } from './data/preferences.js';

const htmlHeaders = {
  "content-type": "text/html; charset=UTF-8",
  "cache-control": "no-store"
};
const socialsAliases = new Set(["/socials", "/kirbymybae", "/kirby/"]);
const pages = new Map([
  ["/kirby", socialsPage],
  ["/ratings", ratingsPage]
]);
const subdomains = new Map([
  ["music.moth.mov", musicPage]
]);
export default {
  async fetch(request, env) {
    const { hostname, pathname, origin } = new URL(request.url);
    const subdomainPage = subdomains.get(hostname);
    if (subdomainPage) {
      if (pathname !== "/") return fetch(request);
      const preferences = await loadPreferences(env);
      return new Response(subdomainPage(preferences.tracks), { headers: htmlHeaders });
    }
    if (pathname === "/profile.webp") {
      if (request.method !== "GET" && request.method !== "HEAD") {
        return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
      }
      const object = await env.SITE_BUCKET.get("profile.webp");
      if (!object) return new Response("Not found", { status: 404 });
      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set("content-type", "image/webp");
      headers.set("cache-control", "no-cache");
      headers.set("etag", object.httpEtag);
      return new Response(request.method === "HEAD" ? null : object.body, { headers });
    }
    if (hostname === "moth.mov" && socialsAliases.has(pathname)) {
      return Response.redirect("https://moth.mov/kirby", 308);
    }
    if (pathname !== "/" && !pages.has(pathname) && !socialsAliases.has(pathname)) {
      return Response.redirect(`${origin}/`, 302);
    }
    const page = hostname === "moth.mov" ? pages.get(pathname) ?? homePage : homePage;
    if (typeof page !== "function") return new Response(page, { headers: htmlHeaders });
    const preferences = await loadPreferences(env);
    return new Response(page(preferences.tracks, preferences.season), { headers: htmlHeaders });
  }
};
