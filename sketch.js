let levels = []
let poses = []
let endes = []
let character
let checker
let gradient

function preload(){
  levels[0] = loadImage('level1.png');
  levels[1] = loadImage('level2.png');
  levels[2] = loadImage('level3.png');
  levels[3] = loadImage('level4.png');
  character = loadImage('Character.png')
  checker = loadImage('Checker.png')
  gradient = loadImage('gradient.png')
}

let pos
let end

let curLevel = 2

let allData = []

let winScore = []

let c1

let c2

function setup(){
  
  
  
  for(p=0;p<levels.length;p++){
  let rawBlocks = [[]]
  let data = Array(10).fill().map(()=>Array(10).fill(0))
  let canvas = createCanvas(800, 800);
  let order = []
  canvas.position((windowWidth/2)-width/2,30);
  
  levels[p].loadPixels()
  winScore.push(levels[p].pixels[0])
  
  for(i=0;i<levels[p].pixels.length/4;i++){
    if(levels[p].pixels[i*4]===255){
      pos = [i%10, floor(i/10)]
      data[i%10][floor(i/10)] = 1   
      
      if(levels[p].pixels[i*4+1]===255){
        rawBlocks[levels[p].pixels[i*4+2]]=([i%10, floor(i/10)])

      }
      
      
    } else if (levels[p].pixels[i*4+1]===255){     
      end = [i%10, floor(i/10)]
      data[i%10][floor(i/10)] = 1
    } else if(levels[p].pixels[i*4+2]===255){
      data[i%10][floor(i/10)] = 1
    }

  
  }

    
  reBlocks = rawBlocks
  console.log(reBlocks[reBlocks.length-1][0], 'a')
  
  if(reBlocks[reBlocks.length-1][0] === undefined){
    console.log("BAD")
  reBlocks.shift()
  }


  console.log(reBlocks)

  
  allData.push(data)
  poses.push(pos)
  endes.push(end)
  
  

  pos = poses[curLevel]
  end = endes[curLevel]
    
  totalBlocks.push(reBlocks)
  


  }


  
}


let totalBlocks = [[]]

let blocks = [[]]

let avaMoves = [[]]

let moveNum = 0

let lastMove = 'Up'






let squareSize = 800/10




function draw() {
  background(0)
  image(gradient, 0, 0, width*2, height*2)
  stroke(200)
  strokeWeight(5)
  blocks = totalBlocks[curLevel+1]





    fill(0)
    textSize(50)
    text(moveNum, 100, 100)












    for (y=0; y<height/squareSize; y++){
      for (x=0; x<width/squareSize; x++){

        if(allData[curLevel][x][y] === 1){
          fill(255)
          square(x*squareSize, y*squareSize, squareSize, 10)
        } else if(allData[curLevel][x][y] === 2){
          fill(100)
          square(x*squareSize, y*squareSize, squareSize, 10)
        }











      }
    }
    noStroke()

  
    image(checker, end[0]*squareSize+squareSize/2, end[1]*squareSize+squareSize/2, squareSize, squareSize)

    fill(239, 112, 132)
    angleMode(DEGREES);
    imageMode(CENTER)


    
    if(lastMove === 'Up'){

      image(character, pos[0]*squareSize+squareSize/2, pos[1]*squareSize+squareSize/2, squareSize-squareSize/5, squareSize-squareSize/5)
      

    } else if(lastMove === 'Right'){
      translate (pos[0]*squareSize+squareSize/2, pos[1]*squareSize+squareSize/2);
      rotate(90)
      image(character, 0, 0, squareSize-squareSize/5, squareSize-squareSize/5)
    } else if(lastMove === 'Left'){
      translate (pos[0]*squareSize+squareSize/2, pos[1]*squareSize+squareSize/2);
      rotate(270)
      image(character, 0, 0, squareSize-squareSize/5, squareSize-squareSize/5)
    }
  
    rotate(0)
    translate(0, 0)
  
  

    
    

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
    if(moveNum+1 === winScore[curLevel]){
      console.log('U WIN')
    }
  }
  
  
  
  
  if(moveNum<blocks.length){
  allData[curLevel][blocks[moveNum][0]][blocks[moveNum][1]] = 2
  

  }
  
  moveNum++
  
  

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