import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ProductObjectPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // Transform price and stock_quantity fields to numbers
    if (value.price) {
      value.price = parseFloat(value.price);
    }
    if (value.stock_quantity) {
      value.stock_quantity = parseInt(value.stock_quantity, 10);
    }
    return value;
  }
}
