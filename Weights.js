

class Weights {
  random() {
    let limit = (sizeX) / 10
    for (const items of squares) {
      for (let i = 0; i < limit; i++) {
        let x = parseInt(Math.random() * sizeX);
        items[x].setWeight(100);
      }
    }
  }
}