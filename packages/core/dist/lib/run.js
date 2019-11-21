"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gulp_1 = __importDefault(require("gulp"));
var gulp_typescript_1 = require("gulp-typescript");
var path_1 = require("path");
var chokidar_1 = require("chokidar");
function fromEvent(event) {
    return new Promise(function (resolve, reject) {
        event.on('end', function () {
            resolve();
        });
        event.on("error", function (e) {
            reject(e);
        });
    });
}
function run(options) {
    var tsconfig = require(options.tsconfig);
    var output = options.output || 'dist';
    var exclude = __spread(tsconfig.exclude.map(function (inc) { return "!" + path_1.join(options.src, inc, '**/*.ts'); }), tsconfig.exclude.map(function (inc) { return "!" + path_1.join(options.src, inc, '/**/*.ts'); }));
    var tsFiles = [];
    tsconfig.include.map(function (inc) {
        tsFiles.push(path_1.join(options.src, inc, '*.ts'));
        tsFiles.push(path_1.join(options.src, inc, '**/*.ts'));
    });
    gulp_1.default.task("compiler", function (done) {
        console.log("i am compiling...");
        var pros = tsconfig.include.map(function (inc) {
            var tsProject = gulp_typescript_1.createProject(options.tsconfig);
            var tsResult = gulp_1.default.src(__spread([
                path_1.join(options.src, inc, '*.ts'),
                path_1.join(options.src, inc, '**/*.ts')
            ], exclude)).pipe(tsProject()).pipe(gulp_1.default.dest(path_1.join(options.src, output, inc)));
            return fromEvent(tsResult).catch(function (e) { return done && done(e); });
        });
        Promise.all(pros).then(function (res) {
            done && done();
        });
    });
    gulp_1.default.task("copy", function (done) {
        console.log("i am copy...");
        var incs = tsconfig.include.map(function (inc) {
            var src = gulp_1.default.src("" + path_1.join(options.src, inc, '**/*.{json,graphql,proto,notadd,tpl,html,css}')).pipe(gulp_1.default.dest(path_1.join(options.src, output, inc)));
            return fromEvent(src);
        });
        var inputs = [
            path_1.join(options.src, 'package.json'),
            path_1.join(options.src, 'readme.md'),
            path_1.join(options.src, 'README.md'),
            "!" + path_1.join(options.src, '__tests__') + "/**/*",
            "!" + path_1.join(options.src, '/**/__tests__') + "/**/*",
            "!" + path_1.join(options.src, 'node_modules/**/*'),
            "!" + path_1.join(options.src, '/**/node_modules') + "/**/*",
            "!" + path_1.join(options.src, options.output + "/**/*"),
            "!" + options.tsconfig
        ];
        incs.push(fromEvent(gulp_1.default.src(inputs).pipe(gulp_1.default.dest(output))).catch(function (e) { return done && done(e); }));
        Promise.all(incs).then(function () {
            done && done();
        });
    });
    gulp_1.default.task("start", function (done) {
        gulp_1.default.series("compiler", "copy")(function (done) {
            done && done();
        });
    });
    if (options.watch) {
        chokidar_1.watch(tsFiles).on('change', function () {
            gulp_1.default.series("start")(function () {
                console.log("\u6587\u4EF6\u53D8\u5316");
            });
        });
    }
    else {
        gulp_1.default.series("start")(function (done) { return done && done(); });
    }
}
exports.run = run;
