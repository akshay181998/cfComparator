var c = 0;
let data1Arr = [];
let data2Arr = [];
let tagArr = [];
let field1;

var hand;
let rat;
//here we get handler and rating.
window.onload = function () {
    var parameters = location.search.substring(1).split("&");

    var temp = parameters[0].split("=");
    hand = unescape(temp[1]);
    temp = parameters[1].split("=");
    rat = unescape(temp[1]);
    document.getElementById("user").value= hand;
    //this.alert("handler is  "+hand+"rating is  "+ rat);
    if (hand != '') {
        console.log('clicked');
        const xhr = new XMLHttpRequest();
        const url = 'https://codeforces.com/api/user.status?handle=' + hand;
        console.log(url);
        xhr.open('GET', url, true);
        console.log(xhr.status);
        xhr.onload = function () {
            console.log(xhr.status);
            if (xhr.status === 200) {
                data1Arr = [];
                data2Arr = [];
                const cost1 = JSON.parse(this.responseText);
                console.log(cost1);
                if (cost1.result.length === 0) {
                    alert('bhai ye wali id galat hai');
                } else {
                    var cnt = 0;
                    let mymap = new Map();
                  // console.log("yaha dekho rating "+rat);
                    for (i = 0; i < cost1.result.length; i++) {
                        //var date = new Date(cost.result[i].ratingUpdateTimeSeconds * 1000);
                        // console.log(date);
                        var id = cost1.result[i].problem.contestId + cost1.result[i].problem.index;
                        var flag;
                       
                        if (cost1.result[i].problem.rating == rat) {
                            if (cost1.result[i].verdict == "OK")
                                flag = true;
                            else
                                flag = false;
                            if (mymap.has(id)) {
                                if (mymap.get(id) == false)
                                    mymap.set(id, flag);
                            } else {
                                mymap.set(id, flag);
                            }

                        }
                    }
                    console.log(mymap);
                    loadTable(cost1, mymap);
                
                }
            }
        }
        xhr.send();
        c++;
    } else {
        alert('please the details ')
    }
}


function loadProblem() {
    field1 = document.getElementById("user").value;
    if (field1 != '') {
        console.log('clicked');
        const xhr = new XMLHttpRequest();
        const url = 'https://codeforces.com/api/user.status?handle=' + field1;
        console.log(url);
        xhr.open('GET', url, true);
        console.log(xhr.status);
        xhr.onload = function () {
            console.log(xhr.status);
            if (xhr.status === 200) {
                data1Arr = [];
                data2Arr = [];
                const cost = JSON.parse(this.responseText);
                console.log(cost);
                if (cost.result.length === 0) {
                    alert('bhai id galat hai');
                } else {
                    var cnt = 0;
                    let mymap = new Map();
                    for (i = 0; i < cost.result.length; i++) {
                        
                        var id = cost.result[i].problem.contestId + cost.result[i].problem.index;
                        var flag;
                        if (cost.result[i].verdict === "OK")
                            flag = true;
                        else
                            flag = false;
                        if (mymap.has(id)) {
                            if (mymap.get(id) === false)
                                mymap.set(id, flag);
                        } else {
                            mymap.set(id, flag);
                        }
                    }
                    console.log(mymap);
                    loadTable(cost, mymap);
                   
                }
                
            }
        }
        xhr.send();
        c++;
    } else {
        alert('please the details ')
    }

}
//Function to Load Table
function loadTable(cost1, mymap) {
    var cnt1 = 0; var cnt2 = 0;
    for (i = 0; i < cost1.result.length; i++) {
        var id = cost1.result[i].problem.contestId + cost1.result[i].problem.index;
        var flag;
        if (mymap.has(id)) {
            if (mymap.get(id) === true) {
                cnt1++;
                var table1 = document.getElementById("solvedTable");
                var row1 = table1.insertRow(-1);
                row1.insertCell(0).innerHTML = cnt1;
                //row1.insertCell(0).innerHTML.style.bold;
                row1.insertCell(1).innerHTML = cost1.result[i].problem.contestId + cost1.result[i].problem.index;
                row1.insertCell(2).innerHTML = cost1.result[i].problem.name;
                row1.insertCell(3).innerHTML = cost1.result[i].problem.rating;
                row1.insertCell(4).innerHTML = cost1.result[i].problem.tags;
                row1.insertCell(5).innerHTML = cost1.result[i].verdict;
                //.insertCell(5).innerHTML.style.backgroundColor = "green";
                data1Arr.push(cost1.result[i].problem.name);
            } else {
                cnt2++;
                var table2 = document.getElementById("unSolvedTable");
                var row2 = table2.insertRow(-1);
                row2.insertCell(0).innerHTML = cnt2;
                //row2.insertCell(0).innerHTML.style.bold;
                row2.insertCell(1).innerHTML = cost1.result[i].problem.contestId + cost1.result[i].problem.index;
                row2.insertCell(2).innerHTML = cost1.result[i].problem.name;
                row2.insertCell(3).innerHTML = cost1.result[i].problem.rating;
                row2.insertCell(4).innerHTML = cost1.result[i].problem.tags;
                row2.insertCell(5).innerHTML = cost1.result[i].verdict;
                //row2.insertCell(5).innerHTML.style.backgroundColor = "red";
                data2Arr.push(cost1.result[i].problem.name);
            }
            mymap.delete(id);
        }

    }
    console.log("dataarr 1 " + data1Arr);
    console.log("dataarr 2 " + data2Arr);
    // mainArr.push(dataArr);
    // console.log(mainArr);
}

