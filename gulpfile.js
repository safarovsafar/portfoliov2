var gulp = require("gulp"),
    gcmq = require('gulp-group-css-media-queries'),
    autoprefixer = require("gulp-autoprefixer"),
    cssbeautify = require("gulp-cssbeautify"),
    removeComments = require('gulp-strip-css-comments'),
    rename = require("gulp-rename"),
    scss = require("gulp-sass"),
    cssnano = require("gulp-cssnano"),
    rigger = require("gulp-rigger"),
    watch = require("gulp-watch"),
    plumber = require("gulp-plumber"),
    imagemin = require("gulp-imagemin"),
    run = require("run-sequence"),
    rimraf = require("rimraf"),
    webserver = require("browser-sync"),
    htmlmin = require('gulp-html-minifier'),
    smartgrid = require('smart-grid');
    uglify = require('gulp-uglify-es').default;

/* Paths to source/build/watch files
=========================*/

var path = {
    build: {
        html: "build/",
        js: "build/assets/js/",
        css: "build/assets/css/",
        img: "build/assets/img/",
        fonts: "build/assets/fonts/"
    },
    src: {
        html: "src/assets/html/*.{htm,html}",
        js: "src/assets/js/*.js",
        css: "src/assets/scss/style.scss",
        img: "src/assets/img/**/*.*",
        fonts: "src/assets/fonts/**/*.*"
    },
    watch: {
        html: "src/**/*.{htm,html}",
        js: "src/assets/js/**/*.js",
        css: "src/assets/scss/**/*.scss",
        img: "src/assets/img/**/*.*",
        fonts: "src/assets/fonts/**/*.*"
    },
    clean: "./build"
};

/* It's principal settings in smart grid project */
var settings = {
    mixinNames: {
        container: 'wp',
    },
    outputStyle: 'scss',
    /* less || scss || sass || styl */
    columns: 24,
    /* number of grid columns */
    offset: '30px',
    /* gutter width px || % */
    mobileFirst: false,
    /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: '1460px',
        /* max-width оn very large screen */
        fields: '30px' /* side fields */
    },
    breakPoints: {
        xl: {
            width: '1400px',
        },
        lg: {
            width: '1200px',
            /* -> @media (max-width: 1400px) */
        },
        md: {
            width: '960px'
        },
        sm: {
            width: '780px',
            fields: '15px' /* set fields only if you want to change container.fields */
        },
        xs: {
            width: '560px'
        },
        us: {
            width: '360px'
        },
        hs: {
            width: '320px'
        }
        /*
        We can create any quantity of break points.

        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */
    }
};

smartgrid('./src/assets/scss', settings);



/* Webserver config
=========================*/

var config = {
    server: "build/",
    notify: false,
    open: true,
    ui: false
};


/* Tasks
=========================*/

gulp.task("webserver", function () {
    webserver(config);
});


gulp.task("html:build", function () {
    return gulp.src(path.src.html)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyJS: true
        }))
        .pipe(gulp.dest(path.build.html))
        .pipe(webserver.reload({
            stream: true
        }));
});


gulp.task("css:build", function () {
    gulp.src(path.src.css)
        .pipe(plumber())
        .pipe(scss())
        .pipe(gcmq())
        .pipe(autoprefixer({
            browsers: ["last 5 versions"],
            cascade: true
        }))
        .pipe(removeComments())
        .pipe(cssbeautify())
        .pipe(gulp.dest(path.build.css))
        .pipe(cssnano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest(path.build.css))
        .pipe(webserver.reload({
            stream: true
        }));
});


gulp.task("js:build", function () {
    gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(uglify())
        .pipe(removeComments())
        .pipe(rename("main.min.js"))
        .pipe(gulp.dest(path.build.js))
        .pipe(webserver.reload({
            stream: true
        }));
});


gulp.task("fonts:build", function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});


gulp.task("image:build", function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img));
});


gulp.task("clean", function (cb) {
    rimraf(path.clean, cb);
});


gulp.task('build', function (cb) {
    run(
        "clean",
        "html:build",
        "css:build",
        "js:build",
        "fonts:build",
        "image:build", cb);
});


gulp.task("watch", function () {
    watch([path.watch.html], function (event, cb) {
        gulp.start("html:build");
    });
    watch([path.watch.css], function (event, cb) {
        gulp.start("css:build");
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start("js:build");
    });
    watch([path.watch.img], function (event, cb) {
        gulp.start("image:build");
    });
    watch([path.watch.fonts], function (event, cb) {
        gulp.start("fonts:build");
    });
});


gulp.task("default", function (cb) {
    run(
        "clean",
        "build",
        "webserver",
        "watch", cb);
});

