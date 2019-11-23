// 打包发布
import { execSync } from 'child_process';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Subject } from 'rxjs';
import { createHash } from 'crypto';
export function pack(path: string): Subject<{
    buffer: Buffer,
    name: string,
    hash: string
}> {
    const res = execSync(`npm pack`, {
        cwd: path
    });
    const name = res.toString('utf8').replace('\n', '');
    const sub = new Subject<{
        buffer: Buffer,
        name: string,
        hash: string
    }>();
    const filename = join(path, name);
    const stream = createReadStream(filename);
    stream.on('data', (buffer: Buffer) => {
        const hash = createHash('sha256');
        hash.update(buffer);
        const data = { buffer, name, hash: hash.digest('hex') }
        sub.next(data);
    })
    stream.on(`close`, () => {
        sub.complete();
    });
    return sub;
}
