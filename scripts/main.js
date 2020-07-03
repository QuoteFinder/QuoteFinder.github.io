
var csvData;
var variable;
var totalFound = 0;
var fullResults = {
    'season': [],
    'episodeNum': [],
    'episodeName': [],
    'lineNum': [],
    'timeMins': [],
    'timeSecs': [],
    'text': [],
    'indexPos': [],
}
const f = document.getElementById('file-selector');

f.addEventListener('change', (event) => {
  const f = event.target.files;
  parseData(f);  
});
//function1();

function function1(string) {
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.textContent = string;
    //ul.appendChild(document.createTextNode(string));
    //li.setAttribute("id", "foundElement"); // added line
    ul.appendChild(li);
  }

function clearingList(){    
    console.log(totalFound)    
      //  document.getElementById("foundElement").innerHTML = "";
      let list2 = document.getElementById("list")
      ///while(list2.lastElementChild){
      while(list2.hasChildNodes()) {
        list2.removeChild(list2.lastElementChild)
      }
      //}
      //var ul = document.getElementById("list");     
      //var li = document.getElementById("foundElement"); 
      //while( ul.firstChild ){
       // console.log(ul.firstChild)
        //li.removeChild(li.firstChild)
       // ul.removeChild(ul.firstChild );
      //}
    
      /*var ul = document.getElementById('list');
      var listLength = ul.children.length;
      console.log(listLength)
      for (i = 0; i < listLength; i++) {
        console.log(ul.childNodes[i])
        ul.removeChild(ul.childNodes[i]);
      }*/
}

function parseData(f){    
    Papa.parse(f[0], {
        complete: function(results, f) {
            csvData = results.data;
        },  
        delimiter: "",	// auto-detect
        newline: "",	// auto-detect
        quoteChar: '"',
        escapeChar: '"',
        header: false,
        transformHeader: undefined,
        dynamicTyping: false,
        preview: 0,
        encoding: "",
        worker: false,
        comments: false,
        step: undefined,      
        download: false,
        downloadRequestHeaders: undefined,
        downloadRequestBody: undefined,
        skipEmptyLines: true,
        chunk: undefined,
        fastMode: undefined,
        beforeFirstChunk: undefined,
        withCredentials: undefined,
        transform: undefined,
        delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP]
    });
}


function wawa() {    
    //clearingList();
    totalFound = 0;
    var variable = document.getElementById('input_id').value;
    //const changing2 = document.querySelector('h1');
    //changing2.textContent = 'Helo' + variable;
    search(csvData, variable)
    //console.log(fullResults)
    //console.log(totalFound)
    //console.log(fullResults.season[totalFound - 1])
    //console.log(fullResults.episodeName[totalFound - 1])
    var finalResults = "";
    for (var l = 0; l < totalFound; l++) {
        var seasonNum = (fullResults.season[l]) + ""
        var seasonEp = (fullResults.episodeNum[l]) + ""
        var episodeName = (fullResults.episodeName[l]) + ""
        var text = fullResults.text[l]
        //var temp = '#' + (l+1) + ': Season: ' + seasonNum + '.' + seasonEp + " " + episodeName + "-" + text;
        var temp = text + " [" + episodeName + ' (' + seasonNum + '.' + seasonEp + ")" + "]";
        finalResults = finalResults + temp + '\n';        
        function1(temp)
        //console.log(finalResults);   
    }
    //console.log(finalResults);   
    //function1(finalResults)
}


function search(dataObject, goalPhrase){
    //console.log(dataObject[x][5].toLowerCase());
    for (var x = 1; x < 117302; x++) {
         if(dataObject[x][6].toLowerCase().includes(goalPhrase.toLowerCase())){            
            fullResults.season.push(dataObject[x][0]);
            fullResults.episodeNum.push(dataObject[x][1]);
            fullResults.episodeName.push(dataObject[x][2]);
            fullResults.lineNum.push(dataObject[x][3]);
            fullResults.timeMins.push(dataObject[x][4]);
            fullResults.timeSecs.push(dataObject[x][5]);
            fullResults.text.push(dataObject[x][6]);
            fullResults.indexPos.push(x);
            totalFound = totalFound + 1;
            //console.log('Match Found')
            //console.log(dataObject[x][6])

        }
    }
}

//didn't use this
async function createFile(){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://filebin.net/e4iubkb89fwl29xh/initialVersionV3.csv?t=jp8mn7t5', true);
    request.responseType = 'blob';
    request.onload = function() {
        var reader = new FileReader();
        reader.readAsDataURL(request.response);
        reader.onload =  function(e){
            console.log('DataURL:', e.target.result);
        };
    };
    request.send();
  }


//https://www.papaparse.com/

//const myHeading = document.querySelector('h1');
//myHeading.textContent = 'Hello world2!'; 

