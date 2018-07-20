const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const imageminJpg = require('imagemin-jpeg-recompress');
const imageminPng = require('imagemin-pngquant');
const imageminGif = require('imagemin-gifsicle');

const jimp = require("jimp");
const fs = require("fs");

const paths = {
	src: "src/res",
    int: "src/int",
	dst: "docs/res"
};


gulp.task('imgcover',function(){
    fs.readdir(paths.src, function (err, files) {
        if (err) {
            throw err;
        }
        files
            .filter((item)=>
                !item.match(/\.DS_Store/)
            )
            .forEach((item)=> {


                jimp.read(paths.src + "/" + item).then(function (img) {
                    // box
                    img.cover(700, 700)
                        .write(paths.int + "/" + item);
                }).catch(function (err) {
                    console.log(item);
                    console.error(err);
                });
            });
    });
});

gulp.task('imagemin', function(){
    let srcGlob = paths.int + '/*.+(jpg|jpeg|png|gif)';
    let dstGlob = paths.dst;
    gulp.src( srcGlob )
        .pipe(imagemin([
            imageminPng(),
            imageminJpg(),
            imageminGif({
                interlaced: false,
                optimizationLevel: 5,
                colors:180
            })
        ]))
    .pipe(gulp.dest( dstGlob ));
});
