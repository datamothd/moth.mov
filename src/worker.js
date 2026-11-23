import { homePage } from './pages/home.js';
import { socialsPage } from './pages/socials.js';
import { musicPage } from './pages/music.js';
import { loadPreferences } from './data/preferences.js';

const htmlHeaders = {
  "content-type": "text/html; charset=UTF-8",
  "cache-control": "no-store"
};
const socialsAliases = new Set(["/socials", "/kirbymybae", "/kirby/"]);
export default {
  async fetch(request, env) {
    const { hostname, pathname, origin } = new URL(request.url);
    if (hostname === "music.moth.mov") {
      if (pathname !== "/") return fetch(request);
      const preferences = await loadPreferences(env);
      return new Response(musicPage(preferences.tracks), { headers: htmlHeaders });
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
    if (pathname !== "/" && pathname !== "/kirby" && !socialsAliases.has(pathname)) {
      return Response.redirect(`${origin}/`, 302);
    }
    if (hostname !== "moth.mov" || pathname !== "/kirby") {
      return new Response(homePage, { headers: htmlHeaders });
    }
    const preferences = await loadPreferences(env);
    return new Response(socialsPage(preferences.tracks, preferences.season, preferences.effect), { headers: htmlHeaders });
  }
};
