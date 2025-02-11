
var blockSize = 32
var rows = 20
var cols = 20
var board
var context

var snakeX = blockSize * 5
var snakeY = blockSize * 5

var snakeBody = [0]

var velocityX = 0
var velocityY = 0

window.onload = function(){
    board = document.getElementById("board")
    board.height = rows * blockSize
    board.width = cols * blockSize
    context = board.getContext("2d")

    document.addEventListener("keydown", changeDirection)
    placeSnake()
    placeFood()
    setInterval(update, 1000/10)
}

function placeSnake(){
    snakeX = Math.floor(Math.random() * cols) * blockSize
    snakeY = Math.floor(Math.random() * rows) * blockSize
}

function placeFood(){
    foodX = Math.floor(Math.random() * cols) * blockSize
    foodY = Math.floor(Math.random() * rows) * blockSize
}

function update(){
    context.fillStyle="dimgray"
    context.fillRect(0, 0, board.width, board.height)

    context.fillStyle="lime"
    snakeX += velocityX * blockSize
    snakeY += velocityY * blockSize
    context.fillRect(snakeX, snakeY, blockSize, blockSize)

    for(let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1]
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY]
    }


    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1], blockSize, blockSize)
    }

    context.fillStyle="orange"
    context.fillRect(foodX, foodY, blockSize, blockSize)

    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY])
        placeFood()
    }

}

function changeDirection(event){
    if(event.code == "ArrowUp" && velocityY != 1){
        velocityX = 0
        velocityY = -1
    }else if(event.code == "ArrowRight" && velocityX != -1){
        velocityX = 1
        velocityY = 0
    }else if(event.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1
        velocityY = 0
    }else if(event.code == "ArrowDown" && velocityY != -1){
        velocityX = 0
        velocityY = 1
    }
}