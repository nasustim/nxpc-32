const $ = require("jquery");
const d3 = require("d3");

let width = $("#cvs-container").innerWidth();
let height = $("#cvs-container").innerHeight();

let sw = 960.67;
let sh = 540.7;

let sf = sw / sh;
let cf = width / height;

let x1, x2, y1, y2;

let ratio;

if(sf > cf){
    ratio = sh / height;
    y1 = 0;
    y2 = sh;
    x1 = (sw / 2) - (width * ratio / 2);
    x2 = width * ratio;
}else{
    ratio = sw / width;
    x1 = 0;
    x2 = sw;
    y1 = (sh / 2) - (height * ratio / 2);
    y2 = height * ratio;
}

//console.log(x1,y1,x2,y2);

let svg = d3.select("svg")
    .attr("viewBox", `${x1} ${y1} ${x2} ${y2}`)
    .attr("width", width+"px")
    .attr("height", height+"px");

var elem = d3.select("svg").selectAll("path");
console.log(elem);


setInterval(()=>{
    let rand = [];
    for(let i = 0; i < 5; i++){
        rand.push(Math.floor( Math.random() * 700 ))+97;
    }

    console.log(rand);

    for(let i in rand){

        //elem[0][rand[i]].attributes.d.value = "M229.2,1l78.6,131.6L233,266.5l-153.3,2.2L1.2,137.1L75.9,3.2L229.2,1 M229.8,0L75.3,2.2L0,137.1l79.2,132.6l154.5-2.2L309,132.6L229.8,0L229.8,0z";
        //elem[0][rand[i]].attributes.transform.value = "translate(-259.05 -271.63)";

        //elem//[0][rand[i]]
        d3.select("svg").selectAll("path").filter(":nth-child("+rand[i]+")")
            //.append("path")
            .transition().delay(500).duration(1000)
            .attr("fill-opacity","0.65")
            .attr("style","fill:#fffeee")
            .attr("d", "M229.2,1l78.6,131.6L233,266.5l-153.3,2.2L1.2,137.1L75.9,3.2L229.2,1 M229.8,0L75.3,2.2L0,137.1l79.2,132.6l154.5-2.2L309,132.6L229.8,0L229.8,0z")
            .attr("transform", "translate(-259.05 -271.63)");

    }

},10000);


$(window).resize(()=>{
    width = $("#cvs-container").innerWidth();
    height = $("#cvs-container").innerHeight();

    cf = width / height;

    if(sf > cf){
        ratio = sh / height;
        y1 = 0;
        y2 = sh;
        x1 = (sw / 2) - (width * ratio / 2);
        x2 = width * ratio;
    }else{
        ratio = sw / width;
        x1 = 0;
        x2 = sw;
        y1 = (sh / 2) - (height * ratio / 2);
        y2 = height * ratio;
    }  

    let svg = d3.select("svg")
        .attr("viewBox", `${x1} ${y1} ${x2} ${y2}`)
        .attr("width", width+"px")
        .attr("height", height+"px");
});