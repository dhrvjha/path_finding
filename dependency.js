

const sleep = t => new Promise(s => setTimeout(s, t));

let maze;
let asphalt;
let sizeX;
let sizeY;
let startIndex=undefined;
let endIndex=undefined;
let squares = [[]];
