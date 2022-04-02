let levels = []
let poses = []
let endes = []

function preload(){
  levels[0] = loadImage('level1.png');
  levels[1] = loadImage('level2.png');
  levels[2] = loadImage('level3.png');
}

let pos
let end

let curLevel = 1

let allData = []



function setup(){
  for(p=0;p<levels.length;p++){
  let data = Array(10).fill().map(()=>Array(10).fill(0))
  let canvas = createCanvas(800, 800);
  canvas.position((windowWidth/2)-width/2,30);
  
  levels[p].loadPixels()
  
  for(i=0;i<levels[p].pixels.length/4;i++){
    if(levels[p].pixels[i*4]===255){
      pos = [i%10, floor(i/10)]
      data[i%10][floor(i/10)] = 1         
    } else if (levels[p].pixels[i*4+1]===255){     
      end = [i%10, floor(i/10)]
      data[i%10][floor(i/10)] = 1
    } else if(levels[p].pixels[i*4+2]===255)
      data[i%10][floor(i/10)] = 1

  }
  levels[p].updatePixels();
  
  
  allData.push(data)
  poses.push(pos)
  endes.push(end)

  pos = poses[curLevel]
  end = endes[curLevel]


  }

  
}




let blocks = [[]]

let avaMoves = [[]]

let moveNum = 0

let lastMove = 'none'






let squareSize = 800/10




function draw() {


  background(220);

    fill(0)
    textSize(50)
    text(moveNum, 100, 100)











    for (y=0; y<height/squareSize; y++){
      for (x=0; x<width/squareSize; x++){

        if(allData[curLevel][x][y] === 1){
          fill(255)
          square(x*squareSize, y*squareSize, squareSize)
        } else if(allData[curLevel][x][y] === 2){
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



    for(q = 1000; q<avaMoves.length;q++){
      square(squareSize*avaMoves[q][0], squareSize*avaMoves[q][1], squareSize)
    }

  }


function keyPressed() {

  if (keyCode === LEFT_ARROW && allData[curLevel][pos[0]-1][pos[1]] === 1 && lastMove != 'Right') {
    lastMove = 'Left'
    pos[0]--
    nextBlock()
  } else if (keyCode === RIGHT_ARROW && allData[curLevel][pos[0]+1][pos[1]] === 1 && lastMove != 'Left') {
    lastMove = 'Right'
    pos[0]++
    nextBlock()
  } else if (keyCode === UP_ARROW && allData[curLevel][pos[0]][pos[1]-1] === 1) {
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

  if(allData[curLevel][pos[0]-1][pos[1]] === 1 && lastMove != 'Right'){
    avaMoves.push([pos[0]-1, pos[1]])

  }
  if (allData[curLevel][pos[0]+1][pos[1]] === 1 && lastMove != 'Left'){
    avaMoves.push([pos[0]+1, pos[1]])

  }
  if (allData[curLevel][pos[0]][pos[1]-1] === 1){
    avaMoves.push([pos[0], pos[1]-1])

  }

  if(avaMoves.length<2){
    console.log("U DEAD")
  }


  console.log(avaMoves)
}










window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);