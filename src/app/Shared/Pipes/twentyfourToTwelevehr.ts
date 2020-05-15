import { Pipe, PipeTransform } from '@angular/core';
import { DateUtils } from '../date-utils';

@Pipe({
  name: 'twentyfourToTwelevehr'
})
export class twentyfourToTwelevehr implements PipeTransform {
  transform(value): string {
    return DateUtils.formatToISOString(value);
  }
}
