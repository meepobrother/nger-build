export interface RunOptions {
    src: string;
    output: string;
    types: string;
    tsconfig: string;
    watch: boolean;
}
export declare function run(options: RunOptions): void;
