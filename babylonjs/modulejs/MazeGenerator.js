/**
 * 穴掘り法
 * @example import MazeGenerator from './MazeGenerator.js';
 * @note insert <script type="module"> ... </script>
 */

import GameUtil from '../modulejs/GameUtil.js';

//namespace MAZE {

/** Block State */
const BlockState = {
  WALL: "0",
  ROAD: "1",
  START: "2",
  GOAL: "3"
};

/** Directin */
const Direction = {
  Up: Symbol("up"),
  Right: Symbol("right"),
  Down: Symbol("down"),
  Left: Symbol("left")
};

/**
 * Pointクラス
 */
 export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `{x:${this.x}, y:${this.y}}`;
  }
}

/**
 * Blockクラス
 */
class Block {
  /*cell: BABYLON.Vector2;
  mesh: BABYLON.Mesh;
  state: BlockState;
  draw_state: BlockState;*/

  constructor(x, y){
    this.cell = new Point(x, y);
    this.state = BlockState.WALL;
  }
}

export class MazeGenerator { 
  constructor(num_col, num_row)
  {
    this._num_col = num_col; 
    this._num_row = num_row;
    this._startCells = new Array();
    //this._intervalTimerHandler = 0;
    this._board = new Array();
    this._digCells = new Array();
  }

  /**
   * Creates the BABYLONJS Scene
   */
  CreateScene() {
    // Box Array  
    for (let j = 0; j < this._num_row; j++) {
      let boxArray = new Array();
      for(let i = 0; i < this._num_col; i++){
        let block = new Block(i, j);
        boxArray.push(block);
      }
      this._board.push(boxArray);
    }
    // インターバルタイマーをセット
    //this._intervalTimerHandler = setInterval(() => this.changeDrawStateFunc(), 200);

    //this.InitializeDigMaze(true);
    this.InitializeDigMaze();
  }

    /**
   * Initialize dig maze world
   */
  InitializeDigMaze() {
    // 全てを壁で埋める
    // 穴掘り開始候補(x,yともに偶数)座標を保持しておく
    for (var y = 0; y < this._num_row; y++){
      for (var x = 0; x < this._num_col; x++){
        if (x == 0 || y == 0 
          || x == this._num_col - 1 || y == this._num_row - 1){
          this._board[y][x].state = BlockState.ROAD;// 外壁は判定の為通路にしておく(最後に戻す)
        }
        else{
          this._board[y][x].state = BlockState.WALL;
        }
      }
    }
   
    this._startBlock =  this._board[1][1];
    // 穴掘り開始
    this.DigMaze(1,1);
    
    // 外壁を戻す
    for (var y = 0; y < this._num_row; y++){
      for (var x = 0; x < this._num_col; x++){
        if (x == 0 || y == 0 || x == this._num_col - 1 || y == this._num_row - 1){
          this._board[y][x].state = BlockState.WALL;
        }
      }
    }

    this._startBlock.state = BlockState.START;
    
    while (true) {
     let idx_y = GameUtil.Rand(this._num_row - 1);
     if(this._board[idx_y][this._num_col - 2].state == BlockState.ROAD) {
        this._board[idx_y][this._num_col - 1].state = BlockState.GOAL;
        break;
      }
    }
  }
  
  DigMaze(x, y) {
    // 指定座標から掘れなくなるまで堀り続ける
    while (true)
    {
      // 掘り進めることができる方向のリストを作成
      var directions = new Array();
      
      if( y > 1 ) {
        if( this._board[y-1][x].state == BlockState.WALL 
        && this._board[y-2][x].state == BlockState.WALL)
          directions.push(Direction.Up);
      }
      if( x < this._num_col - 1 ){
        if( this._board[y][x+1].state == BlockState.WALL
        && this._board[y][x+2].state == BlockState.WALL)
          directions.push(Direction.Right);
      }
      if( y < this._num_row - 1 ){
        if(this._board[y+1][x].state == BlockState.WALL 
        && this._board[y+2][x].state == BlockState.WALL)
          directions.push(Direction.Down);
      }
      if( x > 1 ){
        if (this._board[y][x-1].state == BlockState.WALL
        && this._board[y][x-2].state == BlockState.WALL)
          directions.push(Direction.Left);
      }
  
      // 掘り進められない場合、ループを抜ける
      if (directions.length == 0) break;
  
      // 指定座標を通路とし穴掘り候補座標から削除
      this.SetPath(x, y);
      // 掘り進められる場合はランダムに方向を決めて掘り進める
      var dirIndex = GameUtil.Rand(directions.length);
      // 決まった方向に先2マス分を通路とする
      switch (directions[dirIndex])
      {
          case Direction.Up:
              this.SetPath(x, --y);
              this.SetPath(x, --y);
              break;
          case Direction.Right:
              this.SetPath(++x, y);
              this.SetPath(++x, y);
              break;
          case Direction.Down:
              this.SetPath(x, ++y);
              this.SetPath(x, ++y);
              break;
          case Direction.Left:
              this.SetPath(--x, y);
              this.SetPath(--x, y);
              break;
      }
    }
  
    // どこにも掘り進められない場合、穴掘り開始候補座標から掘りなおし
    // 候補座標が存在しないとき、穴掘り完了
    var cell = this.GetStartCell();
    if (cell != null)
    {
        this.DigMaze(cell.x, cell.y);
    }
  }
  
  
  // 座標を通路とする(穴掘り開始座標候補の場合は保持)
  SetPath(x, y) {
    this._board[y][x].state = BlockState.ROAD;
    this._digCells.push(new Point(x, y));
    if (x % 2 == 1 && y % 2 == 1)
    {
      // 穴掘り候補座標
      this._startCells.push(new Point(x, y));
    }
  }
  
  // 穴掘り開始位置をランダムに取得する
  GetStartCell()
  {
    if (this._startCells.length == 0) return null;
  
    // ランダムに開始座標を取得する
    let index = GameUtil.Rand(this._startCells.length);
    let cell = this._startCells[index];
    this._startCells.splice(index, 1);
  
    return cell;
  }
  
  /**
    *
    * Return Maze states  2D array
    * @return arr
    */
  GetState2D() {
   let states2D = new Array();
   
   this._board.forEach((blockArray, i) => {
     let states = blockArray.map(block => block.state);
     states2D.push(states);
    });
    return states2D;
  }
  
  /**
    *
    * Return Maze dig path x,y point
    * @return digPath array
    * @note use digPath[0].x, digPath[0].y
    */
  GetDigPath() {
   let digPath = new Array();
   
   this._digCells.forEach( cell => { 
    digPath.push( 
     { x: cell.x, y: cell.y }
    )
   });
   return digPath; 
  }

}

//} // namespace MAZE
