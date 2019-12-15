#!/usr/bin/env node
import program from 'commander';
import { run, RunOptions } from './run';
import { join } from 'path';
import { findConfigFile } from 'typescript';
import { existsSync } from 'fs';
const pkg = require('../package.json')
program.version(pkg.version)
    .option(`-w, --watch`, '监听文件变化')
    .option(`-o, --output [path]`, '输出文件')
    .option(`-p, --publish`, '上传文件')
    .parse(process.argv)
const root = process.cwd();
const packageJson = require(join(root, 'package.json'))
const defaultConfig = findConfigFile(process.cwd(), (file: string) => {
    return existsSync(file);
}) || join(process.cwd(), 'tsconfig.json')
const output = join(program.output || 'dist', packageJson.name);
const types = join(program.types || 'types', packageJson.name);

let options: RunOptions = {
    src: process.cwd(),
    output: output,
    types: types,
    tsconfig: defaultConfig,
    watch: !!program.watch,
    name: packageJson.name,
    publish: !!program.publish
};
try {
    run(options);
} catch (e) {
    throw e;
}
