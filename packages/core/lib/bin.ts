#!/usr/bin/env node
import program from 'commander';
import { run, RunOptions } from './run';
import { join } from 'path';
const pkg = require('../package.json')
program.version(pkg.version)
    .option(`-c, --config <path>`, '配置文件路径')
    .option(`-w, --watch`, '监听文件变化')
    .parse(process.argv)
const path = program.path;
let options: RunOptions = {
    src: process.cwd(),
    output: 'dist',
    types: 'dist',
    tsconfig: join(process.cwd(), 'tsconfig.json'),
    watch: !!program.watch
};
try {
    options = require(path);
} catch (e) { }
try {
    run(options);
} catch (e) {
    throw e;
}
