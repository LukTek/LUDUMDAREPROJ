function setup() {
  let canvas = createCanvas(800, 800);
  canvas.position((windowWidth/2)-width/2,30);


}

var img;



let data = Array(10).fill().map(()=>Array(10).fill(0))


for(j = 2; j <8; j++){
for(i=2; i <8; i++){
  data[i][j] = 1
}

}

let blocks = [[]]

let avaMoves = [[]]

let moveNum = 0

let lastMove = 'none'



blocks.push([4, 7])
blocks.push([3, 3])
blocks.push([6, 6])
blocks.push([3, 4])
blocks.push([7, 4])

console.log(blocks[1])


let squareSize = 800/10

let pos = [2, 7]

let end = [7, 2]


function draw() {
  background(220);

    fill(0)
    textSize(50)
    text(moveNum, 100, 100)











    for (y=0; y<height/squareSize; y++){
      for (x=0; x<width/squareSize; x++){

        if(data[x][y] === 1){
          fill(255)
          square(x*squareSize, y*squareSize, squareSize)
        } else if(data[x][y] === 2){
          fill(255, 0, 0)
          square(x*squareSize, y*squareSize, squareSize)
        }











      }
    }

    fill(0)

    square(pos[0]*squareSize, pos[1]*squareSize, squareSize)

    fill(0, 255, 0)
    square(end[0]*squareSize, end[1]*squareSize, squareSize)

    fill(0, 0, 255)



    for(q = 1; q<avaMoves.length;q++){
      square(squareSize*avaMoves[q][0], squareSize*avaMoves[q][1], squareSize)
    }

  }


function keyPressed() {

  if (keyCode === LEFT_ARROW && data[pos[0]-1][pos[1]] === 1 && lastMove != 'Right') {
    lastMove = 'Left'
    pos[0]--
    nextBlock()
  } else if (keyCode === RIGHT_ARROW && data[pos[0]+1][pos[1]] === 1 && lastMove != 'Left') {
    lastMove = 'Right'
    pos[0]++
    nextBlock()
  } else if (keyCode === UP_ARROW && data[pos[0]][pos[1]-1] === 1) {
    lastMove = 'Up'
    pos[1]--
    nextBlock()
}
}



function nextBlock(){
  if(end[0] === pos[0] && end[1] === pos[1]){
    console.log(moveNum)
  }
  moveNum++
  if(moveNum<blocks.length){
  data[blocks[moveNum][0]][blocks[moveNum][1]] = 2
  }

  avaMoves = [[]]
  console.log(lastMove)

  if(data[pos[0]-1][pos[1]] === 1 && lastMove != 'Right'){
    avaMoves.push([pos[0]-1, pos[1]])

  }
  if (data[pos[0]+1][pos[1]] === 1 && lastMove != 'Left'){
    avaMoves.push([pos[0]+1, pos[1]])

  }
  if (data[pos[0]][pos[1]-1] === 1){
    avaMoves.push([pos[0], pos[1]-1])

  }

  if(avaMoves.length<2){
    console.log("U DEAD")
  }


  console.log(avaMoves)
}





function windowResized() {
  resizeCanvas(10, 10);
}
