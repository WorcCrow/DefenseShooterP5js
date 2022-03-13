class WorldEntity{
    constructor(pos,w,h,gs,c){
        this.pos = pos
        this.width = w
        this.height = h 
        this.grid = gs
        this.color = c 
        this.center
    }

    update(v){
        let temp = createVector(v.x,v.y)
        this.pos.add(temp)
    }

    show(){
        push()
        translate(this.pos.x,this.pos.y)
        
        scale(zoom)
        /*
        for(let y = 0; y < this.height/this.grid; y++){
            for(let x = 0; x < this.width / this.grid; x++){
                let posx = x*this.grid 
                let posy = y*this.grid 
                fill(this.color)
                rect(posx,posy,this.grid,this.grid)
                fill('RED')
                textAlign(CENTER)
                textSize(20)
                text(x+y,posx+this.grid/2,posy+this.grid/2)
            }
        }
        */
        image(spaceBg,0,0,this.width,this.height)
        pop()
    }
}