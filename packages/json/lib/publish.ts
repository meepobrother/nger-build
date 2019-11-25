import { pack } from './pack';
import axios from 'axios';
import { removeSync } from 'fs-extra';
import { join } from 'path';

export async function publish(path: string) {
    const sub = pack(path);
    return (url: string) => axios.post(url, {
        data: sub.data,
        name: sub.name,
    }).catch(e => {
        console.log(`publish error ${e.message}`)
        removeSync(join(path, sub.name))
    }).then(e => {
        console.log(`nger-build success, http://10.0.0.4:9008/${sub.name}`)
        removeSync(join(path, sub.name))
    }).finally(() => {
        console.log(`publish error`)
        removeSync(join(path, sub.name))
    });
}
