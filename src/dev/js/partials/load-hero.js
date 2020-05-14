const img = document.getElementById('image');
const mask = document.getElementById('mask');
const sprite = document.getElementById('sprite');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvas_buffer = document.getElementById('buffer');
const ctx_buffer = canvas_buffer.getContext('2d');

const height = canvas.offsetHeight;
const width = canvas.offsetWidth;

const start_scale = 1.5;

const center = { x: width / 2, y: height / 2 };

let pos = {
  x1: 0,
  y1: 0,
  x2: width,
  y2: height
}

let index = 0;
let step = 0;
let counter = start_scale;
let counter_m = 1.03;
let isAnimation = true;

const calcPosition = () => {
  pos = {
    x1: center.x - (width / 2) * counter,
    y1: center.y - (height / 2) * counter,
    x2: width * counter,
    y2: height * counter
  }
};

const drawInBuffer = () => {
  ctx_buffer.clearRect(0, 0, width, height);

  ctx_buffer.drawImage(mask, pos.x1 + 100, pos.y1, pos.x2 - 300, pos.y2);

  ctx_buffer.globalCompositeOperation = 'source-in';

  calcPosition();
  ctx_buffer.drawImage(img, pos.x1 + 100, pos.y1, pos.x2 - 300, pos.y2);
  ctx_buffer.globalCompositeOperation = 'source-over';
};

const scale = () => {
  drawInBuffer();

  ctx.clearRect(0, 0, width, height);

  ctx.drawImage(sprite, 100, index * height, width - 300, sprite.naturalHeight);
  ctx.globalCompositeOperation = 'source-in';

  ctx.drawImage(canvas_buffer, 100, 0, width - 300, height);
  ctx.globalCompositeOperation = 'source-over';

  step++;

  if (step % 3 === 0) index -= 1;

  if (counter > 1) counter -= 0.007;

  if (step >= 120) isAnimation = false;
}

const animate = (time) => {
  scale();
};

const render = (time) => {
  animate(time);

  if (isAnimation) {
    requestAnimationFrame(render);
  }
}

export default () => { render(); };
