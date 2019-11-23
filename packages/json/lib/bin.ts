#!/usr/bin/env node
import program from 'commander';
import { run, RunOptions } from './run';
import { join } from 'path';
const pkg = require('../package.json')
program.version(pkg.version)
    .option(`-w, --watch`, '监听文件变化')
    .option(`-o, --output [path]`, '输出文件')
    .parse(process.argv)
const root = process.cwd();
const output = join(program.output || 'dist');
const options: RunOptions = {
    src: root,
    output: output,
    watch: !!program.watch
};
try {
    run(options);
} catch (e) {
    throw e;
}
