import gulp from 'gulp';
import { createProject } from 'gulp-typescript';
import { join } from 'path';
import { watch } from 'chokidar';
import { existsSync } from 'fs';
import { publish } from './publish'
export interface RunOptions {
    src: string;
    tsconfig: string;
    output?: string;
    types?: string;
    watch?: boolean;
    name?: string;
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
            ).pipe(
                gulp.dest(join(options.src, output, inc))
            );
            return fromEvent(tsResult).catch(e => done && done(e));
        });
        Promise.all(
            pros
        ).then(res => {
            done && done();
        });
    });
    gulp.task("copy", (done: any) => {
        console.log(`i am copy...`)
        const incs = tsconfig.include.map((inc: string) => {
            const src = gulp.src(`${join(options.src, inc, '**/*.{json,graphql,proto,notadd,tpl,html,css}')}`).pipe(
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
            done && done();
        })
    });
    const build = () => publish(join(options.src, output)).then(res => res('http://10.0.0.4:9008/upload'))
    gulp.task(`start`, (done: any) => {
        gulp.series("compiler", "copy")((done) => {
            build()
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
        gulp.series(`start`)((done) => {
            build();
            done && done()
        });
    }
}
