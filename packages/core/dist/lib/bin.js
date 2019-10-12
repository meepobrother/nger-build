#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var run_1 = require("./run");
var path_1 = require("path");
var typescript_1 = require("typescript");
var fs_1 = require("fs");
var pkg = require('../package.json');
commander_1.default.version(pkg.version)
    .option("-c, --config <path>", '配置文件路径')
    .option("-w, --watch", '监听文件变化')
    .parse(process.argv);
var path = commander_1.default.path;
var defaultConfig = typescript_1.findConfigFile(process.cwd(), function (file) {
    return fs_1.existsSync(file);
}) || path_1.join(process.cwd(), 'tsconfig.json');
var options = {
    src: process.cwd(),
    output: 'dist',
    types: 'dist',
    tsconfig: defaultConfig,
    watch: !!commander_1.default.watch
};
try {
    options = require(path);
}
catch (e) {
    // console.log(e)
}
try {
    run_1.run(options);
}
catch (e) {
    throw e;
}
