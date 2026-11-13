export const xmbParticlesScript = `
function createXmbParticles(gl, canvas, tint) {
  const settings = {
    count: 2000,
    opacity: 0.4,
    sizeBase: 2.6,
    sizeVariance: 5,
    flowSpeed: 0.18,
  };
  const ptProg = link(
    gl,
    \`#version 300 es
     precision highp float;
     in vec3 aSeed;
     uniform float uTime;
     uniform bool vertical;
     uniform float flowSpeed;
     uniform float ratio;
     uniform float ptSizeBase;
     uniform float ptSizeVar;
     out float vAlpha;
     void main() {
       gl_PointSize = aSeed.z * ptSizeVar + ptSizeBase;
       float time = uTime * flowSpeed;
       float x = fract(time * (aSeed.x - 0.5) / 15.0 + aSeed.y * 50.0) * 2.0 - 1.0;
       float y = sin(sign(aSeed.y) * time * (aSeed.y + 1.5) / 4.0 + aSeed.x * 100.0)
               / ((6.0 - aSeed.x * 4.0 * aSeed.y) / ratio);
       float opVar = mix(
         sin(time * (aSeed.x + 0.5) * 12.0 + aSeed.y * 10.0),
         sin(time * (aSeed.y + 1.5) * 6.0 + aSeed.x * 4.0),
         y * 0.5 + 0.5) * aSeed.x + aSeed.y;
       vAlpha = opVar * opVar * (1.0 - fract(aSeed.x + time * 0.00285));
       gl_Position = vertical ? vec4(y * 4.8, -x, 0.0, 1.0) : vec4(x, y, 0.0, 1.0);
     }\`,
    \`#version 300 es
     precision highp float;
     in float vAlpha;
     out vec4 oColor;
     uniform vec3 tint;
     uniform float particleOpacity;
     void main() {
       vec2 c = gl_PointCoord * 2.0 - 1.0;
       float d = dot(c, c);
       if (d > 1.0) discard;
       float sparkle = (1.0 - d) * (1.0 - d);
       float a = vAlpha * particleOpacity * sparkle;
       oColor = vec4(tint * a, a);
     }\`
  );


  const { count } = settings;
  const seeds = new Float32Array(count * 3);
  for (let index = 0; index < count; index++) {
    seeds[index * 3] = Math.random();
    seeds[index * 3 + 1] = Math.random();
    seeds[index * 3 + 2] = Math.pow(Math.random(), 8) + 0.1;
  }
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, seeds, gl.STATIC_DRAW);
  const seedLoc = aloc(gl, ptProg, 'aSeed');
  gl.enableVertexAttribArray(seedLoc);
  gl.vertexAttribPointer(seedLoc, 3, gl.FLOAT, false, 0, 0);
  gl.bindVertexArray(null);

  const time = uloc(gl, ptProg, 'uTime');
  const ratio = uloc(gl, ptProg, 'ratio');
  const orientation = uloc(gl, ptProg, 'vertical');
  gl.useProgram(ptProg);
  gl.uniform3fv(uloc(gl, ptProg, 'tint'), tint.split(',').map(channel => Number(channel) / 255));
  gl.uniform1f(uloc(gl, ptProg, 'flowSpeed'), settings.flowSpeed);
  gl.uniform1f(uloc(gl, ptProg, 'particleOpacity'), settings.opacity);
  gl.uniform1f(uloc(gl, ptProg, 'ptSizeBase'), settings.sizeBase);
  gl.uniform1f(uloc(gl, ptProg, 'ptSizeVar'), settings.sizeVariance);
  const offsetSec = Math.random() * 1000;

  return (timeSec, vertical) => {
    gl.blendFunc(gl.ONE, gl.ONE);
    gl.useProgram(ptProg);
    gl.uniform1f(time, timeSec + offsetSec);
    const aspect = vertical ? canvas.height / canvas.width : canvas.width / canvas.height;
    gl.uniform1f(ratio, Math.max(1, Math.min(aspect, 2)) * 0.375);
    gl.uniform1i(orientation, vertical);
    gl.bindVertexArray(vao);
    gl.drawArrays(gl.POINTS, 0, count);
    gl.bindVertexArray(null);
  };
}
`;

