import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ProductObjectPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
