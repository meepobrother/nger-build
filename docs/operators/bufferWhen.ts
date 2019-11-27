import { interval } from 'rxjs';
import { bufferWhen } from 'rxjs/operators';
const obs = interval(1000);
const open = interval(2000);
obs.pipe(
    bufferWhen(() => open)
).subscribe((res) => {
    console.log(res);
});