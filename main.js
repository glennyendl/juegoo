const gato = document.getElementById('gato')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const pezImg = document.getElementById('pez')
const score = document.getElementById('score')
const timer = document.getElementById('time')
let peces = []
let rightPressed = false
let leftPressed = false
let gatoDeltaX = 10
let temp = performance.now()
let counter = 0
let timeStart = 0
let timeEnd = 0
const time = 60000
const down=4

function random(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

const tempo = {
    tempoMin : 100,
    tempoMax : 1000
}
class Pez{
    constructor(x,y){
        this.x = x 
        this.y = y
        this.width = pezImg.width
        this.height = pezImg.height
    }
    draw(){
        this.y+=down
        ctx.drawImage(pezImg,this.x,this.y,this.width,this.height)
    }
}
function meterPescao(){
    if(temp<performance.now()){
        temp=performance.now()+random(tempo.tempoMin, tempo.tempoMax)
        peces.push(new Pez(random(0,canvas.width-pezImg.width),0-pezImg.height))
    }
}
const numeros = [1,2,3,4]
const cuadrados = numeros.map((numero)=>{
    return numero*numero
})
function colision(pez){
    const colisionY = pez.y+pez.height>=player.y
    const colisionX = pez.x+pez.width>=player.x && pez.x<=player.x+player.width
    return colisionX && colisionY
}
function dibujarPescaos(){
    peces = peces.flatMap((pez)=>{
        if(pez.y<canvas.height){
            if(colision(pez)){
                counter++
                score.textContent=counter
                return []
            }
            pez.draw()
            return [pez]
        } else {
            return []
        }
    })
}
class Gato{
    constructor(x){
        this.x=x
        this.y=canvas.height-100
        this.width=100
        this.height=100
    }
    render(){
        ctx.drawImage(gato,this.x,this.y,this.width,this.height)
    }
}
const player = new Gato(canvas.width/2-50)
function render(){
    const remainTime=((timeEnd-performance.now())/1000).toFixed(2)
    meterPescao()
    timer.textContent=remainTime
    if(remainTime<=0){
        peces=[]
        timer.textContent=0
    }
    else{
        requestAnimationFrame(render)
    }
    ctx.clearRect(0,0,canvas.width,canvas.height)
    handleCatMovement()
    dibujarPescaos()
    player.render()
}
function init(){
    const handleKeyDown = e =>{
        const tecla = e.key
        if(tecla == 'ArrowLeft') leftPressed=true
        if(tecla == 'ArrowRight') rightPressed=true
    }
    const handleKeyUp = e =>{
        const tecla = e.key
        if(tecla == 'ArrowLeft') leftPressed=false
        if(tecla == 'ArrowRight') rightPressed=false
    }
    document.addEventListener('keydown',handleKeyDown)
    document.addEventListener('keyup',handleKeyUp)
}
function start(){
    timeStart=performance.now()
    timeEnd=performance.now()+time
    render()
}
function restart(){

}
function end(){

}
function handleCatMovement(){
    if(rightPressed && player.x<canvas.width-80) player.x+=gatoDeltaX
    if(leftPressed && player.x > -20) player.x-=gatoDeltaX
}
init()
start()