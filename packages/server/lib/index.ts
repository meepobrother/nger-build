#!/usr/bin/env node
import { NestFactory } from '@nestjs/core';
import { Module, Controller, Post, Body, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import { ExpressAdapter } from '@nestjs/platform-express';
import { readdirSync, ensureDirSync, writeFileSync } from 'fs-extra';
import express from 'express';

export class Version {
    main: number;
    second: number;
    third: number;
    constructor(val: string) {
        const [main, second, third] = val.split('.');
        this.main = parseInt(main)
        this.second = parseInt(second)
        this.third = parseInt(third)
    }
    // 1.1.0 1.0.9
    static comString(v1: string, v2: string): number {
        return this.com(new Version(v1), new Version(v2))
    }
    //1.0.9 1.1.0 
    static com(v1: Version, v2: Version): number {
        if (v1.main < v2.main) {
            return 1;
        }
        if (v1.second < v2.second) {
            return 1;
        }
        if (v1.third < v2.third) {
            return 1;
        }
        return -1;
    }
}
@Controller()
export class Upload {
    parseFileName(file: string): { name: string, version: string } {
        const ext = path.extname(file);
        file = file.replace(ext, '');
        const files = file.split('-');
        let version = files.pop() as string;
        const fileName = files.join('-');
        return {
            name: fileName,
            version: version
        }
    }
    handler(file: string) {
        const { name, version } = this.parseFileName(file);
        if (version === 'latest') {
            const files = readdirSync(path.join(__dirname, 'uploads'))
                .filter(it => this.parseFileName(it).name === name)
                .sort((a, b) => {
                    return Version.comString(this.parseFileName(b).version, this.parseFileName(a).version)
                }).reverse();
            if (files.length > 0) {
                return path.join(__dirname, 'uploads', files[0]);
            }
            throw new Error(`没找到文件`)
        } else {
            return path.join(__dirname, 'uploads', file)
        }
    }

    @Get(`/:file`)
    getFile(@Param(`file`) file: string, @Res() res: Response) {
        res.sendFile(this.handler(file))
    }

    @Post('upload')
    upload(@Body('data') data: Buffer, @Body('name') name: string) {
        ensureDirSync(path.join(__dirname, 'uploads'));
        writeFileSync(path.join(__dirname, 'uploads', name), Buffer.from(data))
    }
}

@Module({
    controllers: [Upload]
})
export class AppModule { }
export async function bootstrap() {
    const server = express();
    server.use(express.json({
        limit: `${1024 * 20}kb`
    }));
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server))
    // app.use(express.static(path.join(__dirname, 'uploads')));
    app.listen(9008, () => {
        console.log(`hello`)
    });
}
bootstrap();
