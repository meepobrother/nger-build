#!/usr/bin/env node
import program from 'commander';
import { run, RunOptions } from './run';
import { join } from 'path';
import { findConfigFile } from 'typescript';
import { existsSync } from 'fs';
const pkg = require('../package.json')
program.version(pkg.version)
    .option(`-c, --config <path>`, '配置文件路径')
    .option(`-w, --watch`, '监听文件变化')
    .option(`-o, --output`, '输出文件')
    .parse(process.argv)
const path = program.path;
const root = process.cwd();
const packageJson = require(join(root, 'package.json'))
const output = join(program.output || 'dist', packageJson.name);

const defaultConfig = findConfigFile(process.cwd(), (file: string) => {
    return existsSync(file);
}) || join(process.cwd(), 'tsconfig.json')
let options: RunOptions = {
    src: process.cwd(),
    output: output,
    types: output,
    tsconfig: defaultConfig,
    watch: !!program.watch
};
try {
    options = require(path);
} catch (e) {
    // console.log(e)
}
try {
    run(options);
} catch (e) {
    throw e;
}
