import { interval } from 'rxjs';
import { bufferTime } from 'rxjs/operators';
const obs = interval(1000);
obs.pipe(
    bufferTime(2000)
).subscribe((res) => {
    console.log(res);
});