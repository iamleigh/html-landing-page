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

/**
 * Development Paths & Files
 */
const fileName = "leighton-quito-aml";
const inputSource = "./assets/scss/";
const outputSource = "./assets/css/";

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
		.src(inputSource + "**/*.scss")
		.pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
		.pipe(autoprefixer(browsersList))
		.pipe(header(banner))
		.pipe(gulp.dest(outputSource))
		.pipe(cleanCSS())
		.pipe(rename({ suffix: ".min" }))
		.pipe(gulp.dest(outputSource))
		.on("finish", function () {
			console.log("📦 Finished compiling styles.");
		});
}

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
			inputSource + "**/**/**/*.scss",
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
