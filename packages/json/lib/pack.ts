// 打包发布
import { execSync } from 'child_process';
import { join } from 'path';
import { readFileSync } from 'fs-extra';
export function pack(path: string): {
    data: Buffer;
    name: string;
} {
    const res = execSync(`npm pack`, {
        cwd: path
    });
    const name = res.toString('utf8').replace('\n', '');
    const filename = join(path, name);
    return { data: readFileSync(filename), name: filename }
}
