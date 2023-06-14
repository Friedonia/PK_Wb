/*made by Frieder Schmidt last change 4.6.2023*/

// Rotiert die ein objekt im HTML mit der ID 
function rotate(deg, ID){
    const rotated = document.getElementById(''+ ID);
    rotated.style.transform = 'rotate('+deg+'deg)';
}

// fetcht daten aus von einer API daten und gibt asyncron
// die daten aus der datei als text zurück
async function getDataAPI(apiLink){
    // holt alles von der API
    const antwort =  await fetch(apiLink);
    
    // wandelt daten in JSON
    const data = await antwort.json();

    // deg holt den rotaions grad aus JSON raus von der API und wandelt es in text um
    return Number( await data.deg);
}

// fetcht daten aus einer datei und gibt asyncron
// die daten aus der datei als text zurück
async function getData(path) {
    const antwort = await fetch(path);
// holt den rotaions grad aus der datei und wandelt es in text um
    return Number( await antwort.text());
}

// funktionen kombiniert um es kompakt zu haben
function rotatingObject(path, objID){
    getDataAPI(''+path).then(x => { 
        rotate(x, ''+objID);
        document.getElementById("deg").innerHTML = ""+x+"°";
    });
}

// alle 0.15s ruft die funktionen auf
// rekrusive unendliche funktion (setIntervall funktioniert nicht)
function foo() {
    rotatingObject('http://127.0.0.1:5000/deg', 'platform_img');
    setTimeout(foo, 1500);
}
foo();

