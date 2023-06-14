/*made by Frieder Schmidt last change 12.6.2023*/
const api = 'http://127.0.0.1:5000/table';

const ctx = document.getElementById('graph').getContext('2d');

var graph = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});



// fetcht daten aus von einer API daten und gibt asyncron
// die daten aus der datei als text zurück
async function getDataAPI(){


  const datenX = [];
  const datenY = [];
  // holt alles von der API
  console.log("a");

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
  graph.data.labels = datenX;
  graph.data.datasets[0].data = datenY;
  graph.update();
  console.log("c");

  setTimeout(getDataAPI(), 150);
  console.log("d");

}
getDataAPI();


