// Dependencies
import { Control } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '../ui/form';
import { Input } from '../ui/input';

const CheckBoxField: React.FC<
  | ProductProps
  | ProductPartsProps
  | ProductPartsOptionProps
  | ProductPartsPricingRulesProps
  | ProductPartsRestrictionsRulesProps
> = ({
  name,
  placeholder,
  description,
  formControl,
  children,
  value,
  label,
}: {
  name: string;
  placeholder: string;
  description: string;
  label: string;
  formControl: Control<
    | ProductProps
    | ProductPartsProps
    | ProductPartsOptionProps
    | ProductPartsPricingRulesProps
    | ProductPartsRestrictionsRulesProps
  >;
  children: React.ReactNode;
  value?: boolean;
}) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="items-top flex space-x-3">
            <FormControl>
              <Input
                className="w-auto self-start h-4"
                placeholder={placeholder}
                type={'checkbox'}
                {...field}
                checked={value}
              />
            </FormControl>
            {children}
          </div>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CheckBoxField;
