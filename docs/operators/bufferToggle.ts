import { interval } from 'rxjs';
import { bufferToggle } from 'rxjs/operators';
const obs = interval(1000);
const open = interval(2000);
const close = interval(3000);
obs.pipe(
    bufferToggle(open, (value) => close)
).subscribe((res) => {
    console.log(res);
});