import gulp from 'gulp';
import { join } from 'path';
import { watch } from 'chokidar';
import { publish } from './publish';
export interface RunOptions {
    src: string;
    output?: string;
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
    const output: string = options.output || 'dist';
    const inputs = [
        `${join(options.src, '**/*.json')}`,
        `${join(options.src, '*.json')}`,
        `!${join(options.src, '__tests__')}/**/*`,
        `!${join(options.src, '/**/__tests__')}/**/*`,
        `!${join(options.src, 'node_modules/**/*')}`,
        `!${join(options.src, '/**/node_modules')}/**/*`,
        `!${join(options.src, '/**/e2e')}/**/*`,
        `!${join(options.src, `${output}/**/*`)}`,
        `!${join(options.src, `**/angular.json`)}`,
        `!${join(options.src, `**/package.json`)}`,
        `!${join(options.src, `**/graphql.schema.json`)}`,
        `!${join(options.src, `**/tsconfig.app.json`)}`,
        `!${join(options.src, `**/tsconfig.json`)}`,
        `!${join(options.src, `**/tsconfig.spec.json`)}`,
        `!${join(options.src, `**/tsconfig.lib.json`)}`,
        `!${join(options.src, `**/ng-package.json`)}`,
        `!${join(options.src, `**/magnus.json`)}`,
        `!${join(options.src, `**/tslint.json`)}`,
        `!${join(options.src, `**/angular.json`)}`,
        `!${join(options.src, `graphql.schema.json`)}`,
        `!${join(options.src, `tsconfig.app.json`)}`,
        `!${join(options.src, `tsconfig.json`)}`,
        `!${join(options.src, `tsconfig.spec.json`)}`,
        `!${join(options.src, `package-lock.json`)}`,
        `!${join(options.src, `**/package-lock.json`)}`,
        `!${join(options.src, `magnus.json`)}`,
        `!${join(options.src, `tslint.json`)}`,
        `${join(options.src, `package.json`)}`
    ]
    const copy = () => {
        console.log(`i am copy...`);
        return fromEvent(gulp.src(inputs).pipe(
            gulp.dest(join(options.src, output))
        ))
    }
    const build = () => publish(join(options.src, output)).then(res => res('http://10.0.0.4:9008/upload'))
    if (options.watch) {
        watch(inputs).on('change', () => {
            copy().then(() => {
                return build();
            });
        })
    } else {
        copy().then(() => {
            return build();
        });
    }
}
