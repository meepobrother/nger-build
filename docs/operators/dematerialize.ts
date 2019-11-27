import { of, Notification } from 'rxjs';
import { dematerialize } from 'rxjs/operators';

const notifA = new Notification<string>('N', 'A');
const notifB = new Notification<string>('N', 'B');
const notifE = new Notification<string>('E', undefined,
    new TypeError('x.toUpperCase is not a function')
);
const materialized = of(notifA, notifB, notifE);
const upperCase = materialized.pipe(dematerialize());
upperCase.subscribe((x: any) => console.log(x), (e: any) => console.error(e));