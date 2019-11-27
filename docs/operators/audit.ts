import { interval } from 'rxjs';
import { audit } from 'rxjs/operators';
const obs = interval(1000);
const obs1 = interval(2000);
obs.pipe(
    audit(() => obs1)
).subscribe((res) => {
    console.log(res);
})