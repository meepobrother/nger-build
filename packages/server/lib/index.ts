#!/usr/bin/env node
import { NestFactory } from '@nestjs/core';
import { Module, Controller, Post, Body, Get } from '@nestjs/common';
import { writeFileSync, ensureDirSync } from 'fs-extra';
import { join } from 'path';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
@Controller()
export class Upload {

    @Get()
    hello() {
        return `welcome to use nger build!`
    }

    @Post('upload')
    upload(@Body('data') data: Buffer, @Body('name') name: string) {
        ensureDirSync(join(__dirname, 'uploads'));
        writeFileSync(join(__dirname, 'uploads', name), Buffer.from(data))
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
    app.use(express.static(join(__dirname, 'uploads')))
    app.listen(9008, () => {
        console.log(`hello`)
    })
}
bootstrap();
