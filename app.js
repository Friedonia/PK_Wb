const canvas = document.querySelector('canvas')
const C = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gravity = 1.5



class Player {
   constructor (){
   
      this.position = {
         x: 100,
         y: 400
      }
      this.velocity = {
         x: 0,
         y: 1
      }
      this.width = 30
      this.height = 30
   }

   draw(){
      C.fillStyle = 'red'
      C.fillRect(this.position.x, this.position.y, this.width, this.height)

   }

   update(){
      this.draw()   
      this.position.y += this.velocity.y
      this.position.x += this.velocity.x
      
      if(this.position.y + this.height + this.velocity.y <= canvas.height)
         this.velocity.y += gravity
      else 
         this.velocity.y = 0
      /*
      if(this.velocity.x > 0) 
         this.velocity.x -= 1
      else if (this.velocity.x < 0 )
         this.velocity.x += 1
      */
   }
}

const keys = {
   right: {
      pressed: false
   },
   left: {
      pressed: false
   }
}

class Platform{
   constructor(){
      this.position = {
         x: 200,
         y: 300
      }
      this.width = 300
      this.height = 20

   }
   draw (){
      C.fillStyle = 'blue'
      C.fillRect(this.position.x, this.position.y,this.width, this.height)
   }
}


const player = new Player()
const platform = new Platform()

function animate(){
   requestAnimationFrame(animate)
   C.clearRect(0,0, canvas.width, canvas.height)
   player.update()
   

   platform.draw()

   if(keys.right.pressed){
      player.velocity.x = 10
   } else if(keys.left.pressed){
      player.velocity.x = -10
   } else player.velocity.x = 0

   if(player.width+player.position.x >=  canvas.width || player.position.x <=  0)
        { player.velocity.x *= -1 }

   if(player.height+player.position.y <= platform.position.y &&
       player.position.y +player.height +player.velocity.y >= platform.position.y 
       && player.position.x + player.width >= platform.position.x &&
         player.position.x <= platform.position.x + platform.width)
         { player.velocity.y = 0}

} 

animate()

addEventListener('keydown', ({ keyCode }) => {
   console.log(keyCode)
   switch (keyCode){
      case 65:
         console.log('links')
         keys.left.pressed = true
         break

      case 68:
         console.log('rechts')
         keys.right.pressed = true
         break
         
      case 87: 
         console.log('hoch')
         player.velocity.y -= 20
         break
   }
} )
addEventListener('keyup', ({ keyCode }) => {
   console.log(keyCode)
   switch (keyCode){
      case 65:
         console.log('links')
         keys.left.pressed = false
         break

      case 68:
         console.log('rechts')
         keys.right.pressed = false
         break

   }
} )
 