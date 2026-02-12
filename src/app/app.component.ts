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
  private readonly visits = signal(
    [
      {
        from: '2026-02-13T10:00:00',
        to: '2026-02-15T12:00:00',
      },
    ]
      .map(({ from, to }) => ({
        from: DateTime.fromISO(from, { zone: ZONE }),
        to: DateTime.fromISO(to, { zone: ZONE }),
      }))
      .filter((visit): visit is Visit => visit.from.isValid && visit.to.isValid)
      .map(({ from, to }) => ({
        from: from.setLocale(LOCALE),
        to: to.setLocale(LOCALE),
      })),
  );

  private readonly earliestVisit = computed(() =>
    DateTime.min(...this.visits().map((visit) => visit.from)),
  );

  private readonly now = signal(DateTime.now());

  protected readonly timeLeft = computed(() =>
    this.earliestVisit()?.diff(this.now())?.shiftToAll(),
  );

  constructor() {
    setInterval(() => this.now.set(DateTime.now()), 250);
  }
}
