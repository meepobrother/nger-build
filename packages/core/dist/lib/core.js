"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var run_1 = require("./run");
var path_1 = require("path");
run_1.run({
    src: path_1.join(__dirname, '..'),
    output: 'dist',
    types: 'dist',
    tsconfig: path_1.join(__dirname, '../tsconfig.json')
});
