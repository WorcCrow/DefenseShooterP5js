class bullet extends movingObject{
    show(){
        this.move()
        //console.log(this.target)
        fill('red')
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
    constructor(position,target,speed = 1, size = 5, color = 'RED', health = 1){
        super(position,target,speed, size, color)
        this.health = health
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
    }

    bulletHit(bullets){
        var hit = false
        var index = []
        bullets.forEach((b,i)=>{
            let distance = dist(this.position.x,this.position.y,b.position.x,b.position.y)
            //console.log(distance)
            if(distance < this.size){
                hit = true
                index.push(i)
            }
        })
        return [hit, index]
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