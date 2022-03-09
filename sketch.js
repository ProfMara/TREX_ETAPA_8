//PASSO 1 CRIAR AS VARIÁVEIS
var solo, soloimagem, soloinvisivel;
var trex, trex_correndo;
var nuvemIMG, ponto = 0;
var o1, o2, o3, o4, o5, o6;

var grupoCacto;
var JOGAR = 1;
var FIM = 0;
var estadoDeJogo = JOGAR;
var colidido;
var gameOver, gameOverImagem, restartImagem, restart;
var colidido;

function preload() {
    //carregar a imagem do solo
    soloimagem = loadImage("solo.png");
    gameOverImagem = loadImage("gameOver.png");
    restartImagem = loadImage("restart.png");
    colidido = loadAnimation("trex_colidido.png");
    //carregar a animação do t-rex
    trex_correndo = loadAnimation("trex1.png", "trex2.png", "trex3.png");

    nuvemIMG = loadImage("nuvem.png");

    o1 = loadImage("obstaculo1.png");
    o2 = loadImage("obstaculo2.png");
    o3 = loadImage("obstaculo3.png");
    o4 = loadImage("obstaculo4.png");
    o5 = loadImage("obstaculo5.png");
    o6 = loadImage("obstaculo6.png");

}

function setup() {

    createCanvas(600, 200);
    //criar a sprite solo;
    solo = createSprite(300, 190, 600, 20);
    //adicionar a imagem para a sprite
    solo.addImage(soloimagem);
    //dar velocidade ao solo
    solo.velocityX = -3;

    gameOver = createSprite(300, 100);
    gameOver.addImage(gameOverImagem);
    gameOver.scale = 0.5;

    restart = createSprite(300, 130);
    restart.addImage(restartImagem);
    restart.scale = 0.5;
    soloinvisivel = createSprite(300, 195, 600, 5);
    soloinvisivel.visible = false;

    //criar a sprite trex;
    trex = createSprite(50, 180, 50, 50);
    //adicionar a animação na sprite do t-rex
    trex.addAnimation("trex correndo", trex_correndo);
    trex.addAnimation("colidido", colidido);
    //definir o tamanho da animação
    trex.scale = 0.5;
    //definir o colisor do trex
    trex.setCollider("circle", 0, 0, 50);
    trex.debug = true;

    grupoCacto = new Group();
    grupoNuvem = new Group();

}

function draw() {
    background("white");
    fill("black");
    text("Pontuação: " + ponto, 450, 20);
    console.log(trex.lifetime);
    if (estadoDeJogo == JOGAR) {

        gameOver.visible = false;
        restart.visible = false;
        //pontuação
        ponto = Math.round(frameCount / 60);
        //velocidade ao solo 
        solo.velocityX = -4;

        //fazer o trex pular se apertar espaço
        if (keyDown("space") && trex.y > 140) {
            trex.velocityY = -10;
        }
        //reiniciar a posição do solo automaticamente
        if (solo.x < 0) {
            solo.x = solo.width / 2;
        }

        //gera cactos
        gerarCactos();
        //gera nuvens
        gerarNuvens();


        if (trex.isTouching(grupoCacto)) {
            estadoDeJogo = FIM;

        }
    }

    if (estadoDeJogo == FIM) {
        gameOver.visible = true;
        restart.visible = true;
        solo.velocityX = 0;
        trex.changeAnimation("colidido");

        grupoCacto.setVelocityXEach(0);
        grupoNuvem.setVelocityXEach(0);
        grupoCacto.setLifetimeEach(-1);
        grupoNuvem.setLifetimeEach(-1);

    }

    //dar gravidade ao trex
    trex.velocityY += 0.5;

    //impedir o trex de cair no abismo
    trex.collide(soloinvisivel);

    drawSprites();

}

function gerarNuvens() {

    if (frameCount % 60 == 0) {
        var y = Math.round(random(1, 100));
        var nuvem = createSprite(600, y, 50, 25);
        nuvem.velocityX = -3;
        nuvem.addImage(nuvemIMG);
        nuvem.scale = 0.5;
        nuvem.lifetime = 200;
        trex.depth = nuvem.depth + 1;
        grupoNuvem.add(nuvem);

    }
}


function gerarCactos() {

    if (frameCount % 60 == 0) {
        var o = Math.round(random(1, 6));
        var obs = createSprite(600, 175, 50, 25);
        obs.velocityX = solo.velocityX;

        switch (o) {
            case 1:
                obs.addImage(o1);
                break;
            case 2:
                obs.addImage(o2);
                break;
            case 3:
                obs.addImage(o3);
                break;
            case 4:
                obs.addImage(o4);
                break;
            case 5:
                obs.addImage(o5);
                break;
            case 6:
                obs.addImage(o6);
                break;
        }
        obs.scale = 0.4;
        obs.lifetime = 200;
        grupoCacto.add(obs)
    }
}