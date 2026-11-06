import fallbackPreferences from '../../preferences.json';

export const musicOrigin = 'https://music.moth.mov';

export const prepareTracks = entries => entries.map(track => ({
  artist: track.artist,
  title: track.title,
  fileName: track.fileName,
  label: `${track.artist} - ${track.title}`,
  url: `${musicOrigin}/${encodeURIComponent(track.fileName)}`,
}));

export const tracks = prepareTracks(fallbackPreferences.tracks);
