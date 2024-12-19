let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const HEIGHT = canvas.height;
const WIDTH = canvas.width;
const BLOCK_SIZE = 5;
const ROWS = Math.floor(HEIGHT / BLOCK_SIZE);
const COLS = Math.floor(WIDTH / BLOCK_SIZE);

let gpu = initGPU();
let cur_alpha = new Array(ROWS).fill().map(_ => new Array(COLS).fill(0));
let nxt_alpha = new Array(ROWS).fill().map(_ => new Array(COLS).fill(0));

let rgb = [0 / 255, 170 / 255, 255 / 255];
let conv_matrix = [
    [0.565, -0.716, 0.565],
    [-0.716, 0.627, -0.716],
    [0.565, -0.716, 0.565]
]

function activation(x){
    return Math.min(1, Math.abs(1.2*x));
}

function rand_alpha(){
    for(let r = 0; r < ROWS; ++r){
        for(let c = 0; c < COLS; ++c){
            cur_alpha[r][c] = (Math.random()<0.5?-1:1)*Math.random();
        }
    }
}

function convolution(r, c){
    let sum = 0;
    for(let i = 0; i < 3; ++i){
        for(let j = 0; j < 3; ++j){
            sum += cur_alpha[(r + i - 1 + ROWS) % ROWS][(c + j - 1 + COLS) % COLS] * conv_matrix[i][j];
        }
    }
    return sum;
}

function update(){
    /*let k = gpu.createKernel(function (cur_alpha, conv_matrix) {
        let ROWS = this.output.y;
        let COLS = this.output.x;
        let r = this.thread.y;
        let c = this.thread.x;
        let sum = 0;
    
        sum += cur_alpha[(r - 1 + ROWS) % ROWS][(c - 1 + COLS) % COLS] * conv_matrix[0][0];
        sum += cur_alpha[(r - 1 + ROWS) % ROWS][c] * conv_matrix[0][1];
        sum += cur_alpha[(r - 1 + ROWS) % ROWS][(c + 1 + COLS) % COLS] * conv_matrix[0][2];
        sum += cur_alpha[r][(c - 1 + COLS) % COLS] * conv_matrix[1][0];
        sum += cur_alpha[r][c] * conv_matrix[1][1];
        sum += cur_alpha[r][(c + 1 + COLS) % COLS] * conv_matrix[1][2];
        sum += cur_alpha[(r + 1 + ROWS) % ROWS][(c - 1 + COLS) % COLS] * conv_matrix[2][0];
        sum += cur_alpha[(r + 1 + ROWS) % ROWS][c] * conv_matrix[2][1];
        sum += cur_alpha[(r + 1 + ROWS) % ROWS][(c + 1 + COLS) % COLS] * conv_matrix[2][2];
    
    
        return Math.min(1, Math.abs(1.2*sum));
    }).setOutput([COLS, ROWS]);

    cur_alpha = k(cur_alpha, conv_matrix);
    k.destroy();*/
    
    for(let r = 0; r < ROWS; ++r){
        for(let c = 0; c < COLS; ++c){
            nxt_alpha[r][c] = activation(convolution(r, c));
        }
    }

    [cur_alpha, nxt_alpha] = [nxt_alpha, cur_alpha];
}

function draw(){
    let render = gpu.createKernel(function (cur_alpha, rgb) {
        this.color(
            rgb[0] * cur_alpha[this.thread.y][this.thread.x], 
            rgb[1] * cur_alpha[this.thread.y][this.thread.x], 
            rgb[2] * cur_alpha[this.thread.y][this.thread.x]
        );
    }).setOutput([COLS, ROWS]).setGraphical(true);
    
    render(cur_alpha, rgb);
    document.getElementsByTagName("canvas")[0].remove();
    document.body.appendChild(render.canvas);

    render.destroy();
}

function loop(){
    update();
    draw();
    requestAnimationFrame(loop);
}

function init(){
    rand_alpha();
    loop();
}

window.onload = init;