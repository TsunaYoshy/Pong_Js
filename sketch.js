// Variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

// Valocidade de movimento da bolinha nos eixos X e Y
let veloXBolinha = 6;
let veloYBolinha = 6;
let colidiu = false;

// Variáveis da raquete
let xRaquete = 2;
let yRaquete = 150;
let comprimentoRaquete = 15;
let alturaRaquete = 95;

// Variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

// Variavéis do placar
let meusPontos = 0;
let pontosOponente = 0;
let posicaoXPlacar = 155;
let posicaoYPlacar = 26;
let posicaoXPlacarOp = 450;
let posicaoYPlacarOp = 26;

// Variavéis responsáveis pelo som
let raquetada;
let ponto;
let pontoOp;
let trilha;


function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  pontoOp = loadSound("Meu Deus ajuda.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0, 100, 0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete();
  mostraRaqueteOponente(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  movimentaRaqueteOponente();
  verificaColisaoRaqueteBiblioteca(xRaquete, yRaquete);
  verificaColisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  // Coordenadas da bolinha
  fill ("white");
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  // Movimento da Bolinha nas coordenadas indicadas
  xBolinha += veloXBolinha;
  yBolinha -= veloYBolinha;
  //console.log(xBolinha, yBolinha); Verifica as posições da bolinha.
}

function verificaColisaoBorda(){
  //Verificando colisões da bolinha para os eixos X e Y
  if (xBolinha + raio > width || xBolinha - raio < 0){
    veloXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0){
    veloYBolinha *= -1;
  }
}

function mostraRaquete(){
  fill("white");
  rect(xRaquete, yRaquete, comprimentoRaquete, alturaRaquete);
}

function mostraRaqueteOponente(x, y){
  //Exibe a raquete do oponente
  stroke("black");
  fill("black");
  rect(x, y, comprimentoRaquete, alturaRaquete);
}

function movimentaMinhaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function movimentaRaqueteOponente(){
  //movimenta a raquete oponente
  velocidadeYRaqueteOponente = yBolinha - yRaqueteOponente - comprimentoRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYRaqueteOponente + chanceDeErrar;
  calculaChanceDeErrar();
}

function verificaColisaoRaqueteBiblioteca(x, y){
   colidiu = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
    if(colidiu){
      veloXBolinha *= -1;
      raquetada.play();
    }
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color(255, 140, 0));
  rect(135, 10, 40, 20);
  fill(255);
  text(meusPontos, posicaoXPlacar, posicaoYPlacar);
  fill(color(255, 140, 0));
  rect(430, 10, 40, 20);
  fill(255);
  text(pontosOponente, posicaoXPlacarOp, posicaoYPlacarOp);
  }

function marcaPonto(){
  if(xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha < 10){
    pontosOponente += 1;
    pontoOp.play();
  }
}

function calculaChanceDeErrar(){
  if(pontosOponente >= meusPontos){
    chanceDeErrar += 1;
    if(chanceDeErrar >= 39){
      chnaceDeErrar = 40;
    } 
  } else{
    chanceDeErrar -= 1;
    if (chanceDeErrar <= 35){
      chanceDeErrar = 35;
    }
  }
}

function fixStuckBall(){
    if (xBolinha - raio < 6){
    xBolinha = 23;
    }
}
