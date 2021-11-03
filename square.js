
let sizeX;
let sizeY;
let startIndex=undefined;
let endIndex=undefined;
let squares = [[]];

function defineUpLeft(grid_item){
    for (let i=0;i<sizeY;i++) {
        squares[i] = []
        for (let j=0;j<sizeX;j++) {
            let id = j+(i*sizeX)
            grid_item.append('<div id=\''+id+'\' class=\'grid-item\'></div>')
            try {
                squares[i][j] = new Square(('#'+id), i==0?null:squares[i-1][j], j==0?null:squares[i][j-1])
            } catch (error) {
                console.log(i + ' - ' + j + ' - ' + error)
                return
            }
        }
    }
}
function defineRightDown()
{
    for (let i=0;i<sizeY;i++) {
        for (let j=0;j<sizeX;j++) {
            squares[i][j].right = j==sizeX-1?null:squares[i][j+1]
            squares[i][j].down = i==sizeY-1?null:squares[i+1][j]
        }
    }
}
function setBoxes() {
    let grid_item = $('.grid')
    let value = 'repeat('+sizeX+', 1fr)'
    $('.grid').css('grid-template-columns', value)
    grid_item.html('')
    defineUpLeft(grid_item)
    defineRightDown()
}

function setStart() {
    if (startIndex!==undefined) return
    startIndex = [parseInt((sizeY-1)/2), parseInt((sizeX)/10)];

    squares[startIndex[0]][startIndex[1]].start();
}

function setEnd() {
    if (endIndex!==undefined)   return
    endIndex = [parseInt((sizeY-1)/2), parseInt((sizeX-1))]
    squares[endIndex[0]][endIndex[1]].end();
}

function clearSelection() {
    for (const items of squares) {
        for (const square of items) {
            square.clear()
        }
    }
}

function setRandomMazeGenerator() {
    $('#maze').click(function() {
        clearSelection();
        let limit = (sizeX*sizeY)/2
        for (let i=0;i<limit;i++) {
            let x = parseInt(Math.random() * sizeX);
            let y = parseInt(Math.random() * sizeY);
            squares[y][x].toggleColor();
        }
    })
}

function setStartButton() {
    $('#start').click(function() {
        let _asphalt = new Solution().bfs();
    })
}

function setClear() {
    $('#clear').click(clearSelection)
    $('#clearSelection').click(function() {
        for (const items of squares) {
            for (const square of items) {
                square.deselect()
            }
        }
    })
}
function init(){
    // console.log('resizing')

    sizeX = parseInt(($(document).width()-2*10-2*4)/(15+2+3));
    sizeY = parseInt($(document).height()/35);
    setBoxes();
    setStart();
    setEnd();
    setRandomMazeGenerator();
    setClear();
    setStartButton();
}


$(document).ready(function() {init()})
// $(document).ready(function(){$(window).resize(init)})
