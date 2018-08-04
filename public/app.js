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
  clearContent(selectTag);
  let = index = 0;
  jobs.forEach((job) => {
    let option = document.createElement('option');
    option.value = index;
    option.innerText = job.title;
    selectTag.appendChild(option);
    index++;
  });

  selectTag.addEventListener('change', function(){
    console.log('Buscando data');
    var job = null;
    job = jobs[this.value];
    displayList(job);
    var jsonString = JSON.stringify(job);
    localStorage.setItem('job', jsonString);
    console.log('Local Storage:'+localStorage);
  });

  };

  const clearContent = function(node){
    while(node.hasChildNodes()){
      node.removeChild(node.lastChild);
    }
  };

  const displayList = function(job){
    console.log(job);
    let ulTag = document.getElementById('jobs-list');
    let descTag= document.getElementById('jobs-desc');
    let applyTag= document.getElementById('jobs-apply');
    let logoTag= document.getElementById('img');
    clearContent(ulTag);
    clearContent(descTag);
    clearContent(logoTag);
    clearContent(applyTag);


    let titleJob = document.createElement('li');
    if (job === undefined) {
      titleJob.innerText = 'This job has been removed.';
      console.log('This job has been removed.');
      ulTag.appendChild(titleJob);
    } else {
      if (job !== undefined) {
        if(job.title !== null){
          titleJob.innerText = 'Position: ' + job.title;
          ulTag.appendChild(titleJob);
        }

        let locationJob = document.createElement('li');
        if(job.location !== null){
          locationJob.innerText = 'Location: ' + job.location;
          ulTag.appendChild(locationJob);
        }

        let dateJob = document.createElement('li');
        if(job.created_at !== null){
          dateJob.innerText = 'Created at: ' + job.created_at;
          ulTag.appendChild(dateJob);
        }

        let typeJob = document.createElement('li');
        if(job.type !== null){
          typeJob.innerText = 'Type: ' + job.type;
          ulTag.appendChild(typeJob);
        }

        let desJob = document.createElement('jobs-desc');
        if(job.description !== null){
          desJob.innerHTML = job.description;
          descTag.appendChild(desJob);
        }

        let applyJob = document.createElement('jobs-apply');
        if(job.how_to_apply !== null){
          applyJob.innerHTML = job.how_to_apply;
          applyTag.appendChild(applyJob);
        }

        let companyJob = document.createElement('li');
        if(job.company !== null){
          companyJob.innerText = 'Company: ' + job.company;
          ulTag.appendChild(companyJob);
        }

        let imgJob = document.createElement('img');
        if(job.company_logo !== null){
          imgJob.src = job.company_logo;
          logoTag.appendChild(imgJob);
        }
      }
    }
};

var app = function(){
  google.charts.load('current', {packages: ['corechart']});
  const mapWrapper = new MapWrapper('map', 37.774929, -122.419416, 10);

  mapWrapper.map.on('click', function(event){
    console.log('Hice un click');

    const lat = event.latlng.lat;
    const lng = event.latlng.lng;
    console.log([lat, lng]);
    const url = `https://jobs.github.com/positions.json?lat=${lat}&long=${lng}`;
      makeRequest(url, requestComplete);

  });
}

  window.addEventListener('load', app);
