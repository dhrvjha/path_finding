
class Heap {

    constructor(size, comparef = function(itemA, itemB) {
            return itemA < itemB;
        }, hash = function(square){
            return square.xCoord*sizeX + square.yCoord;
        }) {
        this.container = [-1];
        this.compare = comparef;
        this.map = Array(size).fill(-1);
        this.hash = hash;
        this.index = 0;
    }
    // TODO: complete duplicate
    duplicate(square) {
        let id = this.hash(square);
        return this.map[id] != -1;
    }
    _swap(ai, bi) {
        [this.container[ai], this.container[bi]] = [this.container[bi], this.container[ai]];
        this.map[this.hash(this.container[ai])] = bi;
        this.map[this.hash(this.container[bi])] = ai;
    }
    push(value) {
        // console.log(value)
        // if (this.duplicate(value)) {
        //     console.log(`Duplicate : ${value}`)
        //     if (this.compare(value, this.map[this.hash(value)])) {
        //       this.map[this.hash(value)].setHCost(value.hCost);
        //     }
        // }
        // this.map[this.hash(value)] = this.size();
        // value.heap_index = this.index++;
        this.container.push(value); // FIXME : add duplicate
        let i = this.container.length-1;
        while (i>1) {
            let parentIndex = Math.floor(i/2);
            if (this.compare(this.container[i], this.container[parentIndex])) {
                this._swap(parentIndex, i);
                i = parentIndex;
            } else {
                break;
            }
        }
    }

    top() {
        if (this.empty())
            throw new Error("Heap is empty");
        return this.container[1];
    }

    pop() {
        if (this.empty())
            throw new Error('Heap is empty');
        let res = this.top();
        this.map[res] = -1;
        this._remove();
        return res;
    }

    _remove() {
        if (this.container.length == 2){
            this.container = [0];
            return;
        }
        this.container[1] = this.container.pop();
        this._heapify();
    }

    _smallestChild(index) {
        if (this.container.length > (2*index+1)) {
            return this.compare(this.container[2*index],
             this.container[2*index+1])?2*index:2*index+1;
        }
        if (this.container.length > 2*index) {
            return 2*index;
        }
        return -1;
    }

    _heapify() {
        let i = 1;
        while (i < this.container.length) {
            let smallestChildIndex = this._smallestChild(i);
            if (smallestChildIndex==-1) { // leaf node
                break;
            }
            if (this.compare(this.container[smallestChildIndex],this.container[i])) {
                this._swap(i, smallestChildIndex);
                i = smallestChildIndex;
            } else {
                break;
            }
        }
    }
    size() {
        return this.container.length-1;
    }
    empty() {
        return this.size() == 0;
    }
}