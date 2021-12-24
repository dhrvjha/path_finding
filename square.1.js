class Square {
  constructor(id, up, left, i, j) {
    this.element = id;
    // console.log('constructor - ',this.element)
    this.up = up;
    this.before = null;
    this.left = left;
    this.wall = false;
    this.isStart = false;
    this.isEnd = false;
    this.visited = false;
    this.xCoord = j;
    this.yCoord = i;
    this.hCost = 0;
    this.gCost = 0;
    $(this.element).click(this.toggleColor.bind(this))
  }
  id() {
    return this.xCoord + this.yCoord * sizeX;
  }
  _changeToDefault() {
    this.element.css('background-color', SquareDefaultColor);
    this.element.css('border-color', SquareDefaultBorderColor);
    this.element.css('box-shadow', 'none')
  }
  _changeToSelected() {
    this.element.css('background-color', SquareSelectedColor);
    this.element.css('border-color', SquareSelectedBorderColor);
  }
  _changeToWall() {
    this.element.css(
        'box-shadow',
        '2px 4px 5px 1px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)');
    this.element.css('background-color', SquareWallColor);
    this.element.css('border-color', SquareWallBorderColor);
  }
  _changeToPath() {
    this.element.css('background-color', SquarePathColor);
    this.element.css('border-color', SquarePathBorderColor);
  }
  toggleColor() {
    if (this.isStart || this.isEnd) return;
    if (!this.wall) {
      this._changeToWall();
      this.wall = true
    } else {
      this._changeToDefault();
      this.wall = false
    }
  }

  clear() {
    this.visited = false;
    this.wall = false;
    this.hCost = 0;
    this.gCost = 0;
    if (this.isStart || this.isEnd) return;
    this._changeToDefault()
  }

  select() {
    this.visited = true;
    if (this.isStart || this.isEnd) return;
    this._changeToSelected()
  }

  pathElement() {
    if (this.isStart || this.isEnd) return;
    this._changeToPath()
  }

  deselect() {
    this.visited = false;
    if (this.isStart || this.isEnd || this.wall) {
      return;
    }
    this._changeToDefault()
  }
  start() {
    this.element.css('background-color', SquareStartColor);
    this.element.css('border-color', SquareStartBorderColor);
    this.isStart = true;
    this.isEnd = false;
  }

  end() {
    this.element.css('background-color', SquareEndColor);
    this.element.css('border-color', SquareEndBorderColor);
    this.isEnd = true;
    this.isStart = false;
  }
  isWall() {
    return this.wall;
  }

  fCost() {
    return this.hCost + this.gCost;
  }
  _beforeElementAndHCost(square) {
    if (square != null) this.hCost += square.hCost;
    this.beforeElement = square;
  }
  setHCost(item) {
    if (item instanceof Square) {
      this._beforeElementAndHCost(item);
      return;
    }
  }
  setWeight(value) {
    if (!this.isStart && !this.isEnd && !this.isWall()) {
      this.element.css('background-color', SquareWeightsColor);
      this.element.css('border-color', SquareWeightsBorderColor);
    }
    this.hCost = value;
  }
}
