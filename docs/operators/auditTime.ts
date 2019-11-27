import { interval } from 'rxjs';
import { auditTime } from 'rxjs/operators';
const obs = interval(1000);
obs.pipe(
    auditTime(3000)
).subscribe((res) => {
    console.log(res);
})