class PlayerEntity{
    constructor(pos,world){
        this.pos = pos
        this.world = world
        this.vel = createVector(0,0)
        this.health = 20
        this.acc = 2
        this.gameover = false

        this.kill = 0

        this.rush = {
            ready:true,
            activate:false,
            speed:5,
            time:50
        }
    }

    direction(mx,my){
        stroke(0)
        this.vel = createVector(this.pos.x,this.pos.y)
        this.vel.sub(createVector(mx,my))
        this.vel.setMag(this.acc)
        

        if(this.rush.activate && this.rush.ready){
            if(this.rush.time){
                this.vel.setMag(5+this.rush.speed)
                this.rush.time--
            }else{
                this.rush.ready = false
                this.rush.activate = false
            }
        }else{
            if(this.rush.time < 50){
                this.rush.time++
                this.rush.activate = false
            }else{
                this.rush.ready = true
            }
        }
        return this.vel
    }

    worldpos(){
        return createVector(this.pos.x-this.world.pos.x, this.pos.y-this.world.pos.y)
    }


    show(){
        push()
            
            translate(this.pos.x,this.pos.y)
            scale(zoom)
            fill(0)
            let rot = atan2(this.vel.x,this.vel.y)
            rotate(-rot)
            imageMode(CENTER)
            if(this.rush.activate){
                image(playerImg,0,0,90,120)
            }else{
                image(playerImg,0,0,100,100)
            }
        pop()
    }

    edge(){
        let myPos = this.worldpos()
        let myX = myPos.x
        let myY = myPos.y
        if(myX < 0 || myX > this.world.width) return true
        if(myY < 0 || myY > this.world.height) return true
        return false
    }
}