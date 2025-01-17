const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const HEIGHT = canvas.height;
const WIDTH = canvas.width;
const ROWS = Math.floor(HEIGHT / BLOCK_SIZE);
const COLS = Math.floor(WIDTH / BLOCK_SIZE);
const REAL_RGB = RGB.map(x => x / 255);
const gl = canvas.getContext('webgl2', { premultipliedAlpha: false });

const gpu = initGPU({canvas, context: gl});
let cur_alpha = new Array(ROWS).fill().map(_ => new Float64Array(COLS).fill(0));
let nxt_alpha = new Array(ROWS).fill().map(_ => new Float64Array(COLS).fill(0));

function rand_alpha(){
    for(let r = 0; r < ROWS; ++r){
        for(let c = 0; c < COLS; ++c){
            cur_alpha[r][c] = (Math.random()<0.5?-1:1)*Math.random();
        }
    }
}

function fix_value(x){
    return Math.max(0, Math.min(1, x));
}

function convolution(r, c){
    /*const rm = (!r? ROWS-1: r-1);
    const ra = (r==ROWS-1? 0: r+1);
    const cm = (!c? COLS-1: c-1);
    const ca = (c==COLS-1? 0: c+1);
    let sum = 0;

    sum += cur_alpha[rm][cm] * KERNAL[0][0];
    sum += cur_alpha[rm][c] * KERNAL[0][1];
    sum += cur_alpha[rm][ca] * KERNAL[0][2];
    sum += cur_alpha[r][cm] * KERNAL[1][0];
    sum += cur_alpha[r][c] * KERNAL[1][1];
    sum += cur_alpha[r][ca] * KERNAL[1][2];
    sum += cur_alpha[ra][cm] * KERNAL[2][0];
    sum += cur_alpha[ra][c] * KERNAL[2][1];
    sum += cur_alpha[ra][ca] * KERNAL[2][2];*/

    let rm2 = (r-2<0? ROWS+r-2: r-2);
	let rm1 = (r-1<0? ROWS+r-1: r-1);
	let ra1 = (r+1>=ROWS? r+1-ROWS: r+1);
	let ra2 = (r+2>=ROWS? r+2-ROWS: r+2);
	let cm2 = (c-2<0? COLS+c-2: c-2);
	let cm1 = (c-1<0? COLS+c-1: c-1);
	let ca1 = (c+1>=COLS? c+1-COLS: c+1);
	let ca2 = (c+2>=COLS? c+2-COLS: c+2);

	let sum = 0;

	sum += cur_alpha[rm2][cm2] * KERNAL[0][0];
	sum += cur_alpha[rm2][cm1] * KERNAL[0][1];
	sum += cur_alpha[rm2][c] * KERNAL[0][2];
	sum += cur_alpha[rm2][ca1] * KERNAL[0][3];
	sum += cur_alpha[rm2][ca2] * KERNAL[0][4];
	sum += cur_alpha[rm1][cm2] * KERNAL[1][0];
	sum += cur_alpha[rm1][cm1] * KERNAL[1][1];
	sum += cur_alpha[rm1][c] * KERNAL[1][2];
	sum += cur_alpha[rm1][ca1] * KERNAL[1][3];
	sum += cur_alpha[rm1][ca2] * KERNAL[1][4];
	sum += cur_alpha[r][cm2] * KERNAL[2][0];
	sum += cur_alpha[r][cm1] * KERNAL[2][1];
	sum += cur_alpha[r][c] * KERNAL[2][2];
	sum += cur_alpha[r][ca1] * KERNAL[2][3];
	sum += cur_alpha[r][ca2] * KERNAL[2][4];
	sum += cur_alpha[ra1][cm2] * KERNAL[3][0];
	sum += cur_alpha[ra1][cm1] * KERNAL[3][1];
	sum += cur_alpha[ra1][c] * KERNAL[3][2];
	sum += cur_alpha[ra1][ca1] * KERNAL[3][3];
	sum += cur_alpha[ra1][ca2] * KERNAL[3][4];
	sum += cur_alpha[ra2][cm2] * KERNAL[4][0];
	sum += cur_alpha[ra2][cm1] * KERNAL[4][1];
	sum += cur_alpha[ra2][c] * KERNAL[4][2];
	sum += cur_alpha[ra2][ca1] * KERNAL[4][3];
	sum += cur_alpha[ra2][ca2] * KERNAL[4][4];

	return sum;
}

function update(){
    for(let r = 0; r < ROWS; ++r){
        for(let c = 0; c < COLS; ++c){
            nxt_alpha[r][c] = fix_value(activation(convolution(r, c)));
        }
    }

    for(let r = 0; r < ROWS; ++r){
        for(let c = 0; c < COLS; ++c){
            cur_alpha[r][c] = nxt_alpha[r][c];
        }
    }
}

function draw(){
    const render = gpu.createKernel(function (cur_alpha, REAL_RGB) {
        this.color(
            REAL_RGB[0], 
            REAL_RGB[1], 
            REAL_RGB[2],
            cur_alpha[this.thread.y][this.thread.x]
        );
    }).setOutput([COLS, ROWS]).setGraphical(true);
    
    render(cur_alpha, REAL_RGB);
    render.destroy();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loop(){
    update();
    draw();
    await sleep(DELAY);
    requestAnimationFrame(loop);
}

function init(){
    rand_alpha();
    loop();
}

window.onload = init;