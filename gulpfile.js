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
const replace = require("gulp-replace");
const access = require("gulp-accessibility");
const isProd = process.env.NODE_ENV === "production";

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
srcOutput.img = "./assets/images/";
srcOutput.fonts = "./assets/fonts/";

const srcPublic = {};
srcPublic.root = "./public/";
srcPublic.js = "./public/assets/js/";
srcPublic.css = "./public/assets/css/";
srcPublic.img = "./public/assets/images/";
srcPublic.fonts = "./public/assets/fonts/";

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
 * 🗂️ Copy required files
 *
 * @since 1.0.0
 */
gulp.task("copy-css", function () {
	if ( isProd ) {
		return gulp
			.src([srcOutput.css + "**"])
			.pipe(gulp.dest(srcPublic.css));
	}

	return gulp.src(["."]); // do nothing
});

gulp.task("copy-js", function () {
	if ( isProd ) {
		return gulp
			.src([srcOutput.js + "**"])
			.pipe(gulp.dest(srcPublic.js));
	}

	return gulp.src(["."]); // do nothing
});

gulp.task("copy-html", function () {
	if ( isProd ) {
		return gulp
			.src(["./*.html"])
			.pipe(gulp.dest(srcPublic.root));
	}

	return gulp.src(["."]); // do nothing
});

gulp.task("copy-img", function () {
	if ( isProd ) {
		return gulp
			.src([srcOutput.img + "**"])
			.pipe(gulp.dest(srcPublic.img));
	}

	return gulp.src(["."]); // do nothing
});

gulp.task("copy-fonts", function () {
	if ( isProd ) {
		return gulp
			.src([srcOutput.fonts + "**", "!" + srcOutput.fonts + "*.json"])
			.pipe(gulp.dest(srcPublic.fonts));
	}

	return gulp.src(["."]); // do nothing
});

gulp.task("copy", gulp.series(["copy-css", "copy-js", "copy-img", "copy-fonts", "copy-html"]));

/**
 * 📝 Rewrite PATHS
 * 
 * This task replaces references to `js/dist/` with `js/` in files
 * that have already been copied into the public folder.
 * 
 * Runs only in production mode.
 * 
 * @since 1.0.0
 */
gulp.task("rewrite", function () {
	if ( isProd ) {
		return gulp
			.src(srcPublic.root + "*.html")
			.pipe(replace("js/dist/", "js/"))
			.pipe(gulp.dest(srcPublic.root));
	}
});

/**
 * 📦 Build CSS
 *
 * - Linter issues
 * - Concat files into one
 * - Minify concated file
 *
 * @since 1.0.0
 */
gulp.task("styles", function () {
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
			.pipe(gulp.dest(isProd ? srcPublic.css : srcOutput.css))
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

gulp.task("scripts", function () {
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
			.pipe(gulp.dest(isProd ? srcPublic.js : srcOutput.js))
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
gulp.task("compile", gulp.series(["styles", "scripts"]));

/**
 * 🧹 Clean Public
 * 
 * This task removes the `public` folder. Usually runs before
 * deployment tasks to ensure everything is properly clean
 * and there are no duplications.
 * 
 * @since 1.0.0
 */
gulp.task("clean", function () {
	const del = require("del");
	return isProd ? del([srcPublic.root]) : Promise.resolve();
});

/**
 * 🧪 Accessibility
 *
 * Lints WCAG2A suggestions:
 * - [NOTICE]  Elements to pay attention and run manual checks.
 * - [WARNING] Elements that require an improvement.
 * - [ERROR]   Important semantic improvements.
 *
 * @since 1.0.0
 */
gulp.task("a11y", function () {
	return gulp
		.src("index.html")
		.pipe(
			access({
				force: true,
			})
		)
		.on("error", console.log)
		.pipe(access.report({ reportType: "txt" }))
		.pipe(
			rename({
				extname: ".txt",
			})
		)
		.pipe(gulp.dest("reports/txt"));
});

/**
 * 🧑🏻‍💻 Watch Changes
 *
 * Task written for development mode.
 *
 * @since 1.0.0
 */
gulp.task("watch", function () {
	gulp.watch(srcInput.css + "**/**/**/*.scss", gulp.series(["styles"]));
	gulp.watch(srcInput.js + "*.js", gulp.series(["scripts"]));
});

/**
 * 💾 Build
 * 
 * Task written for development mode.
 * 
 * @since 1.0.0
 */
gulp.task("build", gulp.series(["compile"]));

/**
 * 🚀 Deploy
 *
 * Task written for production mode.
 *
 * @since 1.0.0
 */
gulp.task("deploy", gulp.series(["clean", "compile", "copy", "rewrite"]));
