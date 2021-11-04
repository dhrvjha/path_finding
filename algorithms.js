


class Solution {

    async traversePath(square) {
        while (square!=null) {
            await sleep(2);
            square.pathElement();
            square = square.beforeElement;
        }
    }

    async dfs() {
        let i = startIndex[0];
        let j = startIndex[1];
        let stack = [];
        stack.push([squares[i][j], null]);
        while (stack.length!=0) {
            let top = stack.pop()
            let topSquare = top[0]
            if (topSquare == null || topSquare.visited || topSquare.isWall())
                continue;
            await sleep(5)
            topSquare.beforeElement = top[1]
            topSquare.visited = true
            topSquare.select()
            if (topSquare.isEnd){
                this.traversePath(topSquare.beforeElement);
                return;
            }
            stack.push([topSquare.up, topSquare]);
            stack.push([topSquare.right, topSquare]);
            stack.push([topSquare.down, topSquare]);
            stack.push([topSquare.left, topSquare]);
        }
    }

    async bfs() {
        let i = startIndex[0];
        let j = startIndex[1];
        let queue = [];
        queue.push([squares[i][j], null]);
        console.log(squares[i][j],' ', i, j)
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
                    this.traversePath(topSquare.beforeElement)
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

    async aStar() {
        ;
    }
}

asphalt  = new Solution()