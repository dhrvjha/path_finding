
const sleep = t => new Promise(s => setTimeout(s, t));

class Solution {


    async dfs() {

    }

    async bfs() {
        console.log('--------------------------------')
        console.log('starting Breath First Search --/|\\/\\--')
        let i = startIndex[0];
        let j = startIndex[1];
        console.log('lets go')
        let queue = [];
        queue.push([squares[i][j], null]);
        console.log(squares[i][j],' ', i, j)
        // sq
        console.log(' 1 2 3 >>>>>')
        while (queue.length!=0)
        {
            let size = queue.length;
            while (size--)
            {
                await sleep(5)
                let top = queue[0];
                queue.shift()
                let topSquare = top[0];
                if (topSquare.visited || topSquare.isWall())
                    continue;
                topSquare.beforeElement = top[1];
                if (topSquare.isEnd) {
                    console.log('found end')
                    let ptr = topSquare.beforeElement;
                    while (ptr != null) {
                        await sleep(2);
                        ptr.pathElement();
                        ptr = ptr.beforeElement;
                    }
                    return;
                }
                topSquare.select();
                if (topSquare.up != null) {
                    queue.push([topSquare.up, topSquare])
                }
                if (topSquare.down != null) {
                    queue.push([topSquare.down, topSquare])
                }
                if (topSquare.left != null) {
                    queue.push([topSquare.left, topSquare])
                }
                if (topSquare.right != null) {
                    queue.push([topSquare.right, topSquare])
                }
            }
        }
    }
}