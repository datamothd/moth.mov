import fallbackPreferences from '../../preferences.json';

export const musicOrigin = 'https://music.moth.mov';

export const prepareTracks = entries => entries.map(({ artist, title, fileName }) => ({
  artist,
  title,
  fileName,
  label: `${artist} - ${title}`,
  url: `${musicOrigin}/${encodeURIComponent(fileName)}`,
  artworkUrl: `${musicOrigin}/artwork/${encodeURIComponent(fileName.replace(/\.[^.]+$/, '.webp'))}`,
}));

export const tracks = prepareTracks(fallbackPreferences.tracks);
