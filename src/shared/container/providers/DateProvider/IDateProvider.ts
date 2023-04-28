interface IDateProvider {
  compareHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): String;
  dateNow(): Date;
}

export { IDateProvider };
