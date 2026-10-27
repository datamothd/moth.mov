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

export async function loadTracks() {
  try {
    const response = await fetch(`${musicOrigin}/tracks.json`, {
      cache: 'no-store',
      cf: { cacheTtl: 0 },
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) throw new Error(`Music list returned ${response.status}`);

    const entries = await response.json();
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
