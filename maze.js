
class Maze {

    async random() {
        let limit = (sizeX)/10
        for (const items of squares) {
            for (let i=0;i<limit;i++) {
                let x = parseInt(Math.random() * sizeX);
                await sleep(1);
                items[x].toggleColor();
            }
        }
    }

    async wallSides() {
        for (let i = 0; i<squares[0].length; i++) {
            squares[0][i].toggleColor()
            await sleep(1);
        }
        for (let i = 1; i<squares.length; i++) {
            squares[i][squares[0].length-1].toggleColor()
            await sleep(1);
        }
        for (let i=squares[0].length-2; i >= 0 ; i--) {
            squares[squares.length-1][i].toggleColor()
            await sleep(1);
        }
        for (let i=squares.length-2; i>0;i--) {
            squares[i][0].toggleColor()
            await sleep(1);
        }
    }

    horizonatalRandom() {
        ;
    }


}

maze = new Maze();