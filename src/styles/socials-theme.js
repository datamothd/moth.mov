const season = 'autumn';

const palettes = {
  autumn: ['#f39340', '#b16022', '#792b14', '#ec6a27'],
  winter: ['#b8dcff', '#5b83b4', '#1d3155', '#80b6ef'],
  spring: ['#ebbad4', '#9778ad', '#473354', '#b8d99b'],
  summer: ['#ffe08a', '#b17b35', '#493322', '#fba75b'],
};

export const [highlight, muted, shadow, accent] = palettes[season];
