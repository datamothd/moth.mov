import fallbackTracks from '../../tracks.json';

export const musicOrigin = 'https://music.moth.mov';

const prepareTracks = entries => entries.map(track => ({
  artist: track.artist,
  title: track.title,
  fileName: track.fileName,
  label: `${track.artist} - ${track.title}`,
  url: `${musicOrigin}/${encodeURIComponent(track.fileName)}`,
}));

export const tracks = prepareTracks(fallbackTracks);

export async function loadTracks(env) {
  try {
    if (!env?.MUSIC_BUCKET) throw new Error('MUSIC_BUCKET R2 binding is missing');
    const object = await env.MUSIC_BUCKET.get('tracks.json');
    if (!object) throw new Error('tracks.json is missing from the music bucket');
    const entries = await object.json();
    if (!Array.isArray(entries) || entries.length === 0 || entries.some(track =>
      !track || ['artist', 'title', 'fileName'].some(key =>
        typeof track[key] !== 'string' || !track[key].trim()
      )
    )) {
      throw new Error('Music list must be a nonempty array with artist, title, and fileName strings');
    }
    return prepareTracks(entries);
  } catch (error) {
    console.warn('Using fallback music list:', error.message);
    return tracks;
  }
}
