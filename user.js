var val = [];

var chart;
var field1 = '';
function loadDetails() {
    const xhr = new XMLHttpRequest();
    field1 = document.getElementById("user1").value;
    const url = "https://codeforces.com/api/user.status?handle=" + field1 + "&from=1";
    xhr.open('GET', url, true);
    xhr.onload = function () {
        // console.log(xhr.status);
        if (xhr.status === 200) {
            // console.log(this.responseText);
            const resp = JSON.parse(this.responseText);
            var i = 0;
            var mp = new Map();
            for (i = 0; i < resp.result.length; i++) {
                // console.log(resp.result[i].problem['rating']);
                if (mp.has(resp.result[i].problem['rating']) && resp.result[i].verdict === 'OK') {
                    mp.set(resp.result[i].problem['rating'], mp.get(resp.result[i].problem['rating']) + 1);
                } else {
                    if (resp.result[i].verdict === 'OK' && resp.result[i].problem['rating'] >= 100) {
                        mp.set(resp.result[i].problem['rating'], 1);
                    }
                }

            }

            function printf(values, keys) {
                // console.log(values , keys);
                val.push({ x: keys, y: values });
            }
            mp.forEach(printf);
            setTimeout(() => { addNew() }, 1000);
        }
    }
    xhr.send();

}


window.onload = function () {
    chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light1",
        dataPointMaxWidth: 75,
        axisX: {
            includeZero: false,
            interval: 100,
        },
        axisY: {
            gridThickness: 0,
        },
        title: {
            text: "Your rating wise progress",
            fontFamily: "arial",
            fontWeight: "bold"
        },
        legend: {
            fontFamily: "arial"
        },
        data: []
    });
    chart.render();

}
var rat;
function addNew() {
    console.log(val);

    chart.options.data.push({
        type: "column",
        click: function (e) {
            console.log(e.dataPoint.x);
            //alert("go to another page");
            window.location.href = "problemSet.html?handle=" + field1 + "&rating=" + e.dataPoint.x;
        },
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: val,


    });
    chart.render();
}