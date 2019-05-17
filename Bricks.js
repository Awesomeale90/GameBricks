


 
    
    //juego , convertir el canvas en objeto para poder trabajar con el.
    //definir variables

    var canvas = document.getElementById('game'); //guardamo referencia game en canvas
    var ctx= canvas.getContext("2d"); // lo haremos en 2d
    // añadimos variables para pelota
    //le damos un valor incicial a la pelota para que este abajo
    var x= canvas.width/2; //centro de imagen
    var y= canvas.height-30; //altura media 
    //incremento de el movimiento de la pelota, velocidad con la que se mueve cada diferencial de x dos pixeles mas, dos p. mas..etc
    var dx=2;
    var dy= -2;
    var ballRadio=10; //nueva var 
    //variables para pala
    var palaAlta=10;
    var palaAncha=75;
    var palaX=(canvas.width-palaAncha)/2; //position de pala para que quede en medio

    
    
    //  variables ladrillos

    var brickRowCount=3;
    var brickColumnCount=5;
    var brickAncho=75;
    var brickAlto=20;
    var brickPadding=10;
    var brickOffsetTop=30;
    var brickOffsetLeft=30;

        //variable del puntiacion
        var score=0;


        //variabble de las vidas del jugador
        var lives =3;




    var bricks= []; //generamos array vacio para los ladrillos

        for (c=0; c<brickColumnCount; c++){ //cuando empeize a contar 0 y que cuente hasta el numero de columnas incrementar en

        bricks[c]=[];

        for(r=0; r<brickRowCount; r++){
            bricks[c][r]={x:0, y:0, status:1}; //poner el estado del ladrillo 0 nos e ve 1 se ve
        }
     }   



    //variables teclado
    var pulsedrcha=false; //false suponiendo que no hay teclas pulsadas
    var pulselef=false;
    

     //eventos
    // dos variables para detectar cuando se pulsa una u otra tecla, capturadores de evento
    document.addEventListener("keydown",keyDownHandler,false); //propiedad que escucha un evento, espera 
    document.addEventListener("keyup",keyUpHandler,false);
    document.addEventListener("mousemove",mouseMoveHandler,false); // controlar hacer movimiento del mouse


    function mouseMoveHandler(e){
        var relativeX=e.clientX - canvas.offsetLeft //calcula posicion del cursor con respecto al canvas.
        if (relativeX>0 && relativeX<canvas.width){
            palaX=relativeX-palaAncha/2;
        }


    }
    
    //a que se produzca un determiando evento y si se produce hace algo. keydown cuando se pulsa la tecla y keyup cuando se suelta.






        //funciones

        // dos funciones por keydown y keyup
        function keyDownHandler(e){
            if(e.keyCode==39){ //39 flecha derecha
                pulsedrcha=true;
            } else if (e.keyCode==37){ //flecha izda
                pulselef=true;
            }

            

        }


        function keyUpHandler(e){
            if(e.keyCode==39){ //39 flecha derecha
                pulsedrcha=false;
            } else if (e.keyCode==37){ //flecha izda
                pulselef=false;
            }

            

        }






           // -----//funcion para detectar colisiones 

            function collisionDetention(){
                for(c=0; c< brickColumnCount;c++) { //incrementamos c
                    for(r=0; r<brickRowCount; r++){

                        var b=bricks[c][r];
                        if(b.status==1){
                            if (x>b.x  &&  x<b.x + brickAncho  &&  y<b.y  &&  y<b.y + brickAlto){

                                dy=-dy;
                                b.status=0; //aqui le decdimos que cambia el estado del ladrillo
                                score++;

                                if (score==brickRowCount*brickColumnCount){
                                    alert("GANASTE!!!"); //mensaje que sale a ganar la partida
                                    document.location.reload();
                                }// {}
                            }
                        }

                    }
                } 
                

            }






        function dibuball(){ //aqui va toda la funcion de la pelota, movimiento color todo
        ctx.beginPath();  //ctx por que es un circulo
        ctx.arc(x,y,ballRadio,0,2*Math.PI); //se cambio 50 y 50 por x e y se cambio 10 por ballradio
        ctx.fillStyle="#EC6CF2";
        ctx.fill();
        ctx.closePath;

        }



        //funcion pala
        function dibuPala(){
        ctx.beginPath();
        ctx.rect(palaX,canvas.height-palaAlta,palaAncha,palaAlta); //parametros de la pelota 
       
        ctx.fillStyle="#EC6CF2";
        ctx.fill();
        ctx.closePath();

        }





        //FUNCION LADRILLOS 

        function dibubricks(){
            for(c = 0; c < brickColumnCount ; c++){
                for (r = 0; r < brickRowCount; r++){
                    if(bricks[c][r].status==1){ //sibujar ladrillos sera cierto solo cuando el estado del ladrillo sea 1
                  
                        var brickX=(c * (brickAncho+brickPadding)) + brickOffsetLeft; //va dibujando fila por fila
                        var brickY = (r*(brickAlto + brickPadding)) + brickOffsetTop;
                        bricks[c][r].x=brickX;
                        bricks[c][r].y=brickY; 

                        ctx.beginPath();
                        ctx.rect(brickX,brickY, brickAncho,brickAlto);
                        ctx.fillStyle="#0095dd";
                        ctx.fill();
                        ctx.closePath();

                     } 

                }
            }

        }

        //funcion score
    function dibuscore(){
        ctx.font="16px Arial";
        ctx.fillStyle ="0095dd";
        ctx.fillText ("score:" + score,8,20); //8px en x y 20 en i.
    }

        function dibulives(){
            ctx.font='16px Arial'
            ctx.fillStyle ="0095dd";
            ctx.fillText ("vidas:" + lives,canvas.width-65,20);
        }






   function dibu(){ //aqui iran todasd las llamadas de funciones externas como la  llamada a la pelota
       //codigo para dibujar
    // crear refreswco po el movimiento del juego
            //cada 10 milisegundos refresque la funcion,, redibuje
        //borrar en pelotas en cada fotograma
    ctx.clearRect(0,0,canvas.width, canvas.height);
            //dibujar pelota
            dibubricks();       
     dibuPala(); 
     dibuscore(); 
     dibulives();    
     dibuball();
     collisionDetention();
        
        x += dx;
        y += dy;

        // hace que la animacion sea mas fluida


        // utilizamos if para crear el algoritmo de detector de impacto de la pelota(para que
        //rebote en los bordes del cuadrado)

        if(x+dx >canvas.width-ballRadio || x + dx < ballRadio){
            dx=-dx; //colision paredes izda y drecha
        }

        if(y+ dy< ballRadio){
            dy=-dy; //controla la pared de abajo

        }  else if(y+dy>canvas.height-ballRadio){ //funcion para que la pelota al tocar pala no pierda en el juego 
            if(x>palaX&&x<palaX+palaAncha){ //si x es mayuor a pala y x es menor a palax mas ancho pala entonces dy sera menos dy para que rebote en pala.
                dy=-dy;
                }else{
               
                        lives --;
                        if (!lives){
                            alert("GAME OVER");
                            document.location.reload();   
                        } else {
                               x= canvas.width/2;
                               y=canvas.height-30; //ponen de posicion inicial la pelota
                               dx=2; //variables de inicio arriba las mismas
                               dy=-2; //varuiables de inicio   
                               palaX=canvas.width-palaAncha/2;
                        }       
                                
                    
                    
                 }
         
        }

        //mover la pala
        
        if (pulsedrcha && palaX<canvas.width<palaAncha){//si la tecla derecha esta pulsada y ademas en anchod e la pala es menor q la distancia del canvas menos el ancho de la pala entonces...
            palaX+=7; //se mueve 7 pixeles
        }
        else if(pulselef && palaX>0){
            palaX -=7;
        }

        requestAnimationFrame(dibu);

    }
    //setInterval (dibu,10);

    dibu();    //funcion de aniamcion fluida para la pelotas
    
    
