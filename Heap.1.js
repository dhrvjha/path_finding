
class Heap {

    constructor(size, comparef = function(itemA, itemB) {
            return itemA < itemB;
        }, hash = function(square){
            return square.xCoord*sizeX + square.yCoord;
        }) {
        this.container = [-1];
        this.compare = comparef;
        this.map = Array(size).fill(-1);
        this.hash() = hash;
    }

    duplicate(square) {
        let id = this.hash();
        return this.map[id] != -1;
    }
    _swap(itemA, ai, itemB, bi) {
        [itemA, itemB] = [itemB, itemA];
        this.map[this.hash(itemA)] = bi;
        this.map[this.hash(itemB)] = ai;
    }
    push(value) {
        this.container.push(value);
        let i = this.container.length-1;
        while (i>1) {
            let parentIndex = Math.floor(i/2);
            if (this.compare(this.container[i], this.container[parentIndex])) {
                this._swap(this.container[parentIndex],
                 parentIndex, this.container[i], i);
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
                this._swap(this.container[i], i,
                 this.container[smallestChildIndex], smallestChildIndex);
                i = smallestChildIndex;
            } else {
                break;
            }
        }
    }

    empty() {
        return this.container.length-1 == 0;
    }
}