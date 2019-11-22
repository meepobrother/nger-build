// 打包发布
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join } from 'path';
export function pack(path: string): {
    data: any,
    name: string
} {
    const res = execSync(`npm pack`, {
        cwd: path
    });
    const name = res.toString('utf8').replace('\n', '');
    const data = readFileSync(join(path, name))
    return {
        data,
        name
    }
}
