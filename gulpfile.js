/**
 * Supported Packages
 * List here all dependencies necessary to run required tasks.
 */
const gulp = require("gulp");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const header = require("gulp-header");
const eslint = require("gulp-eslint");
const gulpIf = require("gulp-if");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;

/**
 * Uglify Settings
 *
 * @since 1.0.0
 */
const uglifyOptions = {
	compress: {
		// eslint-disable-next-line camelcase
		drop_console: true,
	},
};

/**
 * Paths & Files
 *
 * @since 1.0.0
 */
const fileName = "leighton-quito-aml";

const srcInput = {};
srcInput.js = "./assets/js/";
srcInput.css = "./assets/scss/";

const srcOutput = {};
srcOutput.js = "./assets/js/dist/";
srcOutput.css = "./assets/css/";

/**
 * Copyright Banner
 */
const banner = [
	"/*!",
	" * Form Pages CSS (" + fileName + ")",
	" * ",
	" * Copyright 2023 Leighton Quito (https://iamleigh.com)",
	" * Licensed under MIT (https://opensource.org/license/mit/)",
	" */",
	"",
].join("\n");

/**
 * List of Supported Browsers
 *
 * @since 1.0.0
 */
const browsersList = ["last 2 version", "> 1%"];

/**
 * 📦 Build CSS
 *
 * - Linter issues
 * - Concat files into one
 * - Minify concated file
 *
 * @since 1.0.0
 */
gulp.task("styles", () => {
	return (
		gulp
			.src(srcInput.css + "**/*.scss")
			// Check if files have an error
			.pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
			.pipe(autoprefixer(browsersList))
			.pipe(header(banner))
			.pipe(gulp.dest(srcOutput.css))
			.pipe(cleanCSS())
			.pipe(rename({ suffix: ".min" }))
			.pipe(gulp.dest(srcOutput.css))
			.on("finish", function () {
				console.log("📦 Finished compiling styles.");
			})
	);
});

/**
 * 📦 Build JS
 *
 * - Linter and auto-fix issues
 * - Concat files into one
 * - Minify concated file
 *
 * @since 1.0.0
 */
function isFixed(file) {
	// Check if ESLint has run the fix
	return file.eslint !== null && file.eslint.fixed;
}

gulp.task("scripts", () => {
	return (
		gulp
			.src(srcInput.js + "*.js")
			.pipe(eslint({ fix: true }))
			.pipe(eslint.format())
			// Replace existing file with fixed one
			.pipe(gulpIf(isFixed, gulp.dest(srcInput.js + "*.js")))
			.pipe(eslint.failAfterError())
			.pipe(concat("leighton-quito.js"))
			.pipe(header(banner))
			.pipe(gulp.dest(srcOutput.js))
			.pipe(uglify(uglifyOptions))
			.pipe(rename({ suffix: ".min" }))
			.pipe(gulp.dest(srcOutput.js))
			.on("finish", function () {
				console.log("📦 Finished compiling scripts.");
			})
	);
});

/**
 * 📦 Compile Assets
 *
 * @since 1.0.0
 */
gulp.task("compile", gulp.parallel(["styles", "scripts"]));

/**
 * 🧑🏻‍💻 Watch Changes
 *
 * @since 1.0.0
 */
gulp.task("watch", function () {
	gulp.watch(srcInput.css + "**/**/**/*.scss", gulp.series(["styles"]));
	gulp.watch(srcInput.js + "*.js", gulp.series(["scripts"]));
});
