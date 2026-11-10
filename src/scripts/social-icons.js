export const socialIconsScript = `
(() => {
  const rgba = (hex, alpha) => {
    const channels = hex.trim().replace('#', '').match(/.{2}/g);
    return 'rgba(' + channels.map(channel => parseInt(channel, 16)).join(',') + ',' + alpha + ')';
  };
  const ease = progress => {
    if (progress <= 0 || progress >= 1) return progress;
    let low = 0;
    let high = 1;
    let t = progress;
    for (let index = 0; index < 16; index++) {
      t = (low + high) / 2;
      const x = 3 * (1 - t) ** 2 * t * 0.22 + 3 * (1 - t) * t ** 2 * 0.2 + t ** 3;
      if (x < progress) low = t;
      else high = t;
    }
    return 3 * (1 - t) ** 2 * t * 0.75 + 3 * (1 - t) * t ** 2 + t ** 3;
  };

  for (const icon of document.querySelectorAll('.social-icon')) {
    const link = icon.closest('.social');
    const source = icon.querySelector('.social-icon-artwork img');
    const surface = icon.querySelector('canvas');
    const context = surface.getContext('2d');
    if (!context || !('filter' in context)) continue;

    let textures = null;
    let progress = 0;
    let target = 0;
    let frame = 0;
    let revision = 0;
    let hovered = false;

    function draw() {
      if (!textures) return;
      const { normal, glow, size, baseScale, ratio } = textures;
      const scale = baseScale + (1.45 - baseScale) * progress;
      const width = size * scale * ratio;
      const offset = (surface.width - width) / 2;
      context.clearRect(0, 0, surface.width, surface.height);
      context.globalAlpha = 0.55 * progress;
      context.drawImage(glow, offset, offset, width, width);
      context.globalAlpha = 1;
      context.drawImage(normal, offset, offset, width, width);
    }

    function animate() {
      const next = hovered || link.matches(':focus-visible') ? 1 : 0;
      if (next === target) return;
      target = next;
      cancelAnimationFrame(frame);
      const from = progress;
      const started = performance.now();
      const duration = 450 * Math.abs(target - from);
      if (!duration) return;
      const step = now => {
        const fraction = Math.min(1, (now - started) / duration);
        progress = from + (target - from) * ease(fraction);
        draw();
        frame = fraction < 1 ? requestAnimationFrame(step) : 0;
      };
      frame = requestAnimationFrame(step);
    }

    async function prepare() {
      const currentRevision = ++revision;
      await source.decode();
      if (currentRevision !== revision) return;
      const styles = getComputedStyle(icon);
      const size = parseFloat(styles.width);
      if (!size) return;
      const cardScale = parseFloat(getComputedStyle(icon.closest('.profile')).scale) || 1;
      const density = Math.max(2, Math.min(8, devicePixelRatio * cardScale * 2));
      const pixels = Math.ceil(Math.max(source.naturalWidth, size * density));
      const sourceRatio = pixels / size;
      const padding = Math.ceil(40 * sourceRatio);
      const glyph = document.createElement('canvas');
      glyph.width = glyph.height = pixels;
      const glyphContext = glyph.getContext('2d');
      if (!glyphContext) return;
      glyphContext.imageSmoothingQuality = 'high';
      glyphContext.drawImage(source, 0, 0, pixels, pixels);
      glyphContext.globalCompositeOperation = 'source-in';
      glyphContext.fillStyle = styles.getPropertyValue('--highlight').trim();
      glyphContext.fillRect(0, 0, pixels, pixels);

      const makeTexture = filter => {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = pixels + padding * 2;
        const painter = canvas.getContext('2d');
        painter.filter = filter;
        painter.drawImage(glyph, padding, padding);
        return canvas;
      };
      const normal = makeTexture(
        'drop-shadow(0 0 ' + 4 * sourceRatio + 'px ' + rgba(styles.getPropertyValue('--muted'), 0.4) + ')' +
        ' drop-shadow(0 0 ' + 10 * sourceRatio + 'px ' + rgba(styles.getPropertyValue('--accent'), 0.22) + ')'
      );
      const glow = makeTexture(
        'blur(' + 6 * sourceRatio + 'px)' +
        ' drop-shadow(0 0 ' + 10 * sourceRatio + 'px ' + rgba(styles.getPropertyValue('--accent'), 0.4) + ')'
      );
      const textureSize = normal.width / sourceRatio;
      const extent = Math.ceil(textureSize * 1.45);
      surface.width = surface.height = Math.ceil(extent * density);
      surface.style.width = surface.style.height = extent + 'px';
      surface.style.left = surface.style.top = (size - extent) / 2 + 'px';
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      textures = {
        normal, glow, size: textureSize,
        baseScale: Number(styles.getPropertyValue('--social-icon-scale')),
        ratio: surface.width / extent,
      };
      draw();
      icon.classList.add('canvas-ready');
      animate();
    }

    link.addEventListener('pointerenter', event => {
      hovered = event.pointerType === 'mouse';
      animate();
    });
    link.addEventListener('pointerleave', () => {
      hovered = false;
      animate();
    });
    for (const event of ['focus', 'blur']) {
      link.addEventListener(event, animate);
    }
    new ResizeObserver(() => {
      prepare().catch(() => icon.classList.remove('canvas-ready'));
    }).observe(icon);
  }
})();`;
