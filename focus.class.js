class FocusEntity{
    constructor(pos,world){
        this.pos = pos
        this.world = world
        this.vel = createVector(0,0)
        this.health = 20
        this.acc = 2
        this.gameover = false

        this.kill = 0

        this.weapon = {
            ammo:10
        }

        this.rush = {
            ready:true,
            activate:false,
            speed:5,
            time:50
        }
    }

    direction(mx,my){
        stroke(0)
        //line(mx,my,this.pos.x,this.pos.y)
        this.vel = createVector(this.pos.x,this.pos.y)
        this.vel.sub(createVector(mx,my))
        //velocity.div(20)
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
        //return createVector(this.world.pos.x, this.world.pos.y)
    }


    show(){
        /*
        textSize(15)

        fill('WHITE')
        text(`Thrust`,10,40)
        text(`Health`,10,65)
        text(`Enemy ${enemy.length}`,10,95)
        text(`Destroyed: ${this.kill}`,10,height-20)

        fill('ORANGE')
        rect(60,25,map(focus.rush.time,0,50,0,100),20)

        fill('LIME')
        if(focus.health < 10) fill('RED')
        if(focus.health <= 0) this.gameover = true
        rect(60,50,map(focus.health,0,20,0,100),20)
        */
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
            
            //ellipse(0,0,25,25)
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