# Wave.js
* 你可以使用[Lively Wallpaper](https://apps.microsoft.com/detail/9ntm2qc6qws7?hl=en-US&gl=US)或其他類似軟體，將其設定為電腦桌布。
* 畫面渲染使用[gpu.js](https://github.com/gpujs/gpu.js)加速。
* 利用Neural Cellular Automata製成。
* 若`BLOCK_SIZE = 1`，fps可能會很低，此時你可以把它調高看看。
* 若動畫速度太快，你可以設置DELAY時間。
* 參數:
    * Kernel

        |  |  |  |
        | -------- | -------- | -------- |
        | 0.565     | -0.716     | 0.565     |
        | -0.716     | 0.627     | -0.716     |
        | 0.565     | -0.716     | 0.565     |

        ```javascript
        const KERNAL = [
            [0.565, -0.716, 0.565],
            [-0.716, 0.627, -0.716],
            [0.565, -0.716, 0.565]
        ]
        ```
        
    * Activation Function
        ```javascript
        Math.abs(1.2 * x)
        ```
        * 必須限制輸出在[0, 1]之間，所以最後取
        ```javascript
        Math.min(1, Math.abs(1.2*x));
        ```


    