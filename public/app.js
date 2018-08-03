const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
};

const requestComplete = function(){
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const jobs = JSON.parse(jsonString);
  populateList(jobs);
};

const populateList = function(jobs){
  let selectTag = document.getElementById('jobsDropdown');
  let = index = 0;
  jobs.forEach((job) => {
    let option = document.createElement('option');
    option.value = index;
    option.innerText = job.title;
    selectTag.appendChild(option);
    index++;
  });

  selectTag.addEventListener('change', function(){
    var job = jobs[this.value];
    displayList(job);
    var jsonString = JSON.stringify(job);
    localStorage.setItem('job', jsonString);
  });
  };

  const clearContent = function(node){
    while(node.hasChildNodes()){
      node.removeChild(node.lastChild);
    }
  };
  //
  const displayList = function(job){
    console.log(job);
    let ulTag = document.getElementById('jobs-list');
    clearContent(ulTag);
    let titleJob = document.createElement('li');
    titleJob.innerText = `Position: ` + job.title;
    ulTag.appendChild(titleJob);
    let locationJob = document.createElement('li');
    locationJob.innerText = `Location: ` + job.location;
    ulTag.appendChild(locationJob);
    let dateJob = document.createElement('li');
    dateJob.innerText = 'Created at: ' + job.created_at;
    ulTag.appendChild(dateJob);
    let typeJob = document.createElement('li');
    typeJob.innerText = 'Type: ' + job.type;
    ulTag.appendChild(typeJob);
    // let desJob = document.createElement('li');
    // desJob.innerText = 'Description: ' + job.description;
    // ulTag.appendChild(desJob);
    // let urlJob = document.createElement('li');
    // urlJob.innerText = 'How to apply: ' + job.how_to_apply;
    // ulTag.appendChild(urlJob)
    let companyJob = document.createElement('li');
    companyJob.innerText = 'Company: ' + job.company;
    ulTag.appendChild(companyJob);

    let imgJob = document.createElement('img');
    imgJob.src = job.company_logo;
    ulTag.appendChild(imgJob);

    let infoJob = document.createElement('a')
    let linkText = document.createTextNode("More info: ");
    infoJob.appendChild(linkText);
    infoJob.title = "More info: ";
    infoJob.href = job.url;
    ulTag.appendChild(infoJob);
  }

var app = function(){
  google.charts.load('current', {packages: ['corechart']});
  const mapWrapper = new MapWrapper('map', 37.774929, -122.419416, 10);

  mapWrapper.map.on('click', function(event){
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;
    console.log([lat, lng]);
    const url = `https://jobs.github.com/positions.json?lat=${lat}&long=${lng}`;
    var jsonString = localStorage.getItem('job');
    if(jsonString !== null){
      var savedJob = JSON.parse(jsonString);
      displayList(savedJob);
  };
      makeRequest(url, requestComplete);
  });
}

  window.addEventListener('load', app);
