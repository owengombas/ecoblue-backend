export class Timing {
  static readonly Range = 15;
  static readonly UnitPerDay = 24 * 60 / Timing.Range;

  static get CurrentTimeRangeIndex() {
    const now = new Date();
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0, 0, 0
    );
    return Math.floor(((new Date()).getTime() - midnight.getTime()) / 1000 / 60 / 15);
  }

  static get CurrentDayIndex() {
    return (new Date()).getDay();
  }

  static get TimeToReachMidnight() {
    const now = new Date();
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0, 0, 0
    );
    return nextMidnight.getTime() - now.getTime();
  }

  static get NextTimeRange() {
    return this.getTimeRangeByIndex(
      this.CurrentTimeRangeIndex + 1
    );
  }

  static getTimeRangeByIndex(index: number) {
    const now = new Date();
    const indexTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0, 15 * index, 0
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
