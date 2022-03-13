class Game{
    
    constructor(){


        this.loaded = false
        this.score = 0
        this.screen = 'menu'
        this.eventList = []
        this.buttons = {
            menu:[],
            gameover:[],
            help:[]

        }

        this.fps = {
            second:0,
            count:0,
            average:0,
        }
    }

    setup(){
        this.setup_menu()
        this.setup_gameover()
        this.setup_help()
    }

    setup_menu(){
        let menu_start = new Button(width/2-100,height/2-100,200,100,[100,100,100,100]) 
        menu_start.setText('Start Game','WHITE')
        menu_start.addEvent('click',()=>{this.screen = 'gamestart'})
        menu_start.addEvent('mouseover',()=>{menu_start.color = 'BROWN'})
        menu_start.addEvent('mouseout',()=>{menu_start.color = [100,100,100,100]})
        this.buttons.menu.push(menu_start)

        let menu_exit = new Button(width/2-100,height/2+100,200,100,[100,100,100,100]) 
        menu_exit.setText('EXIT','WHITE')
        menu_exit.addEvent('click',()=>{this.setScreen('gameover')})
        menu_exit.addEvent('mouseover',()=>{menu_exit.color = 'BROWN'})
        menu_exit.addEvent('mouseout',()=>{menu_exit.color = [100,100,100,100]})
        this.buttons.menu.push(menu_exit)

        let menu_help = new Button(width-20-100,20,80,80,[100,100,100,100]) 
        menu_help.setText('?','WHITE',width/30)
        menu_help.addEvent('click',()=>{this.setScreen('help')})
        menu_help.addEvent('mouseover',()=>{menu_help.color = 'BROWN'})
        menu_help.addEvent('mouseout',()=>{menu_help.color = [100,100,100,100]})
        this.buttons.menu.push(menu_help)
    }

    setup_gameover(){
        let btn_try = new Button(width/2-100,height/2+120,200,100,[0,0,0,0]) 
        btn_try.setText('Try Again ?','WHITE')
        btn_try.addEvent('click',()=>{this.screen = 'gamestart'; reset()})
        btn_try.addEvent('mouseover',()=>{btn_try.color = 'WHITE'; btn_try.text.color = 'BLACK'})
        btn_try.addEvent('mouseout',()=>{btn_try.color = [0,0,0,0]; btn_try.text.color = 'WHITE'})

        this.buttons.gameover.push(btn_try)
    }

    setup_help(){
        let menu_help = new Button(width-20-100,20,80,80,[100,100,100,100]) 
        menu_help.setText('<','WHITE',width/30)
        menu_help.addEvent('click',()=>{this.setScreen('menu')})
        menu_help.addEvent('mouseover',()=>{menu_help.color = 'BROWN'})
        menu_help.addEvent('mouseout',()=>{menu_help.color = [100,100,100,100]})
        this.buttons.help.push(menu_help)
    }

    show_gameover(){
        push()
            fill(255)
            textAlign(CENTER)
            textSize(width/10)
            text(`GAME OVER`,width/2,height/2)
            textSize(width/20)
            text(`SCORE ${game.score}`,width/2,100+height/2)

            this.buttons.gameover.forEach(b=>{
                b.show()
            })
        pop()
    }


    show_menu(){
        this.buttons.menu.forEach(b=>{
            b.show()
        })
    }

    show_help(){
        push()
            let style = {
                w:width/3,
                h:width/3,
                size:20,
                spacing:50,
                vertical:10
            }

            style.vertical = -style.h/2+50

            translate(width/2,height/2)
            rectMode(CENTER)
            noStroke()
            fill([100,100,100,50])
            rect(0,0,style.w,style.h)

            textSize(style.size)
            textAlign(LEFT)
            fill('WHITE')
            text(`[1]`,-style.w/2+10,style.vertical)
            text(`Back Fire`,0,style.vertical)
            style.vertical+=style.spacing

            text(`[Space]`,-style.w/2+10,style.vertical)
            text(`Rapid Fire`,0,style.vertical)
            style.vertical+=style.spacing

            text(`[Mouse]`,-style.w/2+10,style.vertical)
            text(`Steering `,0,style.vertical)
            style.vertical+=style.spacing

            text(`[Mouse 1]`,-style.w/2+10,style.vertical)
            text(`Activate Thrust `,0,style.vertical)

            
        pop()

        this.buttons.help.forEach(b=>{
            b.show()
        })
    }

    show_hud(player,enemy){
        push()
            textSize(15)
            fill('WHITE')
            text(`Thrust`,10,40)
            text(`Health`,10,65)
            text(`Enemy ${enemy.length}`,10,95)
            text(`Destroyed: ${player.kill}`,10,115)

            fill('ORANGE')
            rect(60,25,map(player.rush.time,0,50,0,100),20)

            fill('LIME')
            if(player.health < 10) fill('RED')
            if(player.health <= 0) player.gameover = true
            rect(60,50,map(player.health,0,20,0,100),20)

            this.show_fps()
        pop()
    }

    show_fps(){
        push()
            this.fps.count++
            fill('WHITE')
            textSize(15)

            if(this.fps.second != Math.floor((millis()/1000))){
                this.fps.second = Math.floor((millis()/1000))
                this.fps.average = this.fps.count
                this.fps.count = 0
            }
            textAlign(RIGHT)
            text(`Frame: ${this.fps.average} fps`,width-10,40)
        pop()
    }

    setScreen(scr){
        this.screen = scr
    }



    event(type){
        switch(type){
            case 'click':
                this.buttons[this.screen]?.forEach(b=>{
                    b.checkEvent('click',mouseX,mouseY)
                })
            break

            case 'mouseover':
                this.buttons[this.screen]?.forEach(b=>{
                    b.checkEvent('mouseover',mouseX,mouseY)
                })
                
            break

            case 'mouseout':
                this.buttons[this.screen]?.forEach(b=>{
                    b.checkEvent('mouseout',mouseX,mouseY)
                })
            break
        }

        

        return
        menu_start.checkEvent('click',mouseX,mouseY)
        menu_exit.checkEvent('click',mouseX,mouseY)
        btn_try.checkEvent('click',mouseX,mouseY)

        return
        if(isLoaded){
            menu_start.checkEvent('mouseover',mouseX,mouseY)
            menu_start.checkEvent('mouseout',mouseX,mouseY)

            menu_exit.checkEvent('mouseover',mouseX,mouseY)
            menu_exit.checkEvent('mouseout',mouseX,mouseY)
        }
    }


}

class Button{
    constructor(x,y,w,h,c){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.color = c
        this.text = {
            text:'BUTTON',
            color:'WHITE',
            size:this.w / 8
        }
        this.click = ()=>{}
        this.mouseover = ()=>{}
        this.mouseout = ()=>{}
    }

    show(){
        push()
            noStroke()
            fill(this.color)
            rect(this.x,this.y,this.w,this.h)
            fill(this.text.color)
            textAlign(CENTER,CENTER)
            textSize(this.text.size)
            text(`${this.text.text}`,this.x+this.w/2,this.y+this.h/2)
        pop()
    }

    setText(t,c,s = this.text.size){
        this.text.text = t
        this.text.color = c
        this.text.size = s
    }

    isHover(mX,mY){
        if(mX > this.x && mX < this.x + this.w){
            if(mY > this.y && mY < this.y + this.h){
               return true
            }
        }
        return false
    }

    addEvent(type,action){
        switch(type){
            case 'click':
            this.click = action
            break

            case 'mouseover':
            this.mouseover = action
            break

            case 'mouseout':
            this.mouseout = action
            break
        }
    }

    checkEvent(type,mX,mY){
        switch(type){
            case 'click':
                if(this.isHover(mX,mY)) this.click()
            break

            case 'mouseover':
                if(this.isHover(mX,mY)) this.mouseover()
            break;

            case 'mouseout':
                if(!this.isHover(mX,mY)) this.mouseout()
            break
        }
    }
}