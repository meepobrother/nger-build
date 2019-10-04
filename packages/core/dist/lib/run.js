"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gulp_1 = __importDefault(require("gulp"));
var gulp_typescript_1 = require("gulp-typescript");
var path_1 = require("path");
function fromEvent(event) {
    return new Promise(function (resolve, reject) {
        event.on('end', function () {
            resolve();
        });
    });
}
function run(options) {
    var tsProject = gulp_typescript_1.createProject(options.tsconfig);
    var inputs = [
        path_1.join(options.src, '**/*.ts'),
        "!" + path_1.join(options.src, options.output) + "/**/*",
        "!" + path_1.join(options.src, '__tests__') + "/**/*",
        "!" + path_1.join(options.src, '/**/__tests__') + "/**/*",
        "!" + path_1.join(options.src, 'node_modules') + "/**/*",
        "!" + path_1.join(options.src, '/**/node_modules') + "/**/*"
    ];
    gulp_1.default.task("compiler", function (done) {
        console.log("compiling...");
        var tsResult = gulp_1.default.src(inputs)
            .pipe(tsProject());
        var js = tsResult.js.pipe(gulp_1.default.dest(options.output));
        var dts = tsResult.dts.pipe(gulp_1.default.dest(options.types));
        Promise.all([fromEvent(js), fromEvent(dts)]).then(function (res) {
            done && done();
        });
    });
    gulp_1.default.task("copy", function (done) {
        console.log("copy...");
        var inputs = [
            path_1.join(options.src, 'package.json'),
            path_1.join(options.src, '*.md'),
            path_1.join(options.src, '**/*.md'),
            path_1.join(options.src, '**/*.json'),
            path_1.join(options.src, '**/*.graphql'),
            path_1.join(options.src, '**/*.proto'),
            "!" + path_1.join(options.src, '__tests__') + "/**/*",
            "!" + path_1.join(options.src, '/**/__tests__') + "/**/*",
            "!" + path_1.join(options.src, 'node_modules/**/*'),
            "!" + path_1.join(options.src, '/**/node_modules') + "/**/*",
            "!" + path_1.join(options.src, options.output + "/**/*"),
        ];
        fromEvent(gulp_1.default.src(inputs).pipe(gulp_1.default.dest(options.output))).then(function () {
            done && done();
        });
    });
    gulp_1.default.series("compiler", "copy")(function (done) {
        done && done();
    });
    if (!!options.watch) {
        gulp_1.default.watch(inputs, gulp_1.default.series("compiler", "copy"));
    }
}
exports.run = run;
