/**
 * Aurora background — raw WebGL2, no external dependencies.
 * Works on file:// and https:// alike.
 */

const VERT = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
out vec4 fragColor;

vec3 permute(vec3 x){return mod(((x*34.0)+1.0)*x,289.0);}
float snoise(vec2 v){
  const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i=floor(v+dot(v,C.yy)),x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
  vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
  i=mod(i,289.0);
  vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
  vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
  m=m*m; m=m*m;
  vec3 x=2.0*fract(p*C.www)-1.0,h=abs(x)-0.5,ox=floor(x+0.5),a0=x-ox;
  m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
  vec3 g; g.x=a0.x*x0.x+h.x*x0.y; g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.0*dot(m,g);
}

struct ColorStop{vec3 color;float position;};
#define COLOR_RAMP(colors,factor,fc){int idx=0;for(int i=0;i<2;i++){ColorStop cc=colors[i];bool b=cc.position<=factor;idx=int(mix(float(idx),float(i),float(b)));}ColorStop cc=colors[idx];ColorStop nc=colors[idx+1];float r=nc.position-cc.position;fc=mix(cc.color,nc.color,(factor-cc.position)/r);}

void main(){
  vec2 uv=gl_FragCoord.xy/uResolution;
  ColorStop colors[3];
  colors[0]=ColorStop(uColorStops[0],0.0);
  colors[1]=ColorStop(uColorStops[1],0.5);
  colors[2]=ColorStop(uColorStops[2],1.0);
  vec3 rc; COLOR_RAMP(colors,uv.x,rc);
  float h=snoise(vec2(uv.x*2.0+uTime*0.1,uTime*0.25))*0.5*uAmplitude;
  h=exp(h); h=(uv.y*2.0-h+0.2);
  float intensity=0.6*h;
  float auroraAlpha=smoothstep(0.20-uBlend*0.5,0.20+uBlend*0.5,intensity);
  fragColor=vec4(intensity*rc*auroraAlpha,auroraAlpha);
}`;

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

function createShader(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

function initAurora(ctn, opts = {}) {
  const {
    colorStops = ['#1B2FD4', '#3B5BEF', '#E07730'],
    amplitude  = 1.2,
    blend      = 0.6,
    speed      = 0.5,
  } = opts;

  const canvas = document.createElement('canvas');
  ctn.appendChild(canvas);

  const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: true });
  if (!gl) return;

  gl.clearColor(0, 0, 0, 0);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  const program = gl.createProgram();
  gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(program);
  gl.useProgram(program);

  // Full-screen triangle
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const posLoc = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  const uTime       = gl.getUniformLocation(program, 'uTime');
  const uAmplitude  = gl.getUniformLocation(program, 'uAmplitude');
  const uColorStops = gl.getUniformLocation(program, 'uColorStops[0]');
  const uResolution = gl.getUniformLocation(program, 'uResolution');
  const uBlend      = gl.getUniformLocation(program, 'uBlend');

  gl.uniform1f(uAmplitude, amplitude);
  gl.uniform1f(uBlend, blend);
  gl.uniform3fv(uColorStops, colorStops.flatMap(hexToRgb));

  function resize() {
    canvas.width  = ctn.offsetWidth;
    canvas.height = ctn.offsetHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uResolution, canvas.width, canvas.height);
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  // ponytail: pause rAF when hero is off-screen — saves full GPU cost while scrolled away
  let t = 0, running = true;
  new IntersectionObserver(([e]) => { running = e.isIntersecting; }, { threshold: 0 }).observe(canvas);
  (function tick() {
    requestAnimationFrame(tick);
    if (!running) return;
    t += 0.01;
    gl.uniform1f(uTime, t * speed);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  })();
}

const ctn = document.getElementById('aurora-hero');
if (ctn) initAurora(ctn);
