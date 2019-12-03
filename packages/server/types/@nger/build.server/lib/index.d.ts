#!/usr/bin/env node
/// <reference types="node" />
import { Response } from 'express';
export declare class Version {
    main: number;
    second: number;
    third: number;
    constructor(val: string);
    static comString(v1: string, v2: string): number;
    static com(v1: Version, v2: Version): number;
}
export declare class Upload {
    parseFileName(file: string): {
        name: string;
        version: string;
    };
    handler(file: string): string;
    getFile(file: string, res: Response): void;
    upload(data: Buffer, name: string): void;
}
export declare class AppModule {
}
export declare function bootstrap(): Promise<void>;
