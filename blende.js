/*made by Frieder Schmidt last change 9.6.2023*/

// sucht das Element welches zu bearbeiten ist und setzt es in context
const canvas = document.getElementById('gitter');
const C = canvas.getContext('2d');

// defeniert die größe
canvas.width = 250;
canvas.height = 250;

// defeniert die blende Blenden 
class Blende{
    // gibt atributen
    constructor (){
        this.position = 0;
        this.width = canvas.width/2;
        this.height = canvas.height;
    }
    // Zeichnet die Blende
    draw(){
        C.fillStyle = 'white';
        C.fillRect(this.position, 0,this.width, this.height);
    }
    // Updatet die position der Blende
    update(){
        this.draw()   
        this.position;
    }
     
}

class Gitter{
    // gibt atributen
    constructor (){
        this.height = canvas.height;
        this.width = canvas.width;
        this.barwidth= this.width/29;
        
    }
    // Zeichnet das gitteer
    zeichne(){
        let x = 1;
        for (let i = 0; i < 29; i++) {
            C.fillStyle = '#080071';
            if (x == 1){
                C.fillRect(this.barwidth*i, 0, this.barwidth, this.height);
                x= 0;
            }else {
                x= 1;
            }
        }
        C.fillRect(0, 0, this.width, 15);
        C.fillRect(0, this.height-15, this.width, 15);
    }

}

// erstellt die Objekte 
const pappe1 = new Blende();
const pappe2 = new Blende();
const gitter = new Gitter();
pappe2.position = 125;


// ein widerholender loop um atkuell zu bleiben mit der position
async function animate(){

    // setzt den Canvas zurück
    C.clearRect(0,0, canvas.width, canvas.height);
    
    // wartet und empfängt die daten der API
    const antwort =  await fetch('http://127.0.0.1:5000/blende');
    
    // wandelt daten in JSON
    const data = await antwort.json();
    
    // wandelt es in die position der Blenden um und holt die daten dafür aus JSON (angenommene werte 0-14 grade)
    pappe1.position = -17*(await data.see / 2);
    pappe2.position = 125+17*( await data.see / 2);

    // ruft die elemente auf
    pappe1.update();
    pappe2.update();
    gitter.zeichne();

    // wartet 1,5sek und ruft die funkton wider auf
    setTimeout(animate,1500);
 } 


 // ruft die funktion zum erstenmal auf
 animate()

 