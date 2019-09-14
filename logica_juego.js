var canvas=document.getElementById("canvas");
var lienzo=canvas.getContext("2d");

var temporizador=0;
 
var aux;

var partes_snake=[];

var direccion_x={
    estado:" "
}

var direccion_y={
    estado:" "
}

var alimento_snake={
    x:100,
    y:100,
    width:25,
    height:25,
    estado:"existe"
}

var contador_comida={
    contador:0
}

var juego={
    estado:"menu"
}

var indicador_menu=0;

var teclado=[];

var fondo=new Image();

var menu=new Image();

var contador_snake=0;

function loadGame() {

    fondo.src="fondo.png";
    menu.src="menu.png";

    menu.addEventListener("load",function () {
        var intervalo=setInterval(frameLoop,1000/20);
    });

}

function EventoTeclado() {

    document.addEventListener("keydown",function (e) {
        teclado[e.keyCode]=true;
    },false);
    document.addEventListener("keyup",function (e) {
        teclado[e.keyCode]=false;       
    },false);

}

function dibujarFondo() {

    if(juego.estado=="menu"){
        lienzo.drawImage(menu,0,0,800,500);
    }else{
        lienzo.drawImage(fondo,0,0,800,500);
    }

}

function dibujarAlimento_snake() {

    if(juego.estado!="game_over" && juego.estado!="menu"){
        if(alimento_snake.estado=="existe"){
        lienzo.save();
        lienzo.fillStyle="red";
        lienzo.fillRect(alimento_snake.x,alimento_snake.y,alimento_snake.width,alimento_snake.height);
        lienzo.strokeStyle="black";
        lienzo.strokeRect(alimento_snake.x,alimento_snake.y,alimento_snake.width,alimento_snake.height);
        lienzo.restore();
        }else{  
                temporizador++;
                if(temporizador==20){
                    lienzo.save();
                    lienzo.fillStyle="red";
                    lienzo.fillRect(alimento_snake.x,alimento_snake.y,alimento_snake.width,alimento_snake.height);
                    lienzo.strokeStyle="black";
                    lienzo.strokeRect(alimento_snake.x,alimento_snake.y,alimento_snake.width,alimento_snake.height);
                    alimento_snake.estado="existe";
                    lienzo.restore();
                    temporizador=0;
                }
        }
    }

}
    

function mover_comida_snake() {

    if(temporizador==0 && alimento_snake.estado=="no_existe"){

        alimento_snake.x=aleatorio(100,650);
        alimento_snake.y=aleatorio(100,400);
    }

}

function dibujarSnake() {

    if(juego.estado!="menu"){
        lienzo.save();
    
        for(var i in partes_snake){
            var parte_snake=partes_snake[i];
            if(i==0){
                lienzo.fillStyle="white";
            }else{
                lienzo.fillStyle="black";
            }
            lienzo.fillRect(parte_snake.x,parte_snake.y,parte_snake.width,parte_snake.height);
            lienzo.strokeStyle="red";
            lienzo.strokeRect(parte_snake.x,parte_snake.y,parte_snake.width,parte_snake.height);
        }
        lienzo.restore();
    }

}

function moverSnake() {

    if(juego.estado=="iniciando"){

        crearSnake();
        juego.estado="jugando";

    }

    if(juego.estado=="jugando"){

        if(teclado[39] && partes_snake[0].x<=750){

            aux=partes_snake.length-1;
                    while(aux>=0){
                        
                        if(aux==0){
                            partes_snake[aux].x=partes_snake[aux+1].x+partes_snake[aux+1].width;
                            partes_snake[aux].y=partes_snake[aux+1].y;
                        }else{
                            partes_snake[aux].x=partes_snake[aux-1].x;
                            partes_snake[aux].y=partes_snake[aux-1].y;
                        }

                        aux--;
                    }

                
        }

        if(teclado[37] && partes_snake[0].x>=40 ){

            aux=partes_snake.length-1;
                    while(aux>=0){
                        
                        if(aux==0){
                            partes_snake[aux].x=partes_snake[aux+1].x-partes_snake[aux+1].width;
                            partes_snake[aux].y=partes_snake[aux+1].y;
                        }else{
                            partes_snake[aux].x=partes_snake[aux-1].x;
                            partes_snake[aux].y=partes_snake[aux-1].y;
                        }

                        aux--;
                    }
        }

        if(teclado[38] && partes_snake[0].y>=50){
            aux=partes_snake.length-1;
                    while(aux>=0){
                        
                        if(aux==0){
                            partes_snake[aux].x=partes_snake[aux+1].x;
                            partes_snake[aux].y=partes_snake[aux+1].y-partes_snake[aux+1].height;
                        }else{
                            partes_snake[aux].x=partes_snake[aux-1].x;
                            partes_snake[aux].y=partes_snake[aux-1].y;
                        }

                        aux--;
                    }
        }

        if(teclado[40] && partes_snake[0].y<=440){
            aux=partes_snake.length-1;
                    while(aux>=0){
                        
                        if(aux==0){
                            partes_snake[aux].x=partes_snake[aux+1].x;
                            partes_snake[aux].y=partes_snake[aux+1].y+partes_snake[aux+1].height;
                        }else{
                            partes_snake[aux].x=partes_snake[aux-1].x;
                            partes_snake[aux].y=partes_snake[aux-1].y;
                        }

                        aux--;
                    }
        }

    }

}


function verificar_contacto_snake_alimento() {

    var c=0;
    var parte_snake=partes_snake[0];
    if(hit(alimento_snake,parte_snake) && alimento_snake.estado=="existe"){
        console.log("contacto0");
        alimento_snake.estado="no_existe";
        if(c==0){
            crecer_snake();
            c=1;
        }
        contador_comida.contador++;
    }

}

function verificar_contacto_cuerpo_snake(){

    for(var i=3;i<partes_snake.length;i++){
        var parte_snake=partes_snake[i];
        if(hit(parte_snake,partes_snake[0])){
            console.log("contacto2");
            juego.estado="game_over";
        }
    }

}

function verificar_contacto_bordes(){

    if(partes_snake[0].x>=750){
        console.log("contacto bordes 1");
        juego.estado="game_over";
    }
    if(partes_snake[0].x<=20){
        console.log("contacto bordes 2");
        juego.estado="game_over";
    }
    if(partes_snake[0].y>=450){
        console.log("contacto bordes 3");
        juego.estado="game_over";
    }
    if(partes_snake[0].y<=50){
        console.log("contacto bordes 4");
        juego.estado="game_over";
    }

}

function hit(a,b) {

    var hit=false;

    if(b.x+b.width>=a.x && b.x<a.x+a.width){
        if(b.y+b.height>=a.y && b.y<=a.y+a.height){
            hit=true;
       }
    }
    if(b.x<=a.x && b.x+b.width>=a.x+a.width){
        if(b.y<=a.y && b.y+b.height>=a.y+a.height){
            hit=true;
        }
    }
     if(a.x<=b.x && a.x+a.width>=b.x+b.width){
        if(a.y<=b.y && a.y+a.height>=b.y+b.height){
            hit=true;
        }
    }
    
    return hit;

}


function aleatorio(inferior,superior) {

    var posibilidades=superior-inferior;

    var a=Math.random()*posibilidades;
    a=Math.floor(a);

    return parseInt(inferior)+a;

}

function crearSnake() {

    for(var i=0;i<6;i++){
        partes_snake.push({
            x:400,
            y:200+20*i,
            width:20,
            height:20
        });
    }

}

function crecer_snake() {

    var longitud=partes_snake.length;
    partes_snake.push({
            x:partes_snake[longitud-1].x,
            y:partes_snake[longitud-1].y+partes_snake[longitud-1].height,
            width:20,
            height:20
    });

}

function texto_contador_comidas() {

    if(juego.estado!="menu"){
        var texto_contador_comida=contador_comida.contador;
        lienzo.save();
        lienzo.fillStyle="yellow";
        lienzo.font="Bold 20pt Arial";
        lienzo.fillText("Puntos: "+texto_contador_comida.toString(),600,100);
        lienzo.restore();
    }

}

function pantalla_principal() {

    if(teclado[82]){
        juego.estado="iniciando";
        indicador_menu=1;
    }
    
}

function frameLoop() {

    if(indicador_menu==0){
        pantalla_principal();
    }
    moverSnake();
    mover_comida_snake();
    dibujarFondo();
    dibujarAlimento_snake();
    dibujarSnake();
    texto_contador_comidas();
    verificar_contacto_snake_alimento();
    verificar_contacto_cuerpo_snake();
    verificar_contacto_bordes();
    gestor_games_over();
    
}

EventoTeclado();
loadGame();