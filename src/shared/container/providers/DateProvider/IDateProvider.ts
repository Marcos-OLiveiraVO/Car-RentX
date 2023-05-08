interface IDateProvider {
  compareHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): String;
  dateNow(): Date;
  compareInDays(start_date: Date, end_date: Date): number;
}

export { IDateProvider };
