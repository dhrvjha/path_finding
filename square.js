
function defineUpLeft(grid_item){
    for (let i=0;i<sizeY;i++) {
        squares[i] = []
        for (let j=0;j<sizeX;j++) {
            let id = j+(i*sizeX)
            grid_item.append('<div id=\''+id+'\' class=\'grid-item\'></div>')
            try {
                squares[i][j] = new Square($(`#${id}`), i==0?null:squares[i-1][j], j==0?null:squares[i][j-1], i, j)
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

    startIndex = [parseInt(Math.random()*(sizeY-1)), parseInt((Math.random()*10))];

    squares[startIndex[0]][startIndex[1]].start();
}

function setEnd() {

    endIndex = [parseInt(Math.random()*(sizeY-1)), parseInt((sizeX-(Math.random()*10)))]
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
    IDHorizonatalMazeTag.click(function() {
        clearSelection();
        maze.wallSides().then(result => maze.horizonatalRandom())
        // maze.horizonatalRandom();
    })
    IDVerticalMazeTag.click(function() {
        clearSelection();
        maze.wallSides().then(result => maze.verticalRandom());
    })
    IDRandomMazeTag.click(function() {
        clearSelection();
        maze.random()
    })
}

async function showAlert(message) {
    AlertAlgoModal.html(message)
    AlertAlgoModal.show();
    await sleep(2000);
    AlertAlgoModal.hide();
}

function algoSelect() {
    IDAlgoBfsTag.click(function() {
        algoToVisualize = 1;
        showAlert('Classic BFS Selected');
    })
    IDAlgoDfsTag.click(function() {
        algoToVisualize = 2;
        showAlert('Classic DFS Selected')
    })
    IDAlgoAstarTag.click(function() {
        algoToVisualize = 3;
        showAlert('A-Star Selected')
    })
}

function setStartButton() {
    $('#start').click(function() {
        console.log('start');
        if (algoToVisualize==1){
            asphalt.bfs();
        } else if (algoToVisualize==2) {
            asphalt.dfs();
        } else if (algoToVisualize==3) {
            asphalt.astar();
        } else {
            console.error(`algoToVisualize has unkonwn value : ${algoToVisualize}`)
        }
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

    sizeX = parseInt(($(document).width()-2*4)/(15+2+3));
    sizeY = parseInt($(document).height()/35);
    setBoxes();
    setStart();
    setEnd();
    if (once) {
        setRandomMazeGenerator();
        setClear();
        algoSelect();
        setStartButton();
    }
}


$(document).ready(function() {init()})
$(document).ready(function(){$(window).resize(init)})
