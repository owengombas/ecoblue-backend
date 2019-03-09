import { Subject } from "rxjs";

export class Timing {
  static readonly range = 15;
  static readonly unitPerDay = 24 * 60 / Timing.range;
  static readonly tickSubject: Subject<number> = new Subject();
  static readonly newDaySubject: Subject<number> = new Subject();

  static timer() {
    // if (this.currentTimeRangeIndex === 0) {
      this.newDaySubject.next(this.currentDayIndex);
    // }
    this.tickSubject.next(this.currentTimeRangeIndex);
    console.log(Timing.convertToMinutes(Timing.nextTimeRange));
    setTimeout(this.timer.bind(this), Timing.nextTimeRange);
  }

  static get currentTimeRangeIndex() {
    const now = new Date();
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0, 0, 0
    );
    return Math.floor(
      ((new Date()).getTime() - midnight.getTime()) / 1000 / 60 / Timing.range
    );
  }

  static get currentDayIndex() {
    return (new Date()).getDay();
  }

  static get today() {
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    return today;
  }

  static get yesterday() {
    const yesterday = this.today;
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
  }

  static get timeToReachMidnight() {
    const now = new Date();
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0, 0, 0
    );
    return nextMidnight.getTime() - now.getTime();
  }

  static get nextTimeRange() {
    return this.getTimeRangeByIndex(
      this.currentTimeRangeIndex + 1
    );
  }

  static getTimeRangeByIndex(index: number) {
    const now = new Date();
    const indexTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0, Timing.range * index, 0
    ).getTime();
    return indexTime - now.getTime();
  }

  static convertToMinutes(ms: number) {
    return ms / 1000 / 60;
  }

  static getMinute(minute: number) {
    return 1000 * 60 * minute;
  }
}
