import { format, parseISO, addMinutes, subWeeks, subDays, subMonths, startOfToday, endOfToday, isValid, endOfYesterday, subHours, addHours } from 'date-fns';
import { isNullOrUndefined } from 'util';


/**
 * Utility that performs various dates operation.
 * Uses most of date-fns methods
 */

export class DateUtils {

  static now(): Date {
    return new Date();
  }

  static isValid(date: any): Boolean {
    return isValid(new Date(date));
  }


  static getMMMMDY(date) {
    return format(date, 'MMM DD, YYYY');
  }

  static subtractHours(date, hours) {
    let formatted_date = subHours(parseISO(date), hours);
    return formatted_date.toISOString();
  }

  static addHours(date, hours) {
    let formatted_date = addHours(parseISO(date), hours);
    return formatted_date.toISOString();
  }

  static formatDate(date: string, dateformat: string) {
    return format(parseISO(date), dateformat);
  }

  static formatDateObject(date: Date, dateformat: string) {
    return format(date, dateformat);
  }

  static formatToISOString(date: string) {
    const time = date.split(' ');
    const utc = time[0] + 'T' + time[1] + 'Z';
    return utc;
  }

  static hrs12(date) {
    return format(parseISO(date), 'yyyy-MM-dd hh:mm a');
  }

}
