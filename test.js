var note = 0;
const fragen = 15;

document.getElementById('submit').onclick =  function() {
    for (let i = 1; i < fragen+1; i++) {
        
        const antwort = document.getElementById(''+ i);
        antwort.disabled = true;
        if (antwort.checked){
            note += parseInt(antwort.value);
        }
    }
        note = note/5 * fragen;
        alert("Deine Note ist: "+ note + "! \nNächstes mal wird es besser sein!");
        document.getElementById('submit').disabled = true;
        console.log(note);
};