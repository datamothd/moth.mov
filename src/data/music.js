export const musicOrigin = 'https://music.moth.mov';

export const tracks = [
  {
    artist: 'Tek Lintowe',
    title: 'Salt Looks Like Sugar',
    fileName: 'Tek lintowe - Salt Looks Like Sugar.flac',
  },
  {
    artist: 'Akira Yamaoka',
    title: "Heaven's Night",
    fileName: "Akira Yamaoka - Heaven's Night.flac",
  },
  {
    artist: 'Akira Yamaoka',
    title: 'Lament of Heavens Night',
    fileName: 'Akira Yamaoka - Lament of Heavens Night.flac',
  },
].map(track => ({
  ...track,
  label: `${track.artist} - ${track.title}`,
  url: `${musicOrigin}/${encodeURIComponent(track.fileName)}`,
}));
