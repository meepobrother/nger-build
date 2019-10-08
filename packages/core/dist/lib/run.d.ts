export interface RunOptions {
    src: string;
    tsconfig: string;
    output?: string;
    types?: string;
    watch?: boolean;
}
export declare function run(options: RunOptions): void;
