## nger-build
打包typescript开发的nodejs应用

## install
```ts
npm i -g nger-build
```

## build
```ts
nger-build 构建
nger-build -c path/options.json 指定配置文件
nger-build -w/--watch 监听文件变化
```

## config
```ts
export interface RunOptions {
    /**
     * 源文件
     **/
    src: string;
    /**
     * ts config 配置文件
     */
    tsconfig: string;
    /**
     * 目标目录
     **/
    output?: string;
    /**
     * declare 文件目录
     **/
    types?: string;
    /**
     * 监听开关
     **/
    watch?: boolean;
}
```
