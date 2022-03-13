<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Moving Tru Map</title>
    <style>
        body {
            padding: 0;
            margin: 0;
            overflow: hidden
        }
    </style>
    <script src="p5.min.js"></script>
    <script src="static.class.js?v=<?=rand(1,10000)?>"></script>
    <script src="game.class.js?v=<?=rand(1,10000)?>"></script>
    <script src="focus.class.js?v=<?=rand(1,10000)?>"></script>
    <script src="projectile.class.js?v=<?=rand(1,10000)?>"></script>
    <script src="world.class.js?v=<?=rand(1,10000)?>"></script>
    <script src="enemy.class.js?v=<?=rand(1,10000)?>"></script>
    
</head>

<body>
    <script>
        let zoom = 1
        let move = true
        let game 
        let world
        let focus
        let bullet = []
        let enemy = []
        //let menu_exit 
        //let menu_start 

        let isLoaded = false
        let frame = 0
        let avgFrame = 0
        let second = 0

        let spaceBg,spaceBg0 

        let enemyShip = []

        function preload(){
            playerImg = loadImage('image/spaceship.png')
            spaceBg = loadImage('image/spacebg.jpg')
            spaceBg0 = loadImage('image/spacebg0.jpg')

            enemyShip.push(loadImage('image/Ship/png/ship (12).png'))
            enemyShip.push(loadImage('image/Ship/png/ship (13).png'))
            enemyShip.push(loadImage('image/Ship/png/ship (14).png'))
            enemyShip.push(loadImage('image/Ship/png/ship (15).png'))
        }

        function setup(){
            createCanvas(windowWidth,windowHeight)
            
            game = new Game()
            game.setup()


            world = new WorldEntity(createVector(0,0),1920,1080,500,'BLUE')
            focus = new FocusEntity(createVector(windowWidth/2,windowHeight/2),world)
            world.center = createVector((-world.width/2)+focus.pos.x,(-world.height/2)+focus.pos.y)
            world.pos = createVector(world.center.x, world.center.y)

            let pos = createVector(0, 0)
            let facing = createVector(focus.pos.x,focus.pos.y)
            for(let i = 0; i < 30; i++){
                let start = focus.worldpos()
                let randVel = p5.Vector.random2D()
                randVel.setMag(random(width/2,width))
                start.add(randVel)

                enemy.push(new EnemyEntity(start,facing,1,world))
            }

            isLoaded = true
        }

        function reset(){
            focus.gameover = false
            focus.health = 20
            game.score = focus.kill
            focus.kill = 0
            enemy = []
            for(let i = 0; i < 30; i++){
                let start = focus.worldpos()
                let randVel = p5.Vector.random2D()
                randVel.setMag(random(width/2,width))
                start.add(randVel)

                enemy.push(new EnemyEntity(start,createVector(0,0),1,world))
            }
        }

        

        function draw(){
            background(0)
            image(spaceBg0,0,0,width)
            
            
            //Button

            

            switch(game.screen){
                case 'menu':
                    game.show_menu()
                    return
                break

                case 'gameover':
                    game.show_gameover()
                    return
                break

                case 'help':
                    game.show_help()
                    return
                break

                default:
                    
            }

            if(focus.gameover){

                game.setScreen('gameover')
                focus.gameover = false
                focus.health = 20
                game.score = focus.kill
                focus.kill = 0
            }

            

            world.show()


            if(move){
                world.update(focus.direction(mouseX,mouseY))
            }

            let isEdge = focus.edge()
            if(isEdge){
                world.pos = createVector(world.center.x, world.center.y)
            }
            
            bullet.forEach((b,i) => {
                b.update()
                b.show()
                b.outOfRange(bullet,i)
            })

            
            enemy.forEach((e,i) => {
                e.isHit(focus,bullet,enemy,i)
                e.isPlayerHit(focus,enemy,i)
                
                let target = createVector(focus.pos.x,focus.pos.y)
                let myPos = e.myPos()
                //line(target.x,target.y,myPos.x,myPos.y)
                target.sub(myPos)
                e.vel = target

                if(move){
                    e.update()
                }
                e.show()
                
                
                //text(`Enemy X,Y : ${myPos.x} ${myPos.y}`,10,140)
               // text(`Target X,Y : ${target.x} ${target.y}`,10,160)
            })
            fill(255)
            
            //text(`Focus X,Y : ${focus.pos.x} ${focus.pos.y}`,10,80)
            //text(`World X,Y : ${world.pos.x} ${world.pos.y}`,10,100)
            fill([0,255,100])
            
            
            focus.show()
            game.show_hud(focus,enemy)
            
            checkKeyDown()

            
        }

        function mouseClicked(){
            //focus.health--
            focus.rush.activate = true
            //console.log('CLICKED')

            game.event('click')

        }

        function mouseMoved() {
            if(!isLoaded) return 0

            game.event('mouseover')
            game.event('mouseout')
        }


        function mouseWheel(){
            if(event.delta > 0) zoom+=0.1
            if(event.delta < 0) zoom-=0.1
        }

        function shoot(type){
            if(focus.weapon.ammo > 0){
                let direction = focus.direction(mouseX,mouseY)
                bullet.push(new ProjectileEntity(focus.worldpos(),direction,type,world))
            }
        }

        function checkKeyDown(){
            keyIsDown(65) ? console.log('23') : 0

            keyIsDown(39) ? world.pos.x-=20 : 0
            keyIsDown(37) ? world.pos.x+=20 : 0

            keyIsDown(40) ? world.pos.y-=20 : 0
            keyIsDown(38) ? world.pos.y+=20 : 0

            keyIsDown(32) ? shoot(0) : 0
            keyIsDown(48) ? shoot(1) : 0
        }

        function keyPressed(){

            console.log(keyCode)
            //if(keyCode == 32) move = !move
            if(keyCode == 49 ) shoot(1)

            if(keyCode == 39 ) world.pos.x+=20
            if(keyCode == 37 ) world.pos.x-=20

            if(keyCode == 38 ) world.pos.y+=20
            if(keyCode == 40 ) world.pos.y-=20
        }
    </script>
</body>

</html>