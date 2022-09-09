import fileInclude from "gulp-file-include";
import webpHtmlNoSvg from "gulp-webp-html-nosvg";
import pug from "gulp-pug";

export const html = () => {
  return app.gulp
    .src(app.path.src.html)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "Html",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(fileInclude())
    .pipe(app.plugins.replace(/@img\//g, "./img/"))
    .pipe(webpHtmlNoSvg())
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browsersync.stream());
};

export const pugCompile = () => {
  return app.gulp
    .src(app.path.src.pug)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "Pug",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      pug({
        pretty: true,
        verbose: true,
      })
    )
    .pipe(app.plugins.replace(/@img\//g, "./img/"))
    .pipe(webpHtmlNoSvg())
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browsersync.stream());
};
