<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            padding: 0;
            margin: 0;
        }
    </style>
    <script src="p5.min.js"></script>
    <script src="static.class.js?v=<?=rand(1,10000)?>"></script>
    <script src="game.class.js?v=<?=rand(1,10000)?>"></script>
    <script src="game.config.js?v=<?=rand(1,10000)?>"></script>
    
</head>

<body>
    <script>
        
        let bullets = []
        let enemies = []
        let player
        let gameBackground = []
        function preload(){
            gameBackground.push(loadImage('image/background01.jpg'))
            gameBackground.push(loadImage('image/background01.jpg'))
            gameBackground.push(loadImage('image/background02.jpg'))
            gameBackground.push(loadImage('image/background03.jpg'))
            gameBackground.push(loadImage('image/background04.jpg'))
            gameBackground.push(loadImage('image/background02.jpg'))
            gameBackground.push(loadImage('image/background04.jpg'))
        }
        function setup() {
            createCanvas(windowWidth, windowHeight-5)
            
            player = new playerEntity()
        }
        function draw() {
            
            //background(gameBackground[0])
            let bgI = gameBackground[player.level]
            let bgW = bgI.width
            let bgH = bgI.height
            for(h = 0; h < height/bgH; h++){
                for(w = 0; w < width/bgW; w++){
                    image(bgI,bgW*w,bgH*h)
                }
            }
            
            //console.log(gameBackground[0])
            textUI()
            level(player.level)

            if(enemies.length === 0){//If Level Completed -> proceed to next level
                
                let levelConfig = levels[player.level]

                for(a = 0; a < levelConfig.enemy.length; a++){
                    let count = levelConfig.enemy[a].count
                    let color = levelConfig.enemy[a].type.color
                    let speed = levelConfig.enemy[a].type.speed
                    let health = levelConfig.enemy[a].type.health
                    let size = levelConfig.enemy[a].type.size
                    player.bullet = levelConfig.player.bullet

                    for(i = 0; i < count; i++){
                        let enemyPos = createVector(width/2,height/2)
                        enemyPos.add(p5.Vector.random2D().mult(random(500,1500)))
                        enemies.push(new enemy(enemyPos,createVector(width/2,height/2),random(speed),size,color,health))
                    }
                }
                
                player.level++ //Increment Level
            }
            
            bullets.forEach((b,i) => {
                b.show()
                if(b.outRange()){
                    bullets.splice(i,1)
                }
            })

            enemies.forEach((e,i) => {
                e.show(enemies,i)
                var [hits,index,swag] = e.bulletHit(bullets)
                if(hits){
                    if(e.health > 0){
                        e.health--
                    }
                    if(e.health == 0){
                        player.score++
                        enemies.splice(i,1)
                    }
                    bullets.splice(index,1)
                }
                if(player.hit(e)){
                    player.life--
                    enemies.splice(i,1)
                }
                if(swag.length){
                    let enemyPos = createVector(width/2,height/2)
                    enemyPos.add(p5.Vector.random2D().mult(random(300)))
                    //e.target = enemyPos
                }
            })
            translate(width/2,height/2)
            player.show()
            shoot()
        }

        function shoot(){
            var canshoot = (millis() - player.lastshot)
            if(canshoot < 100){
                return
            }
            player.lastshot = millis()
            if(player.bullet > bullets.length){
                let mouse = createVector(mouseX,mouseY)
                bullets.push(new bullet(createVector(width/2,height/2),mouse,20,50,'YELLOW'))
            }
        }

        function mouseClicked(){
            //enemies[0].target = createVector(mouseX,mouseY)
            var canshoot = (millis() - player.lastshot)
            console.log(canshoot)
            if(canshoot < 500){
                return
            }
            player.lastshot = millis()
            shoot()
        }

        function mouseDragged(){
            var canshoot = (millis() - player.lastshot)
            console.log(canshoot)
            if(canshoot < 500){
                return
            }
            player.lastshot = millis()
            shoot()
        }

        function keyPressed() {
            console.log(keyCode)
            if (keyCode === 32) {
                shoot()
            }
        }

        function textUI(){
            textSize(20);
            fill('YELLOW')
            noStroke()
            textAlign(LEFT)
            text(`Score ${player.score}  Bullet ${player.bullet - bullets.length}`, 10, 20);
            text(`Enemy ${enemies.length}`, 10, 40);
            textAlign(RIGHT)
            text(`Life ${player.life}`, width-10, 20);
        }

        function level(level){
            textAlign(CENTER)
            text(`Level ${level}`, width/2, height-20);
        }

    </script>

</body>

</html>