

const sleep = t => new Promise(s => setTimeout(s, t));


let AlertAlgoModal=$('#alertAlgo')
let IDStartTag=$('#start')
let IDMazeTag=$('#maze')
let IDClearTag=$('#clear')
let IDClearSelectionTag=$('#clearSelection')
let IDHorizonatalMazeTag=$('#horizontalMaze')
let IDVerticalMazeTag=$('#verticalMaze')
let IDRandomMazeTag=$('#randomMaze')

let IDAlgorithmTag=$('#algorithm')
let IDAlgoDfsTag=$('#classicDfs')
let IDAlgoBfsTag=$('#classicBfs')
let IDAlgoAstarTag=$('#aStar')

let maze;
let asphalt;
let once=true;
let sizeX;
let sizeY;
let startIndex=undefined;
let endIndex=undefined;
let squares = [[]];

/**
 * value    Algo
 *  1       BFS;
 *  2       DFS;
 *  3       A*;
 */
let algoToVisualize;