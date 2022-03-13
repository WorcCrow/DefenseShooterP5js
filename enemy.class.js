class EnemyEntity{
    constructor(pos,vel,acc = 2.5,world){
        this.pos = pos 
        this.vel = vel 
        this.world = world
        this.life = 20
        this.acc = acc
        //console.log(this.world.pos)
    }

    update(){
        //let vel = createVector(this.vx,this.vy)
        this.vel.setMag(this.acc)
        this.pos.add(this.vel)
    }

    myPos(){
        return createVector(this.world.pos.x + this.pos.x,this.world.pos.y + this.pos.y)
    }

    isHit(player,bullet,enemy,ei){
        
        bullet.forEach((b,bi) => {
            let mag = dist(this.pos.x,this.pos.y,b.pos.x,b.pos.y)
            if(mag < 35){
                bullet.splice(bi,1)
                this.life--
                if(this.life <= 0){
                    player.kill++
                    player.acc += 0.02
                    enemy.splice(ei,1)

                    //let pos = createVector(0, 0)
                    //let facing = createVector(player.pos.x,player.pos.y)
                    //for(let i = 0; i < 10; i++){
                        let start = player.worldpos()
                        let randVel = p5.Vector.random2D()
                        randVel.setMag(random(width/2,width))
                        start.add(randVel)

                        enemy.push(new EnemyEntity(start,createVector(0,0),this.acc + 0.1,world))
                    //}
                }
            }

           
        })
    }

    isPlayerHit(player,enemy,ei){
        let myPos = this.myPos()
        let mag = dist(myPos.x,myPos.y,player.pos.x,player.pos.y)
        
        if(mag < 50){
            enemy.splice(ei,1)
            player.health-=5
        }
    }


    show(){
        push()
            let myPos = this.myPos()
            translate(myPos.x,myPos.y)
            scale(zoom)
            fill('WHITE')
            ellipse(0,0,35,35)
            fill('GREEN')
            if(this.life < 5){
                fill('RED')
            }
            rectMode(CENTER)
            rect(0,-35,this.life*5,10)
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
            console.log('removing')
        }
    }
}