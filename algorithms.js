
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
            await sleep(5);
            topSquare.beforeElement = top[1];
            topSquare.visited = true;
            topSquare.select();
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
        // console.log(squares[i][j],' ', i, j)
        while (queue.length!=0)
        {
            let size = queue.length;
            while (size--)
            {
                await sleep(5);
                let top = queue[0];
                queue.shift();
                let topSquare = top[0];
                if (topSquare.visited || topSquare.isWall())
                    continue;
                topSquare.beforeElement = top[1];
                if (topSquare.isEnd) {
                    this.traversePath(topSquare.beforeElement);
                    return;
                }
                topSquare.select();
                if (topSquare.up != null) {
                    queue.push([topSquare.up, topSquare]);
                }
                if (topSquare.down != null) {
                    queue.push([topSquare.down, topSquare]);
                }
                if (topSquare.left != null) {
                    queue.push([topSquare.left, topSquare]);
                }
                if (topSquare.right != null) {
                    queue.push([topSquare.right, topSquare]);
                }
            }
        }
    }

    async aStar() {
        ;
    }

    validNode(square) {
        return square != null && !square.isWall() && !square.visited;
    }

    async dijkstras() {  // FIXME
        let i = startIndex[0];
        let j = startIndex[1];

        let heap = new Heap(sizeX*sizeY, function(itemA, itemB) {
            if (itemA.fCost() == itemB.fCost()) {
                return itemA.hash_index < itemB.hash_index;
            }
            return itemA.fCost() < itemB.fCost();
        });

        squares[i][j].setHCost(null);
        // console.log(heap)
        heap.push(squares[i][j]);
        while (!heap.empty()) {
            await sleep(5);
            // console.log(heap)
            let top = heap.pop();
            let topSquare = top;
            // console.log(topSquare)
            if (topSquare.isEnd) {
                this.traversePath(topSquare.beforeElement)
                return;
            }
            topSquare.select();
            if (this.validNode(topSquare.up)) {
                topSquare.up.setHCost(topSquare);
                heap.push(topSquare.up)
            }
            if (this.validNode(topSquare.down)) {
                topSquare.down.setHCost(topSquare);
                heap.push(topSquare.down)
            }
            if (this.validNode(topSquare.left)) {
                topSquare.left.setHCost(topSquare);
                heap.push(topSquare.left)
            }
            if (this.validNode(topSquare.right)) {
                topSquare.right.setHCost(topSquare);
                heap.push(topSquare.right)
            }
        }
    }
}

asphalt  = new Solution()