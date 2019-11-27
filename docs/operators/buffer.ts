import { interval } from 'rxjs';
import { buffer } from 'rxjs/operators';
const obs = interval(1000);
const obs1 = interval(4000);
obs.pipe(
    buffer(obs1)
).subscribe((res) => {
    console.log(res);
});