import gulp from 'gulp';
import { createProject } from 'gulp-typescript';
import { join } from 'path';
export interface RunOptions {
    src: string;
    output: string;
    types: string;
    tsconfig: string;
    watch: boolean;
}
function fromEvent(event: any) {
    return new Promise((resolve, reject) => {
        event.on('end', () => {
            resolve()
        })
    })
}
export function run(options: RunOptions) {
    const tsProject = createProject(options.tsconfig);
    const inputs = [
        join(options.src, '**/*.ts'),
        `!${join(options.src, options.output)}/**/*`,
        `!${join(options.src, '__tests__')}/**/*`,
        `!${join(options.src, '/**/__tests__')}/**/*`,
        `!${join(options.src, 'node_modules')}/**/*`,
        `!${join(options.src, '/**/node_modules')}/**/*`
    ];
    gulp.task("compiler", (done: any) => {
        console.log(`compiling...`)
        const tsResult = gulp.src(inputs)
            .pipe(tsProject())
        const js = tsResult.js.pipe(gulp.dest(options.output));
        const dts = tsResult.dts.pipe(gulp.dest(options.types));
        Promise.all([fromEvent(js), fromEvent(dts)]).then(res => {
            done && done();
        })
    });
    gulp.task("copy", (done: any) => {
        console.log(`copy...`)
        const inputs = [
            join(options.src, 'package.json'),
            join(options.src, '*.md'),
            join(options.src, '**/*.md'),
            join(options.src, '**/*.json'),
            join(options.src, '**/*.graphql'),
            join(options.src, '**/*.proto'),
            `!${join(options.src, '__tests__')}/**/*`,
            `!${join(options.src, '/**/__tests__')}/**/*`,
            `!${join(options.src, 'node_modules/**/*')}`,
            `!${join(options.src, '/**/node_modules')}/**/*`,
            `!${join(options.src, `${options.output}/**/*`)}`,
        ]
        fromEvent(gulp.src(inputs).pipe(
            gulp.dest(options.output)
        )).then(() => {
            done && done();
        });
    });
    gulp.series("compiler", "copy")((done) => {
        done && done();
    });
    if (!!options.watch) {
        gulp.watch(inputs, gulp.series("compiler", "copy"))
    }
}
