let tmp = {
    x: '',
    y: ''
};

var c = 0;
let dataArr = [];
let field1, temp;
let chart;

function loadDetail () {
  temp = document.getElementById("user1").value.trim().split(",");
  for(let i=0;i<temp.length;i++){
	  field1=temp[i].trim();
	  if(field1 != ''){
		const xhr = new XMLHttpRequest();
		const url = 'https://codeforces.com/api/user.rating?handle='+field1;
		  console.log(url);
		  xhr.open('GET', url, true);
		  console.log(xhr.status);
		  xhr.onload = function () {
			console.log(xhr.status);
			if (xhr.status === 200 ) {
			  dataArr = [];
			  const cost = JSON.parse(this.responseText);
			  console.log(cost);
			  if(cost.result.length == 0){ 
				console.log('call');
				notif("Wrong User Handle","is-warning");
			  }else{
				for(i = 0 ; i < cost.result.length ; i++){
				  var date = new Date(cost.result[i].ratingUpdateTimeSeconds * 1000);
				  // console.log(date);
					dataArr.push({x: date,
					  y: cost.result[i].newRating
				  });
				}    
				console.log(dataArr);
				// mainArr.push(dataArr);
				// console.log(mainArr);
			  }
			  setTimeout(showChart() , 5000);
			}
			
		  } 
		  xhr.onerror=function(){
			  notif("Something went wrong.","is-danger");
		  }
		  xhr.send();  
		  c++;
		}else{
		  notif('Empty handles are Omitted',"is-warning");
		}
	}
}


window.onload = function () {
  document.getElementById('donotsubmit').addEventListener("submit",function(e) {
    e.preventDefault(); 
	notif('Working on Request');
	loadDetail();
  });
  chart = new CanvasJS.Chart("chartContainer",
  {
    animationEnabled: true,
	axisX:{
		labelFontColor: "#fff"
	},
    axisY:{
	stripLines:[
      {
      startValue:0,
      endValue: 1200,
      color:"#b2bec3"
      },
      {
        startValue:1200,
        endValue: 1400,
        color:"#26de81"
      },
      {                
        startValue:1400,
        endValue:1600,                
        color:"#00cec9"                
      },
      {                
        startValue:1600,
        endValue:1900,                
        color:"#6c5ce7  "                
      },
      {
        startValue:1900,
        endValue: 2100,
        color:"#ffb8b8"
      },
      {
      startValue:2100,
      endValue: 2300,
      color:"#fffa65"
      },
      {
        startValue:2300,
        endValue: 2400,
        color:"#ffaf40"
      },
      {
      startValue:2400,
      endValue: 2600,
      color:"#ff9f1a"
      },
      {
        startValue:2600,
        endValue: 3000,
        color:"#e55039"
      },
      {
      startValue:3000,
      endValue: 5000,
      color:"#eb2f06"
      }
      ],
	  labelFontColor: "#fff",
      		includeZero: false
	  // viewportMinimum: 400,            
    },
	backgroundColor: "transparent",
    /*title:{
    text: "Codeforce graph comparator"
    },*/
    data: []
});
  //this.console.log('chalu hua re baba');
}

function notif(txt,type="is-primary"){
	console.log("notifying");
	let notifier = document.getElementById("notif-container");
	let notif = document.createElement('div');
	notif.className='notification '+type;
	notif.innerHTML=txt;
	notif.style.opacity="0";
	notifier.appendChild(notif);
	notif.style.opacity="1";
	//3secs
	setTimeout(function(){
		notifier.removeChild(notif);
	},3000);
}
function showChart () {
  console.log({        
    type: "line",
    indexLabelFontSize: 12,
    dataPoints: dataArr
  });
  chart.options.data.push({        
    type: "line",
    indexLabelFontSize: 12,
    dataPoints: dataArr
  });
  chart.render();
}
