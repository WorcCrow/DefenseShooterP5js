class movingObject{
    constructor(position,target,speed = 1, size = 5, color = 'RED'){
        this.position = position
        this.origin = position
        this.target = target
        this.velocity
        this.speed = speed
        this.size = size
        this.color = color
        this.history = []

        this.velocity = p5.Vector.sub(this.target,this.origin)
        this.velocity.setMag(this.speed)
    }

    move(){
        this.position.add(this.velocity)
    }

    show(){
        strokeWeight()
        ellipse(this.position.x,this.position.y, this.size, this.size);
    }
}
