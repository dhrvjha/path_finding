class Square {
    constructor(id, up, left) {
        this.element = id;
        // console.log('constructor - ',this.element)
        this.up = up;
        this.before = null;
        this.left = left;
        this.wall = false
        this.isStart = false;
        this.isEnd = false;
        this.visited = false;
        $(this.element).click(
            this.toggleColor.bind(this)
        )
    }

    toggleColor(){

        if (this.isStart || this.isEnd)
            return
        if (!this.wall){
            $(this.element).css('background-color','brown')
            this.wall = true
        }
        else{
            $(this.element).css('background-color', 'white')
            this.wall = false
        }
    }

    clear() {
        if (this.isStart || this.isEnd) return;
        $(this.element).css('background-color','white');
    }

    select() {
        this.visited = true;
        if (this.isStart || this.isEnd)
            return;
        $(this.element).css('background-color','lightblue');
    }

    pathElement() {
        if (this.isStart || this.isEnd) return;
        $(this.element).css('background-color','Yellow');
    }

    deselect() {
        if (this.isStart || this.isEnd || this.wall){
            console.log('asdf')
            return;
        }
        $(this.element).css('background-color','white');
    }
    start() {
        $(this.element).css('background-color','lightgreen');
        this.isStart = true;
        this.isEnd = false;
    }

    end() {
        $(this.element).css('background-color','red');
        this.isEnd = true;
        this.isStart = false;
    }
    isWall() {
        return this.wall;
    }
}
