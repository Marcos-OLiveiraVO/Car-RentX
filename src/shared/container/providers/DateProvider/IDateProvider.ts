interface IDateProvider {
  compareHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): String;
  dateNow(): Date;
  compareInDays(start_date: Date, end_date: Date): number;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  compareIfBefore(start_date: Date, end_date: Date): Boolean;
}

export { IDateProvider };
