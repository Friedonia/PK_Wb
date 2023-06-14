/*made by Frieder Schmidt last change 12.6.2023*/
async function getData() {
      


    const response =  await fetch('http://127.0.0.1:5000/table');

    const dataRaw = await response.json();
  
    const data = dataRaw.tab;


    const tabelle = document.getElementById('tabelle');	  
    while (tabelle.hasChildNodes()) {
        tabelle.removeChild(tabelle.firstChild);
      }
    const reihen = await data.split ('\n').slice(1);

    // LOOP THROUgH ROWS + SPLIT COLUMNS
    for (let reihe of reihen) {
        let spalten = reihe.match(/(?:\"([^\"]*(?:\"\"[^\"]*)*)\")|([^\",]+)/g);
        if (spalten != null) {
            let tr = tabelle.insertRow();
            
            for (let spalte of spalten) {
                let zelle = tr.insertCell();
                zelle.innerHTML = spalte.replace (/ (^"|"$)/g, "");
            }
        }
    }
    setTimeout(getData, 1500);
}


    getData();


