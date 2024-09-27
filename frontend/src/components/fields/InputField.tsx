// Dependencies
import { Control } from 'react-hook-form';

// Components
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '../ui/form';
import { Input } from '../ui/input';

// Interfaces
import { ProductProps } from '../../interfaces/product';
import { ProductPartsProps } from '../../interfaces/productParts';
import { ProductPartsOptionProps } from '../../interfaces/productPartsOptions';
import { ProductPartsPricingRulesProps } from '../../interfaces/productPartsPricingRules';
import { ProductPartsRestrictionsRulesProps } from '../../interfaces/productPartsRestrictionsRules';

const InputField: React.FC<
  | ProductProps
  | ProductPartsProps
  | ProductPartsOptionProps
  | ProductPartsPricingRulesProps
  | ProductPartsRestrictionsRulesProps
> = ({
  name,
  placeholder,
  label,
  description,
  inputType,
  formControl,
  disabled,
}) => {
  return (
    <FormField
      control={
        formControl as Control<
          | ProductProps
          | ProductPartsProps
          | ProductPartsOptionProps
          | ProductPartsPricingRulesProps
          | ProductPartsRestrictionsRulesProps
        >
      }
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={inputType || 'text'}
              disabled={disabled}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
