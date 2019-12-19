import { run } from './run';
import { join } from 'path';
run({
    src: join(__dirname, '../'),
    output: 'dist',
    types: 'dist',
    tsconfig: join(__dirname, '../tsconfig.json'),
    watch: false
});
