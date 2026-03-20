import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { DateTime } from 'luxon';
import { CountdownUnitComponent } from './countdown-unit/countdown-unit.component';

const LOCALE = 'da-DK';
const ZONE = 'Europe/Copenhagen';

interface Visit {
  from: DateTime<true>;
  to: DateTime<true>;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CountdownUnitComponent],
})
export class AppComponent {
  private readonly now = signal(DateTime.now());

  private readonly visits = signal(
    [
      {
        from: '2026-02-13T11:15:00',
        to: '2026-02-15T12:00:00',
      },
      {
        from: '2026-03-21T08:00:00',
        to: '2026-03-21T19:00:00',
      },
      {
        from: '2026-08-02T10:00:00',
        to: '2026-08-09T12:00:00',
      },
    ]
      .map(({ from, to }) => ({
        from: DateTime.fromISO(from, { zone: ZONE }),
        to: DateTime.fromISO(to, { zone: ZONE }),
      }))
      .filter((visit): visit is Visit => visit.from.isValid && visit.to.isValid)
      .map(
        ({ from, to }): Visit => ({
          from: from.setLocale(LOCALE),
          to: to.setLocale(LOCALE),
        }),
      ),
  );

  private readonly futureVisits = computed(() =>
    this.visits().filter(
      (visit) => visit.from.diff(this.now()).toMillis() >= 0,
    ),
  );

  private readonly earliestVisit = computed(() =>
    DateTime.min(...this.futureVisits().map((visit) => visit.from)),
  );

  protected readonly timeLeft = computed(() =>
    this.earliestVisit()?.diff(this.now())?.shiftToAll(),
  );

  constructor() {
    setInterval(() => this.now.set(DateTime.now()), 250);
  }
}
