# Some sort of cellular autotmata(SSOCA)
* 你可以使用[Lively Wallpaper](https://apps.microsoft.com/detail/9ntm2qc6qws7?hl=en-US&gl=US)或其他類似軟體，將其設定為電腦桌布。
<!--* 畫面渲染使用[gpu.js](https://github.com/gpujs/gpu.js)加速。 -->
* 利用[Some sort of cellular automata](https://www.youtube.com/watch?v=3H79ZcBuw4M)製成(似乎不是影片中提到的NCA)。
* `BLOCK_SIZE`預設為`1`，如果覺得fps太低，可以把它調高看看。
* 若動畫速度太快，你可以設置`DELAY`時間。
* 參數:
    * Kernel

        |  |  |  |  |  |
        | -------- | -------- | -------- | -------- | -------- |
        | -0.7     | 0.1      | 0.7      | 0.1      | -0.7     |
        | 0.1      | -0.7     | 0.5      | -0.7     |  0.1     |
        | 0.7      | 0.5      | 0.6      | 0.5      | 0.7      |
        | 0.1      | -0.7     | 0.5      | -0.7     |  0.1     |
        | -0.7     | 0.1      | 0.7      | 0.1      | -0.7     |

        ```javascript
        const KERNAL = [
            [-0.7, 0.1, 0.7, 0.1, -0.7],
            [0.1, -0.7, 0.5, -0.7, 0.1],
            [0.7, 0.5, 0.6, 0.5, 0.7],
            [0.1, -0.7,0.5, -0.7, 0.1],
            [-0.7, 0.1, 0.7, 0.1, -0.7],
        ]
        ```
        
    * Activation Function
        ```javascript
        function activation(x){
            return Math.abs(0.4*x);  
        }
        ```
        * 必須限制輸出在`[0, 1]`之間，所以最後取以下結果，用戶只需更改`activation()`就好。
        ```javascript
        Math.max(0, Math.min(1, activation(x)));
        ```


    