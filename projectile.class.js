class ProjectileEntity{
    constructor(pos,vel,back=false,world){
        this.pos = pos 
        this.vel = vel 
        this.world = world
        this.back = back
        //console.log(this.world.pos)
    }

    update(){
        //let vel = createVector(this.vx,this.vy)
        this.vel.setMag(10)
        
        if(this.back){
            this.pos.add(this.vel)
        }else{
            this.pos.sub(this.vel)
        }
    }


    show(){
        push()
            translate(this.world.pos.x + this.pos.x,this.world.pos.y + this.pos.y)
            scale(zoom)
            fill('RED')
            //stroke('RED')
            //strokeWeight(10)

            //line(0,0,this.vel.x-100,this.vel.y-100)
            ellipse(0,0,5,5)
            
            
            //text(`${this.pos.x},${this.pos.y}`,0,-40)
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