import { InsertResult, ValueTransformer } from 'typeorm';
import bigDecimal = require('js-big-decimal');

export class BigDecimalTransformer implements ValueTransformer {
  to(value: bigDecimal): string {
    if (typeof value === "object") {
      return value.getValue();
    } else {
      return String(value);
    }
  }

  from(value: string): bigDecimal {
    return new bigDecimal(value);
  }
}