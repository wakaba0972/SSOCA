function initGPU(st) {
	try {
		return new window.GPU.GPU(st);
	} catch (e) {
		return new GPU(st);
	}
}


// 3*3 kernal
/*const k = gpu.createKernel(function (cur_alpha, kernal) {
	let ROWS = this.output.y;
	let COLS = this.output.x;
	let r = this.thread.y;
	let c = this.thread.x;

	let rm = (r==0? ROWS-1: r-1);
	let ra = (r+1==ROWS? 0: r+1);
	let cm = (c==0? COLS-1: c-1);
	let ca = (c+1==COLS? 0: c+1);

	let sum = 0;

	sum += cur_alpha[rm][cm] * kernal[0][0];
	sum += cur_alpha[rm][c] * kernal[0][1];
	sum += cur_alpha[rm][ca] * kernal[0][2];
	sum += cur_alpha[r][cm] * kernal[1][0];
	sum += cur_alpha[r][c] * kernal[1][1];
	sum += cur_alpha[r][ca] * kernal[1][2];
	sum += cur_alpha[ra][cm] * kernal[2][0];
	sum += cur_alpha[ra][c] * kernal[2][1];
	sum += cur_alpha[ra][ca] * kernal[2][2];


	return sum;
}).setOutput([COLS, ROWS]);

cur_alpha = k(cur_alpha, kernal);
k.destroy();*/

// 5*5 kernal
/*const k = gpu.createKernel(function (cur_alpha, kernal) {
	function fix_value(x){
		return Math.max(0, Math.min(1, x));
	}

	// Activation Function
	function activation(x){
		return Math.abs(0.4*x);  
	}

	let ROWS = this.output.y;
	let COLS = this.output.x;
	let r = this.thread.y;
	let c = this.thread.x;

	let rm2 = (r-2<0? ROWS+r-2: r-2);
	let rm1 = (r-1<0? ROWS+r-1: r-1);
	let ra1 = (r+1>=ROWS? r+1-ROWS: r+1);
	let ra2 = (r+2>=ROWS? r+2-ROWS: r+2);
	let cm2 = (c-2<0? COLS+c-2: c-2);
	let cm1 = (c-1<0? COLS+c-1: c-1);
	let ca1 = (c+1>=COLS? c+1-COLS: c+1);
	let ca2 = (c+2>=COLS? c+2-COLS: c+2);

	let sum = 0;

	sum += cur_alpha[rm2][cm2] * kernal[0][0];
	sum += cur_alpha[rm2][cm1] * kernal[0][1];
	sum += cur_alpha[rm2][c] * kernal[0][2];
	sum += cur_alpha[rm2][ca1] * kernal[0][3];
	sum += cur_alpha[rm2][ca2] * kernal[0][4];
	sum += cur_alpha[rm1][cm2] * kernal[1][0];
	sum += cur_alpha[rm1][cm1] * kernal[1][1];
	sum += cur_alpha[rm1][c] * kernal[1][2];
	sum += cur_alpha[rm1][ca1] * kernal[1][3];
	sum += cur_alpha[rm1][ca2] * kernal[1][4];
	sum += cur_alpha[r][cm2] * kernal[2][0];
	sum += cur_alpha[r][cm1] * kernal[2][1];
	sum += cur_alpha[r][c] * kernal[2][2];
	sum += cur_alpha[r][ca1] * kernal[2][3];
	sum += cur_alpha[r][ca2] * kernal[2][4];
	sum += cur_alpha[ra1][cm2] * kernal[3][0];
	sum += cur_alpha[ra1][cm1] * kernal[3][1];
	sum += cur_alpha[ra1][c] * kernal[3][2];
	sum += cur_alpha[ra1][ca1] * kernal[3][3];
	sum += cur_alpha[ra1][ca2] * kernal[3][4];
	sum += cur_alpha[ra2][cm2] * kernal[4][0];
	sum += cur_alpha[ra2][cm1] * kernal[4][1];
	sum += cur_alpha[ra2][c] * kernal[4][2];
	sum += cur_alpha[ra2][ca1] * kernal[4][3];
	sum += cur_alpha[ra2][ca2] * kernal[4][4];

	return fix_value(activation(sum));
}).setOutput([COLS, ROWS]);

cur_alpha = k(cur_alpha, KERNAL);
k.destroy();*/