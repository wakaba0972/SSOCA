// 畫面延遲時間(ms)
const DELAY = 0;

// 格子大小(越小解析度越高)
const BLOCK_SIZE = 1;

// 格子顏色
const RGB = [255, 237, 41];

// Kernal
const KERNAL = [
    [0.565, -0.716, 0.565],
    [-0.716, 0.627, -0.716],
    [0.565, -0.716, 0.565]
]

// Activation Function
function activation(x){
    return Math.abs(1.2*x);
}