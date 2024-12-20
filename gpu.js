function initGPU(st) {
	try {
		return new window.GPU.GPU(st);
	} catch (e) {
		return new GPU(st);
	}
}



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


	return Math.min(1, Math.abs(1.2*sum));
}).setOutput([COLS, ROWS]);

cur_alpha = k(cur_alpha, kernal);
k.destroy();*/