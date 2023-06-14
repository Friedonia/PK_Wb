/*made by Frieder Schmidt last change 12.6.2023*/
const api = 'http://127.0.0.1:5000/table';



// fetcht daten aus von einer API daten und gibt asyncron
// die daten aus der datei als text zurück
async function getDataAPI(){
  const canvas = document.getElementById('graph')
  const ctx = canvas.getContext('2d');
  const datenX = [];
  const datenY = [];
  console.log("a");

  while (canvas.hasChildNodes()) {
    canvas.removeChild(canvas.firstChild);
    }
    const antwort =  await fetch('http://127.0.0.1:5000/table');
    console.log("b");
  
    // wandelt daten in JSON
    const dataRaw = await antwort.json();
    const data = dataRaw.tab
    const reihen =  data.split ('\n').slice(1);
    console.log(reihen);
      // deg holt den rotaions grad aus JSON raus von der API und wandelt es in text um
    const rows = reihen;
  
    for (let row of rows) {
      let cols = row.match(/(?:\"([^\"]*(?:\"\"[^\"]*)*)\")|([^\",]+)/g);
      if (cols != null) {
        let even = true;
        for (let col of cols) {
          if(even){
            datenX.push(col);
            even = false;
          }else{
            datenY.push(col);
            even = true; 
          }
        }
      }
    }
  
  

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: datenX,
      datasets: [{
        label: '# of Votes',
        data: datenY,
      }]
    },
    options: {
      animation: {
        duration: 0
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

   // holt alles von der API
  console.log("a");


  setTimeout(getDataAPI(), 150);
  console.log("d");

}
getDataAPI();


