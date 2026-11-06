import fallbackPreferences from '../../preferences.json';
import { prepareTracks, tracks } from './music.js';
import { palettes } from '../styles/socials-theme.js';

export async function loadPreferences(env) {
  const preferences = { season: fallbackPreferences.season, effect: fallbackPreferences.effect === 'snow' ? 'snow' : 'meteors', tracks };
  try {
    if (!env?.SITE_BUCKET) throw new Error('SITE_BUCKET R2 binding is missing');
    const object = await env.SITE_BUCKET.get('preferences.json');
    if (!object) throw new Error('preferences.json is missing from the site bucket');
    const values = await object.json();
    if (!values || typeof values !== 'object' || Array.isArray(values)) {
      throw new Error('Preferences must be an object');
    }
    if (Object.hasOwn(palettes, values.season)) preferences.season = values.season;
    if (['meteors', 'snow'].includes(values.effect)) preferences.effect = values.effect;
    const entries = values.tracks;
    if (Array.isArray(entries) && entries.length > 0 && entries.every(track =>
      track && ['artist', 'title', 'fileName'].every(key =>
        typeof track[key] === 'string' && track[key].trim()
      )
    )) {
      preferences.tracks = prepareTracks(entries);
    }
  } catch (error) {
    console.warn('Using fallback preferences:', error.message);
  }
  return preferences;
}
