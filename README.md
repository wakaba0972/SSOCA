# Wave.js
* 渲染的部分利用[gpu.js](https://github.com/gpujs/gpu.js)加速
* 利用Neural Cellular Automata製成
* 參數:
    * kernel

        |  |  |  |
        | -------- | -------- | -------- |
        | 0.565     | -0.716     | 0.565     |
        | -0.716     | 0.627     | -0.716     |
        | 0.565     | -0.716     | 0.565     |
        
    * activation function
        ```javascript
        Math.abs(1.2 * x)
        ```
        * 必須限制輸出在[0, 1]之間，所以最後取
        ```javascript
        Math.min(1, Math.abs(1.2*x));
        ```


    