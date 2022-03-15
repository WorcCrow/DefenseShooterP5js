<?php
    include('collect.php');
?>

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
    
    <script src="game.class.js?v=<?=rand(1,10000)?>"></script>
    <script src="player.class.js?v=<?=rand(1,10000)?>"></script>
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
        let player
        let bullet = []
        let enemy = []

        let isLoaded = false

        let spaceBg,spaceBg0 

        let enemyShip = []

        function preload(){
            playerImg = loadImage('image/spaceship.png')
            spaceBg = loadImage('image/spacebg.jpg')
            spaceBg0 = loadImage('image/spacebg0.jpg')
        }

        function setup(){
            createCanvas(windowWidth,windowHeight)
            
            game = new Game()
            game.setup()


            world = new WorldEntity(createVector(0,0),3840/2,2160/2,500,'BLUE')
            player = new PlayerEntity(createVector(windowWidth/2,windowHeight/2),world)
            world.center = createVector((-world.width/2)+player.pos.x,(-world.height/2)+player.pos.y)
            world.pos = createVector(world.center.x, world.center.y)

            let pos = createVector(0, 0)
            let facing = createVector(player.pos.x,player.pos.y)
            
            reset()

            isLoaded = true
        }

        function reset(){
            player.gameover = false
            player.health = 20
            game.score = player.kill
            player.kill = 0
            enemy = []
            for(let i = 0; i < 15; i++){
                let start = player.worldpos()
                let randVel = p5.Vector.random2D()
                randVel.setMag(random(width/2,width))
                start.add(randVel)

                enemy.push(new EnemyEntity(start,createVector(0,0),1,world))
            }
        }

        

        function draw(){
            background(0)
            image(spaceBg0,0,0,width)
        
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

            if(player.gameover){
                game.setScreen('gameover')
                player.gameover = false
                player.health = 20
                game.score = player.kill
                player.kill = 0
            }

            world.show()

            if(move){
                world.update(player.direction(mouseX,mouseY))
            }

            let isEdge = player.edge()
            if(isEdge){
                world.pos = createVector(world.center.x, world.center.y)
            }
            
            bullet.forEach((b,i) => {
                b.update()
                b.show()
                b.outOfRange(bullet,i)
            })

            
            enemy.forEach((e,i) => {
                e.isHit(player,bullet,enemy,i)
                e.isPlayerHit(player,enemy,i)
                
                let target = createVector(player.pos.x,player.pos.y)
                let myPos = e.myPos()
               
                target.sub(myPos)
                e.vel = target

                if(move){
                    e.update()
                }
                e.show()
            })
            fill(255)
            
            fill([0,255,100])
            
            player.show()
            game.show_hud(player,enemy)
            
            checkKeyDown()
        }

        function mouseClicked(){
            player.rush.activate = true

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
            angleMode(DEGREES)
            let direction = player.direction(mouseX,mouseY)
            if(type == 2){
                direction.rotate((random(-10,10)))
            }
            bullet.push(new ProjectileEntity(player.worldpos(),direction,world))
        }

        function checkKeyDown(){
            keyIsDown(65) ? console.log('23') : 0

            keyIsDown(39) ? world.pos.x-=20 : 0
            keyIsDown(37) ? world.pos.x+=20 : 0

            keyIsDown(40) ? world.pos.y-=20 : 0
            keyIsDown(38) ? world.pos.y+=20 : 0

            keyIsDown(32) ? shoot(0) : 0
            keyIsDown(48) ? shoot(1) : 0
            keyIsDown(49) ? shoot(2) : 0
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