import gulp from 'gulp';
import { createProject } from 'gulp-typescript';
import { join } from 'path';
import { watch } from 'chokidar';
import { existsSync, writeFileSync, readFileSync } from 'fs';
import { publish } from './publish'
export interface RunOptions {
    src: string;
    tsconfig: string;
    output?: string;
    types?: string;
    watch?: boolean;
    name?: string;
    publish?: boolean;
    host?: string;
}
function fromEvent(event: any) {
    return new Promise((resolve, reject) => {
        event.on('end', () => {
            resolve()
        });
        event.on(`error`, (e: Error) => {
            reject(e)
        });
    });
}
export function run(options: RunOptions) {
    const tsconfig = require(options.tsconfig);
    const output: string = options.output || 'dist';
    const types: string = options.types || 'types2';
    tsconfig.exclude = tsconfig.exclude || [];
    tsconfig.include = tsconfig.include || [];
    const exclude = [
        ...tsconfig.exclude.map((inc: string) => `!${join(options.src, inc, '*.ts')}`),
        ...tsconfig.exclude.map((inc: string) => `!${join(options.src, inc, '/**/*.ts')}`),
    ];
    const tsFiles: string[] = [];
    tsconfig.include.map((inc: string) => {
        tsFiles.push(join(options.src, inc, '*.ts'))
        tsFiles.push(join(options.src, inc, '**/*.ts'))
    });
    gulp.task(`dts`, (done: any) => {
        console.log(`i am compiling dts...`);
        const pros = tsconfig.include.map((inc: string) => {
            const tsProject = createProject(options.tsconfig, {
                declaration: true
            });
            const tsResult = gulp.src([
                join(options.src, inc, '*.ts'),
                join(options.src, inc, '**/*.ts'),
                `!${join(options.src, options.output || '')}`,
                ...exclude
            ]).pipe(
                tsProject()
            )
            const dts = fromEvent(tsResult.dts.pipe(
                gulp.dest(join(options.src, types, inc))
            ))
            return dts;
        });
        Promise.all(
            pros
        ).then(res => {
            console.log(`i am compiling dts finish`)
            const pkg = JSON.parse(readFileSync(join(options.src, 'package.json')).toString('utf8'))
            delete pkg.main;
            pkg.name = `${pkg.name}.types`
            writeFileSync(join(options.src, types, 'package.json'), JSON.stringify(pkg, null, 2))
            const build = () => publish(join(options.src, types),options.host).then(res => res(`${options.host}/upload`))
            if (options.publish) build();
            done && done();
        });
    })
    gulp.task("compiler", (done: any) => {
        console.log(`i am compiling...`);
        const pros = tsconfig.include.map((inc: string) => {
            const tsProject = createProject(options.tsconfig);
            const tsResult = gulp.src([
                join(options.src, inc, '*.ts'),
                join(options.src, inc, '**/*.ts'),
                `!${join(options.src, options.output || '')}`,
                ...exclude
            ]).pipe(
                tsProject()
            )
            const js = fromEvent(tsResult.pipe(
                gulp.dest(join(options.src, output, inc))
            ))
            return js;
        });
        Promise.all(
            pros
        ).then(res => {
            console.log(`i am compiling finish`);
            done && done();
        });
    });
    gulp.task("copy", (done: any) => {
        console.log(`i am copy...`)
        const incs = tsconfig.include.map((inc: string) => {
            const src = gulp.src(`${join(options.src, inc, '**/*.{json,graphql,proto,notadd,tpl,html,css,jpg,png,md,ico,svg,htm,yml,jpeg,mp4,mp3}')}`).pipe(
                gulp.dest(join(options.src, output, inc))
            )
            return fromEvent(src)
        });
        const inputs = [
            `!${join(options.src, '__tests__')}/**/*`,
            `!${join(options.src, '/**/__tests__')}/**/*`,
            `!${join(options.src, 'node_modules/**/*')}`,
            `!${join(options.src, '/**/node_modules')}/**/*`,
            `!${join(options.src, `${output}/**/*`)}`,
            `!${options.tsconfig}`
        ]
        if (existsSync(join(options.src, 'README.md'))) {
            inputs.push(join(options.src, 'README.md'))
        }
        if (existsSync(join(options.src, 'readme.md'))) {
            inputs.push(join(options.src, 'readme.md'))
        }
        if (existsSync(join(options.src, 'package.json'))) {
            inputs.push(join(options.src, 'package.json'))
        }
        if (existsSync(join(options.src, 'env.back'))) {
            inputs.push(join(options.src, 'env.back'))
        }
        incs.push(fromEvent(gulp.src(inputs).pipe(
            gulp.dest(join(options.src, output))
        )).catch(e => done && done(e)));
        Promise.all(incs).then(() => {
            console.log(`i am copy finish`)
            done && done();
        })
    });
    const build = () => publish(join(options.src, output)).then(res => res('http://10.0.0.4:9008/upload'))
    gulp.task(`start`, (done: any) => {
        gulp.series("compiler", "dts", "copy")((done) => {
            if (options.publish) build()
            done && done();
        });
    });
    if (options.watch) {
        watch(tsFiles).on('change', () => {
            gulp.series(`start`)(() => {
                console.log(`文件变化`)
            });
        })
    } else {
        gulp.series("compiler", "dts", "copy")((done) => {
            if (options.publish) build()
            done && done();
        });
    }
}
