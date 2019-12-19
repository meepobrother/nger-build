#!/usr/bin/env node
import program from 'commander';
import { run, RunOptions } from './run';
import { join } from 'path';
import { findConfigFile } from 'typescript';
import { existsSync } from 'fs';
import golb from 'glob';
const root = process.cwd();
const lernaPath = join(root, 'lerna.json')
if (existsSync(lernaPath)) {
    const lerna = require(lernaPath);
    const packages = lerna.packages as string[];
    const pkg = packages[0]
    const dist = join(root, program.output || 'dist');
    golb(join(root, pkg), (err: Error | null, matches: string[]) => {
        if (err) throw err;
        matches.map(match => {
            const packageJson = require(join(match, 'package.json'))
            const defaultConfig = findConfigFile(match, (file: string) => {
                return existsSync(file);
            }) || join(match, 'tsconfig.json')
            const host = program.host || 'http://10.0.0.4:9008';
            let options: RunOptions = {
                src: match,
                output: join(dist, packageJson.name),
                types: join(dist, `${packageJson.name}.types`),
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
        })
    })
}
