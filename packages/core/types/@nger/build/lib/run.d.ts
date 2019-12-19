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
export declare function run(options: RunOptions): void;
