import { interval, of } from 'rxjs';
import { catchError, tap, map, take } from 'rxjs/operators';
const obs = of(1, 2, 3, 4, 5);
obs.pipe(
    map(n => {
        if (n === 4) {
            throw 'four!';
        }
        return n;
    }),
    catchError((err, caught) => {
        return caught
    }),
    take(30)
).subscribe(console.log);