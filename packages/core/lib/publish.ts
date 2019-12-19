import { pack } from './pack';
import axios from 'axios';
import { removeSync } from 'fs-extra';
import { join } from 'path';
export async function publish(path: string, host?: string) {
    const sub = pack(path);
    return (url: string) => sub.subscribe(res => {
        axios.post(url, {
            data: res.buffer,
            name: res.name,
            hash: res.hash
        }).catch(e => {
            removeSync(join(path, res.name))
        }).then(e => {
            console.log(`nger-build success, ${host?host:""}/${res.name}`)
            removeSync(join(path, res.name))
        }).finally(() => {
            removeSync(join(path, res.name))
        });
    }, (err: Error) => {
        console.log(`error`)
    }, () => {
        console.log(`complete`)
    })
}
