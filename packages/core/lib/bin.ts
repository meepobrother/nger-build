#!/usr/bin/env node
import program from 'commander';
import { run, RunOptions } from './run';
import { join } from 'path';
import { findConfigFile } from 'typescript';
import { existsSync } from 'fs';
const pkg = require('../package.json')
program.version(pkg.version)
    .option(`-w, --watch`, '监听文件变化')
    .option(`-o, --output [output]`, '输出文件')
    .option(`-p, --publish`, '上传文件')
    .option(`-h, --host [host]`, '上传链接')
    .parse(process.argv)
const root = process.cwd();
const packageJson = require(join(root, 'package.json'))
const defaultConfig = findConfigFile(process.cwd(), (file: string) => {
    return existsSync(file);
}) || join(process.cwd(), 'tsconfig.json')
const output = join(root, program.output || 'dist', packageJson.name);
const types = join(root, program.types || 'types', `${packageJson.name}.types`);
const host = program.host || 'http://10.0.0.4:9008';
let options: RunOptions = {
    src: process.cwd(),
    output: output,
    types: types,
    tsconfig: defaultConfig,
    watch: !!program.watch,
    name: packageJson.name,
    publish: !!program.publish,
    host: host
};
try {
    run(options);
} catch (e) {
    throw e;
}
