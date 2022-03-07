class bullet extends movingObject{
    show(){
        this.move()
        //console.log(this.target)
        fill(this.color)
        noStroke();
        ellipse(this.position.x,this.position.y, this.size, this.size)
    }

    outRange(){
        if(this.position.x < 0) return true
        if(this.position.x > width) return true
        if(this.position.y < 0) return true
        if(this.position.y > height) return true
        return false
    }
}
class enemy extends movingObject{
    constructor(position,target,speed = 1, size = 5, color = 'RED', health = 1,mult_target = null){
        super(position,target,speed, size, color)
        this.health = health

        let t = createVector(width/2,height/2)
        this.mult_target = [
            p5.Vector.add(t,p5.Vector.random2D().mult(random(410,600))),
            p5.Vector.add(t,p5.Vector.random2D().mult(random(210,400))),
            p5.Vector.add(t,p5.Vector.random2D().mult(random(110,200))),
            t
        ]
    }
    move(){
        this.velocity = p5.Vector.sub(this.target,this.origin)
        this.velocity.setMag(this.speed)
        this.position.add(this.velocity)
    }

    show(){
        this.move()
        fill(this.color)
        noStroke();
        if(this.health > 1){
            stroke(2)
            stroke('RED')
        }
        ellipse(this.position.x,this.position.y, this.size, this.size)

        var distance = p5.Vector.sub(this.position,createVector(width/2,height/2))

        text(`${parseInt(distance.mag())} ${this.target.x} ${this.target.y} `,this.position.x,this.position.y - 20)
        
        //if(distance > 1000)
        stroke('BLACK')
        strokeWeight(10)
        point(this.target.x,this.target.y)
    }

    bulletHit(bullets){
        var hit = false
        var index = []
        var swag = []
        bullets.forEach((b,i)=>{
            let distance = dist(this.position.x,this.position.y,b.position.x,b.position.y)
            //console.log(distance)
            if(distance < b.size){
                hit = true
                index.push(i)
            }

            if(distance < 500){
                swag.push(i)
            }
        })
        return [hit, index, swag]
        //console.log(bullets)
    }
}

class playerEntity{
    constructor(){
        this.score = 0
        this.life = 10
        this.size = 50
        this.bullet = 5
        this.level = 0
        this.lastshot = millis()
    }
    show(){
        let mouse = createVector(mouseX,mouseY)
        let position = createVector(width/2,height/2)
        let velocity = p5.Vector.sub(mouse,position)
        velocity.setMag(30)

        fill('red')
        stroke(126);
        strokeWeight(12)
        line(velocity.x,velocity.y,0,0)
        
        strokeWeight(5)
        ellipse(0,0, this.size, this.size);
    }

    hit(enemy){
        if(dist(width/2,height/2,enemy.position.x,enemy.position.y) < this.size) return true
        return false
    }
}