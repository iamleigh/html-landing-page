/**
 * Supported Packages
 * List here all dependencies necessary to run required tasks.
 */
const gulp = require("gulp");
const mode = require("gulp-mode")({
	modes: ["production", "development"],
	default: "development",
	verbose: false,
});
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const header = require("gulp-header");
const eslint = require("gulp-eslint");
const gulpIf = require("gulp-if");

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
 */
const browsersList = ["last 2 version", "> 1%"];

/**
 * Building Function(s)
 */
function compile() {
	return gulp
		.src(srcInput.css + "**/*.scss")
		.pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
		.pipe(autoprefixer(browsersList))
		.pipe(header(banner))
		.pipe(gulp.dest(srcOutput.css))
		.pipe(cleanCSS())
		.pipe(rename({ suffix: ".min" }))
		.pipe(gulp.dest(srcOutput.css))
		.on("finish", function () {
			console.log("📦 Finished compiling styles.");
		});
}

/**
 * ESLint
 *
 * Linter and auto-fix issues.
 *
 * @since 1.0.0
 */
function isFixed(file) {
	// Check if ESLint has run the fix
	return file.eslint !== null && file.eslint.fixed;
}

gulp.task("eslint-fix", () => {
	return (
		gulp
			.src(srcInput.js + "*.js")
			.pipe(eslint({ fix: true }))
			.pipe(eslint.format())
			// Replace existing file with fixed one
			.pipe(gulpIf(isFixed, gulp.dest(srcInput.js + "*.js")))
			.pipe(eslint.failAfterError())
	);
});

/**
 * Environment Function(s)
 *
 * @desc Based on environment (production or development)
 * run the required function task(s).
 */
const isProduction = mode.production();

if (isProduction) {
	function build() {
		return compile();
	}
} else {
	function build() {
		return gulp.watch(
			srcInput.css + "**/**/**/*.scss",
			{ queue: false },
			function (cb) {
				compile();
				cb();
			}
		);
	}
}

/**
 * Run Tasks
 *
 * @desc Use Gulp to run compiling tasks.
 */
exports.default = gulp.series(build);
