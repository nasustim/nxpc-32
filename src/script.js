const $ = require("jquery");

var i = 0;

var cvs = document.getElementById("cvs");
cvs.setAttribute("width", $("#cvs-container").width());
cvs.setAttribute("height", $("#cvs-container").height());

var ctx = cvs.getContext("2d");
var img = new Image(), iw, ih, cw, ch;
var sx, sy, sw, sh, ratio;
var rx = [], ry = [], rw = [], rh = [], vec = [];

function imgLoad(){
    img.src = "res/top.jpg";
    img.crossOrigin = 'anonymous';
    img.onload = () =>{
        imgCover();
    };
}

function imgCover(){
    iw = img.naturalWidth;
    ih = img.naturalHeight;
    cw = $("#cvs-container").width();
    ch = $("#cvs-container").height();
    ratio = cw / ch;
    if(ratio > 1){
        sw = iw;
        sx = 0;
        sy = ( ih - ( ih / ratio ) ) / 2;
        sh = ( ih / ratio );
    }else{
        sh = ih;
        sy = 0;
        sx = ( iw - ( iw * ratio ) ) / 2;
        sw = ( iw * ratio );
    }

    ctx.drawImage(img,sx,sy,sw,sh,0,0,cw,ch);
    //console.log(sx,sy,sw,sh,0,0,cw,ch,ratio);

    render();
}

function render(){

    if(i == 0){
        ctx.drawImage(img,sx,sy,sw,sh,0,0,cw,ch);

        for(let j = 0; j < 80; j++){
            rx[j] = Math.floor(Math.random() * cw);
            ry[j] = Math.floor(Math.random() * ch);

            rw[j] = Math.floor(Math.random() * cw / 10 );
            rh[j] = Math.floor(Math.random() * ch / 10 );

            vec[j] = Math.floor(Math.random() * 8 ) - 4;
        }

    }

    i++;
    if(i > 60){
        i = 0;
    }


    var imagedata = ctx.getImageData(0, 0, cw, ch);
    for(let j = 0; j < 80; j++){
        
        ctx.putImageData(imagedata, rx[j], ry[j], rx[j] + i , ry[j] + vec[j] * i, rw[j], rh[j]);
    }
    requestAnimationFrame(render);
}

imgLoad();

$(window).resize(()=>{
    cvs.setAttribute("width", $("#cvs-container").width());
    cvs.setAttribute("height", $("#cvs-container").height());
    ctx = cvs.getContext("2d");
    imgCover();
});