import { interval } from 'rxjs';
import { bufferCount } from 'rxjs/operators';
const obs = interval(1000);
obs.pipe(
    bufferCount(2)
).subscribe((res) => {
    console.log(res);
});