import fallbackPreferences from '../../preferences.json';
import { prepareTracks, tracks } from './music.js';
import { palettes } from '../styles/socials-theme.js';

export async function loadPreferences(env) {
  const preferences = { season: fallbackPreferences.season, tracks };
  try {
    if (!env?.MUSIC_BUCKET) throw new Error('MUSIC_BUCKET R2 binding is missing');
    const object = await env.MUSIC_BUCKET.get('preferences.json');
    if (!object) throw new Error('preferences.json is missing from the music bucket');
    const values = await object.json();
    if (!values || typeof values !== 'object' || Array.isArray(values)) {
      throw new Error('Preferences must be an object');
    }
    if (Object.hasOwn(palettes, values.season)) preferences.season = values.season;
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
