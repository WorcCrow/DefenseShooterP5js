class ProjectileEntity{
    constructor(pos,vel,world){
        this.pos = pos 
        this.vel = vel 
        this.world = world
    }

    update(){
        this.vel.setMag(10)
        this.pos.sub(this.vel)
    }


    show(){
        push()
            translate(this.world.pos.x + this.pos.x,this.world.pos.y + this.pos.y)
            fill('RED')
            ellipse(0,0,5,5)
        pop()
    }

    edge(){
        let myPos = this.pos
        let myX = myPos.x
        let myY = myPos.y 
        if(myX < 0 || myX > this.world.width) return true
        if(myY < 0 || myY > this.world.height) return true
        return false
    }

    outOfRange(projectile,i){
        if(this.edge()){
            projectile.splice(i,1)
        }
    }
}