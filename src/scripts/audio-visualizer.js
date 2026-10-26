export const audioVisualizerScript = `
function setupAudioVisualizer(player, color = 'rgba(235, 240, 255, 0.72)') {
  const canvas = document.querySelector('.audio-visualizer');
  const drawing = canvas?.getContext('2d');
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!drawing || !AudioContextClass) return () => {};

  const barCount = 20;
  const levels = new Float32Array(barCount);
  let audioContext;
  let analyser;
  let frequencies;
  let frame = 0;
  let previousTime = null;
  let width = 0;
  let height = 0;

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    drawing.setTransform(ratio, 0, 0, ratio, 0, 0);
    wake();
  }

  function wake() {
    if (!frame && !document.hidden) {
      previousTime = null;
      frame = requestAnimationFrame(draw);
    }
  }

  function draw(time) {
    frame = 0;
    const elapsed = previousTime === null ? 16 : Math.min(time - previousTime, 64);
    previousTime = time;
    const playing = analyser && audioContext.state === 'running'
      && !player.paused && !player.ended && !player.seeking && player.readyState >= 3;
    if (playing) analyser.getFloatFrequencyData(frequencies);
    drawing.clearRect(0, 0, width, height);
    drawing.fillStyle = color;
    const spacing = width / barCount;
    const barWidth = Math.max(1, spacing * 0.65);
    const binHz = audioContext ? audioContext.sampleRate / analyser.fftSize : 1;
    const maxFrequency = audioContext ? Math.min(16000, audioContext.sampleRate / 2) : 16000;
    const smoothing = 1 - Math.exp(-elapsed / (playing ? 60 : 180));
    let moving = false;
    for (let index = 0; index < barCount; index++) {
      let target = 0;
      if (playing) {
        const low = Math.max(1, Math.floor(40 * Math.pow(maxFrequency / 40, index / barCount) / binHz));
        const high = Math.min(frequencies.length, Math.max(low + 1,
          Math.ceil(40 * Math.pow(maxFrequency / 40, (index + 1) / barCount) / binHz)));
        let sum = 0;
        // Decibel readings retain bass dynamics that byte scaling would clip.
        for (let bin = low; bin < high; bin++) sum += Math.max(-90, frequencies[bin]);
        const level = Math.max(0, (sum / Math.max(1, high - low) + 90) / 90);
        const bassBalance = 0.6 + 0.4 * index / (barCount - 1);
        target = Math.min(1, level * 1.5 * bassBalance);
      }
      levels[index] += (target - levels[index]) * smoothing;
      if (!playing && levels[index] < 0.002) levels[index] = 0;
      moving ||= levels[index] > 0;
      const barHeight = 1 + levels[index] * (height - 4);
      drawing.fillRect(index * spacing + (spacing - barWidth) / 2, height - barHeight, barWidth, barHeight);
    }
    if ((playing || moving) && !document.hidden) frame = requestAnimationFrame(draw);
    else previousTime = null;
  }

  function start() {
    try {
      if (!audioContext) {
        audioContext = new AudioContextClass();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        analyser.smoothingTimeConstant = 0.15;
        frequencies = new Float32Array(analyser.frequencyBinCount);
        const source = audioContext.createMediaElementSource(player);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        audioContext.addEventListener('statechange', wake);
        canvas.hidden = false;
        resize();
      }
      if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
      wake();
    } catch {
      canvas.hidden = true;
    }
  }

  player.addEventListener('play', start);
  for (const event of ['playing', 'pause', 'ended', 'waiting', 'seeking', 'seeked', 'emptied']) {
    player.addEventListener(event, wake);
  }
  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = null;
    } else wake();
  });
  return start;
}
`;
