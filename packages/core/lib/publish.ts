import { pack } from './pack';
import axios from 'axios';
import { removeSync } from 'fs-extra';
import { join } from 'path';
export async function publish(path: string) {
    const { data, name } = await pack(path);
    return (url: string) => axios.post(url, {
        data,
        name
    }).catch().then(e => {
        console.log(`nger-build success, http://10.0.0.4:9008/${name}`)
        removeSync(join(path, name))
    });
}
