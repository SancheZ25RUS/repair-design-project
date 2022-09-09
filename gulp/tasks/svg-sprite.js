import svgSprite from "gulp-svg-sprite";
// import svgo from "gulp-svgo";
export const svgSpriteTask = () => {
  return (
    app.gulp
      .src(`${app.path.src.svgicons}`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "SVG",
            message: "Error: <%= error.message %>",
          })
        )
      )
      .pipe(
        svgSprite({
          mode: {
            stack: {
              sprite: `../icons/icons.svg`,
              // Создавать страницу с перечнем иконок
              example: true,
            },
            // symbol: {
            //   sprite: app.gulp.dest.sprite,
            //   example: true,
            // },
          },
          shape: {
            transform: [
              {
                svgo: {
                  plugins: [
                    {
                      removeAttrs: {
                        attrs: ["class", "data-name", "fill", "stroke"],
                      },
                    },
                  ],
                },
              },
            ],
          },
        })
      )
      // .pipe(svgo({ plugins: [{ removeAttrs: { attrs: ["fill", "stroke"] } }] }))
      .pipe(app.gulp.dest(`${app.path.build.images}`))
  );
};
