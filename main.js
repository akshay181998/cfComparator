let tmp = {
    x: '',
    y: ''
};

var c = 0;
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
      includeZero: false,
      // viewportMinimum: 400,            
    },
    title:{
    text: "Codeforce graph comparator"
    },
    data: []
});
  chart.render();
  this.console.log('chalu hua re baba');

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
