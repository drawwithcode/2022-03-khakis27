// Lucas Araujo @LucasLuquineas
// 7 de Outubro, 2021

var cam;
var botao;
var fotografia;
var fotosTiradas = 0;
var titulo;

//Parâmetros de Red Pixel 🔴
var redX = 0;
var redY = 0;
var aperteiRed1 = false;
var aperteiRed2 = false;
var palpiteRedX = 0;
var palpiteRedY = 0;
let redTargetR = 255;
let redTargetG = 0;
let redTargetB = 0;
var pontosRed = 0;
let menorDiferencaRed = 255;

//Parâmetros de Green Pixel 🟢
var greenX = 0;
var greenY = 0;
var aperteiGreen1 = false;
var aperteiGreen2 = false;
var palpiteGreenX = 0;
var palpiteGreenY = 0;
let greenTargetR = 0;
let greenTargetG = 255;
let greenTargetB = 0;
var pontosGreen = 0;
let menorDiferencaGreen = 255;

//Parâmetros de Blue Pixel 🔵
var blueX = 0;
var blueY = 0;
var aperteiBlue1 = false;
var aperteiBlue2 = false;
var palpiteBlueX = 0;
var palpiteBlueY = 0;
let blueTargetR = 0;
let blueTargetG = 0;
let blueTargetB = 255;
var pontosBlue = 0;
let menorDiferencaBlue = 255;

var pontos = 0;

function setup() {
  createCanvas(700, 900);
  background("#2C2C2C");
  cam = createCapture(VIDEO);
  cam.size(640, 480);
  cam.position(30, 210);
  cam.hide();
  titulo = loadImage("RGBest.png");

  //Botão de dar Palpite para o pixel Red 🔴
  botaoPalpiteRed = createButton("Clicca qui e scegli il punto più ROSSO");
  botaoPalpiteRed.style("font-weight", "bold");
  botaoPalpiteRed.style("color", "white");
  botaoPalpiteRed.style("font-weight", "500");
  botaoPalpiteRed.style("background-color", "indianred");
  botaoPalpiteRed.style("border", "0px");
  botaoPalpiteRed.mouseClicked(Avermelhar);
  botaoPalpiteRed.size(640, 50);
  botaoPalpiteRed.position(30, 30);

  //Botão de dar Palpite para o pixel Green 🟢
  botaoPalpiteGreen = createButton("Clicca qui e scegli il punto più VERDE");
  botaoPalpiteGreen.style("font-weight", "bold");
  botaoPalpiteGreen.style("color", "white");
  botaoPalpiteGreen.style("font-weight", "500");
  botaoPalpiteGreen.style("background-color", "seagreen");
  botaoPalpiteGreen.style("border", "0px");
  botaoPalpiteGreen.mouseClicked(Esverdear);
  botaoPalpiteGreen.size(640, 50);
  botaoPalpiteGreen.position(30, 90);

  //Botão de dar Palpite para o pixel Blue 🔵
  botaoPalpiteBlue = createButton("Clicca qui e scegli il punto più BLU");
  botaoPalpiteBlue.style("font-weight", "bold");
  botaoPalpiteBlue.style("color", "white");
  botaoPalpiteBlue.style("font-weight", "500");
  botaoPalpiteBlue.style("background-color", "dodgerblue");
  botaoPalpiteBlue.style("border", "3px solid #1E90FF");
  botaoPalpiteBlue.mouseClicked(Azular);
  botaoPalpiteBlue.size(640, 50);
  botaoPalpiteBlue.position(30, 150);

  //Botão de descobrir os Pixels mais RGB 🔴🟢🔵
  botaoMelhorRed = createButton("SCOPRI SE È GIUSTO");
  botaoMelhorRed.style("color", "black");
  botaoMelhorRed.style("font-weight", "700");
  botaoMelhorRed.style("background-color", "#f2f2f2");
  botaoMelhorRed.style("border", "3px solid #f2f2f2");
  botaoMelhorRed.mouseClicked(Calcular);
  botaoMelhorRed.size(430, 80);
  botaoMelhorRed.position(30, 705);

  //Botão de Resetar e Limpar palpites
  botaoReset = createButton("RESET");
  botaoReset.style("color", "black");
  botaoReset.style("font-weight", "700");
  botaoReset.style("background-color", "#868686");
  botaoReset.style("border", "3px solid #868686");
  botaoReset.mouseClicked(Resetar);
  botaoReset.size(430, 80);
  botaoReset.position(30, 790);
}

function Calcular() {
  if (aperteiRed2 == true && aperteiBlue2 == true && aperteiGreen2 == true) {
    fotografia = cam.get();
    fotografia.loadPixels();
    cam.stop();

    aperteiRed1 = false;
    aperteiGreen1 = false;
    aperteiBlue1 = false;
    fotosTiradas = 1;
  }
}

function Avermelhar() {
  aperteiRed1 = true;
  aperteiBlue1 = false;
  aperteiGreen1 = false;
}

function Esverdear() {
  aperteiGreen1 = true;
  aperteiRed1 = false;
  aperteiBlue1 = false;
}

function Azular() {
  aperteiBlue1 = true;
  aperteiRed1 = false;
  aperteiGreen1 = false;
}

function Resetar() {
  cam.play();
  fotosTiradas = 0;
  pontos = 0;
  
  aperteiRed1 = false;
  aperteiRed2 = false;
  aperteiGreen1 = false;
  aperteiGreen2 = false;
  aperteiBlue1 = false;
  aperteiBlue2 = false;
  palpiteRedX = 0;
  palpiteRedY = 0;
  palpiteGreenX = 0;
  palpiteGreenY = 0;
  palpiteBlueX = 0;
  palpiteBlueY = 0;
}

function mousePressed() {
  if (aperteiRed1 == true && mouseX >= 30 && mouseX <= 670 && mouseY >= 210 && mouseY <= 690) {
    aperteiRed2 = true;
    palpiteRedX = mouseX;
    palpiteRedY = mouseY;
  }

  if (aperteiGreen1 == true && mouseX >= 30 && mouseX <= 670 && mouseY >= 210 && mouseY <= 690) {
    aperteiGreen2 = true;
    palpiteGreenX = mouseX;
    palpiteGreenY = mouseY;
  }

  if (aperteiBlue1 == true && mouseX >= 30 && mouseX <= 670 && mouseY >= 210 && mouseY <= 690) {
    aperteiBlue2 = true;
    palpiteBlueX = mouseX;
    palpiteBlueY = mouseY;
  }
}

function draw() {
  //Mostrando a câmera
  cam.loadPixels();

  //Retângulos para evitar o mouse deixando rastro no menu + Título
  fill("#2c2c2c");
  noStroke();
  rect(0, 0, 700, 210);
  rect(0, 690, 700, 210);
  rect(0, 0, 30, 900);
  rect(670, 0, 30, 900);
  image(titulo, 103, 26);

  if (fotosTiradas == 0) {
    image(cam, 30, 210, 640, 480);
    
    //PUNTEGGIO do jogador
    fill(0);
    noStroke();
    rect(470, 705, 200, 170);
  
    fill("#868686");
    textSize(16);
    textStyle(BOLD);
    text("PUNTEGGIO", 490, 735);
  
    fill(255);
    textSize(46);
    textStyle(BOLD);
    text(pontos, 490, 780);
  
    fill(255, 255, 255, 128);
    textSize(24);
    textStyle(NORMAL);
    text("/100", 550, 780);
  }
  
  else if (fotosTiradas == 1) {
    image(fotografia, 30, 210, 640, 480);
    
    //PUNTEGGIO do jogador
    fill(0);
    noStroke();
    rect(470, 705, 160, 170, 10, 10, 10, 10);
  
    fill("#868686");
    textSize(16);
    textStyle(BOLD);
    text("PUNTEGGIO", 490, 735);
  
    fill(255);
    textSize(46);
    textStyle(BOLD);
    text(pontos, 490, 780);
  
    fill(255, 255, 255, 128);
    textSize(24);
    textStyle(NORMAL);
    text("/100", 550, 780);
    
    
    for (var x = 0; x <= fotografia.width; x += 5) {
      for (var y = 0; y <= fotografia.height; y += 5) {
        //Coleta de todos os pixels da câmera em uma variável
        var pixels = fotografia.get(x, y);

        //Definindo as variáveis de Pixel
        var pixelRed = red(pixels);
        var pixelGreen = green(pixels);
        var pixelBlue = blue(pixels);

        //Descobrindo e registrando o melhor pixel RED
        if (aperteiRed2 == true) {
          var diffRed =
            (abs(pixelRed - redTargetR) +
            abs(pixelGreen - redTargetG) +
            abs(pixelBlue - redTargetB)) /
            3;
          if (diffRed <= menorDiferencaRed) {
            menorDiferencaRed = diffRed;
            melhorRedX = x+30;
            melhorRedY = y+210;
          }
        }
        
        //Descobrindo e registrando o melhor pixel GREEN
        if (aperteiGreen2 == true) {
          var diffGreen =
            (abs(pixelRed - greenTargetR) +
            abs(pixelGreen - greenTargetG) +
            abs(pixelBlue - greenTargetB)) /
            3;
          if (diffGreen <= menorDiferencaGreen) {
            menorDiferencaGreen = diffGreen;
            melhorGreenX = x+30;
            melhorGreenY = y+210;
          }
        }
        
        //Descobrindo e registrando o melhor pixel BLUE
        if (aperteiBlue2 == true) {
          var diffBlue =
            (abs(pixelRed - blueTargetR) +
            abs(pixelGreen - blueTargetG) +
            abs(pixelBlue - blueTargetB)) /
            3;
          if (diffBlue <= menorDiferencaBlue) {
            menorDiferencaBlue = diffBlue;
            melhorBlueX = x+30;
            melhorBlueY = y+210;
          }
        }
      }
    }
    //Exibindo o pixel mais RED🔴
    fill(197, 82, 83, 128);
    ellipse(melhorRedX, melhorRedY, 50, 50);

    //Outline preto encima do outline outro
    strokeWeight(9);
    stroke("white");
    line(melhorRedX, melhorRedY, palpiteRedX, palpiteRedY);

    //Fazendo distância entre Palpite e Melhor
    strokeWeight(5);
    stroke(197, 82, 83);
    line(melhorRedX, melhorRedY, palpiteRedX, palpiteRedY);

    //Calcula a distância entre o Palpite e o RISULTATO
    var pontosDistRed = dist(melhorRedX, melhorRedY, palpiteRedX, palpiteRedY);
    pontosRed = 100 - int(map(pontosDistRed, 0, 800, 0, 100));

    //Label pixel Red RISULTATO
    noStroke();
    textStyle(BOLD);
    fill(0);
    rect(melhorRedX - 40, melhorRedY - 45, 81, 20, 10, 10, 10, 10);
    fill(255);
    textSize(12);
    text("RISULTATO", melhorRedX - 35, melhorRedY - 30);

    //Label pixel Palpite Red
    noStroke();
    textStyle(BOLD);
    fill(0);
    rect(palpiteRedX - 40, palpiteRedY - 45, 88, 20, 10, 10, 10, 10);
    fill(255);
    textSize(12);
    text("SCELTA", palpiteRedX - 35, palpiteRedY - 30);    
    
    //Exibindo o pixel mais GREEN🟢
    fill(43, 127, 80, 128);
    ellipse(melhorGreenX, melhorGreenY, 50, 50);

    //Outline preto encima do outline outro
    strokeWeight(9);
    stroke("white");
    line(melhorGreenX, melhorGreenY, palpiteGreenX, palpiteGreenY);

    //Fazendo distância entre Palpite e Melhor
    strokeWeight(5);
    stroke(43, 127, 80);
    line(melhorGreenX, melhorGreenY, palpiteGreenX, palpiteGreenY);

    //Calcula a distância entre o Palpite e o RISULTATO
    var pontosDistGreen = dist(melhorGreenX, melhorGreenY, palpiteGreenX, palpiteGreenY);
    pontosGreen = 100 - int((map(pontosDistGreen, 0, 800, 0, 100)));

    //Label pixel Green RISULTATO
    noStroke();
    textStyle(BOLD);
    fill(0);
    rect(melhorGreenX-40, melhorGreenY-45, 81, 20, 10, 10, 10, 10);
    fill(255);
    textSize(12);
    text('RISULTATO', melhorGreenX-35, melhorGreenY-30);

    //Label pixel Palpite Green
    noStroke();
    textStyle(BOLD);
    fill(0);
    rect(palpiteGreenX-40, palpiteGreenY-45, 88, 20, 10, 10, 10, 10);
    fill(255);
    textSize(12);
    text('SCELTA', palpiteGreenX-35, palpiteGreenY-30);

    //Exibindo o pixel mais BLUE🔵
    fill(30, 133, 249, 128);
    ellipse(melhorBlueX, melhorBlueY, 50, 50);

    //Outline preto encima do outline outro
    strokeWeight(9);
    stroke("white");
    line(melhorBlueX, melhorBlueY, palpiteBlueX, palpiteBlueY);

    //Fazendo distância entre Palpite e Melhor
    strokeWeight(5);
    stroke(30, 133, 249);
    line(melhorBlueX, melhorBlueY, palpiteBlueX, palpiteBlueY);

    //Calcula a distância entre o Palpite e o RISULTATO
    var pontosDistBlue = dist(melhorBlueX, melhorBlueY, palpiteBlueX, palpiteBlueY);
    pontosBlue = 100 - int((map(pontosDistBlue, 0, 800, 0, 100)));

    //Label pixel Red RISULTATO
    noStroke();
    textStyle(BOLD);
    fill(0);
    rect(melhorBlueX-40, melhorBlueY-45, 81, 20, 10, 10, 10, 10);
    fill(255);
    textSize(12);
    text('RISULTATO', melhorBlueX-35, melhorBlueY-30);

    //Label pixel Palpite Blue
    noStroke();
    textStyle(BOLD);
    fill(0);
    rect(palpiteBlueX-40, palpiteBlueY-45, 88, 20, 10, 10, 10, 10);
    fill(255);
    textSize(12);
    text('SCELTA', palpiteBlueX-35, palpiteBlueY-30);

    fotosTiradas++;
  }

  if (fotosTiradas >= 2) {
    cam.stop();
    
    //Score GERAL
    fill(0);
    noStroke();
    rect(470, 705, 160, 170);
  
    fill("#868686");
    textSize(16);
    textStyle(BOLD);
    text("PUNTEGGIO", 490, 735);
  
    pontos = int((pontosRed + pontosGreen + pontosBlue)/3);
    fill(255);
    textSize(40);
    textStyle(BOLD);
    text(pontos, 490, 780);
  
    fill(255, 255, 255, 128);
    textSize(24);
    textStyle(NORMAL);
    text("/100", 550, 780);
    
    //Score RED    
    fill("indianred");
    textSize(14);
    textStyle(BOLD);
    text("RED", 490, 804);

    fill("indianred");
    textSize(18);
    textStyle(BOLD);
    text(pontosRed, 548, 804);

    fill(138,57,58);
    textSize(18);
    textStyle(NORMAL);
    text("/100", 578, 804);
    
    //Score GREEN
    fill("seagreen");
    textSize(14);
    textStyle(BOLD);
    text("GREEN", 490, 828);
    
    fill("seagreen");
    textSize(18);
    textStyle(BOLD);
    text(pontosGreen, 548, 828);

    fill(30,89,56);
    textSize(18);
    textStyle(NORMAL);
    text("/100", 578, 828);
    
    //Score BLUE
    fill("dodgerblue");
    textSize(14);
    textStyle(BOLD);
    text("BLUE", 490, 852);
    
    fill("dodgerblue");
    textSize(18);
    textStyle(BOLD);
    text(pontosBlue, 548, 852);

    fill(21,93,174);
    textSize(18);
    textStyle(NORMAL);
    text("/100", 575, 852);
  }

  //Gerando círculo RED no mouse
  if (aperteiRed1 == true) {
    aperteiGreen1 = false;
    aperteiBlue1 = false;
    fill(197, 82, 83, 128);
    ellipse(mouseX, mouseY, 50, 50);
  }

  //Gerando círculo GREEN🟢 no mouse
  if (aperteiGreen1 == true) {
    aperteiRed1 = false;
    aperteiBlue1 = false;
    fill(43, 127, 80, 128);
    ellipse(mouseX, mouseY, 50, 50);
  }

  //Gerando círculo BLUE🔵 no mouse
  if (aperteiBlue1 == true) {
    aperteiRed1 = false;
    aperteiGreen1 = false;
    fill(30, 133, 249, 128);
    ellipse(mouseX, mouseY, 50, 50);
  }

  //Exibindo o palpite RED🔴
  if (aperteiRed2 == true) {
    stroke(197, 82, 83, 128);
    noFill();
    strokeWeight(5);
    ellipse(palpiteRedX, palpiteRedY, 50, 50);
  }

  //Exibindo o palpite GREEN🟢
  if (aperteiGreen2 == true) {
    stroke(43, 127, 80, 128);
    noFill();
    strokeWeight(5);
    ellipse(palpiteGreenX, palpiteGreenY, 50, 50);
  }

  //Exibindo o palpite BLUE🔵
  if (aperteiBlue2 == true) {
    stroke(30, 133, 249, 128);
    noFill();
    strokeWeight(5);
    ellipse(palpiteBlueX, palpiteBlueY, 50, 50);
  }
}