let tmp = {
    x: '',
    y: ''
};

var c = 0;
var colorList = [
  "#FFD700",
  "#4B0082",
  "#00FFFF",
  "#B22222",
  "#ffd3e1",
  "#303960"
]
let dataArr = [];
let field1;
let chart;

function loadDetail () {
  field1 = document.getElementById("user1").value;
  if(field1 != ''){
    console.log('clicked');
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
          if(cost.result.length === 0){ 
            alert('bhai id galat hai');
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
      xhr.send();  
      c++;
    }else{
      alert('please the details ')
    }
  
}


window.onload = function () {
  chart = new CanvasJS.Chart("chartContainer",
  {
    animationEnabled: true,
    axisX:{
      labelFontSize: 16,
      labelFontStyle: "arial"
    },
    axisY:{
      labelFontSize: 16,
      labelFontStyle: "arial",
      gridThickness: 0,
      stripLines:[
      {
      startValue:0,
      endValue: 1200,
      color:"#b2bec3"
      },
      {
        startValue:1200,
        endValue: 1400,
        color:"rgb(49,255,116)"
      },
      {                
        startValue:1400,
        endValue:1600,                
        color:"rgb(94,230,186)"                
      },
      {                
        startValue:1600,
        endValue:1900,                
        color:"rgb(180,148,255)"                
      },
      {
        startValue:1900,
        endValue: 2100,
        color:"rgb(255,75,255)"
      },
      {
      startValue:2100,
      endValue: 2300,
      color:"rgb(255,208,130)"
      },
      {
        startValue:2300,
        endValue: 2400,
        color:"rgb(255,191,76)"
      },
      {
      startValue:2400,
      endValue: 2600,
      color:"rgb(255,100,113)"
      },
      {
        startValue:2600,
        endValue: 3000,
        color:"rgb(255,0,36)"
      },
      {
      startValue:3000,
      endValue: 5000,
      color:"rgb(175,0,0)"
      }
      ],
      includeZero: false,
      // viewportMinimum: 400,            
    },
    title:{
    text: "Codeforce graph comparator",
    fontFamily: "arial",
    fontWeight: "bold"
    },
    legend: {
      fontFamily: "arial"
    },
    data: []
});
  chart.render();
  this.console.log('chalu hua re baba');

}

function showChart () {
  c--;
  console.log({        
  });
  chart.options.data.push({   
    color: colorList[c],     
    type: "line",
    showInLegend: true, 
    legendText: field1,
    indexLabelFontSize: 12,
    dataPoints: dataArr
  });
  c++;
  chart.render();
}
