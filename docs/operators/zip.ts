// RxJS v6+
import { take, timeInterval } from 'rxjs/operators';
import { interval, zip, range } from 'rxjs';

// 每1秒发出值
const source = interval(1000);
// 当一个 observable 完成时，便不会再发出更多的值了
const example1 = zip(source, source.pipe(take(3)));
// 输出: [0,0]...[1,1]
const subscribe2 = example1.subscribe(val => console.log(val));

// RxJS v6+
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';

const sourceOne = of('Hello');
const sourceTwo = of('World!');
const sourceThree = of('Goodbye');
const sourceFour = of('World!');
// 一直等到所有 observables 都发出一个值，才将所有值作为数组发出
const example = zip(
    sourceOne,
    sourceTwo.pipe(delay(1000)),
    sourceThree.pipe(delay(2000)),
    sourceFour.pipe(delay(3000))
);
// 输出: ["Hello", "World!", "Goodbye", "World!"]
const subscribe = example.subscribe(val => console.log(val));