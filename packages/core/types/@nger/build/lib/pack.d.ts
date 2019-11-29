/// <reference types="node" />
import { Subject } from 'rxjs';
export declare function pack(path: string): Subject<{
    buffer: Buffer;
    name: string;
    hash: string;
}>;
