import React from 'react';
import { Control } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface SelectFieldProps {
  name: string;
  label: string;
  description?: string;
  formControl: Control<any>;
  placeholder?: string;
  options: { value: string | number; label: string }[];
  disabled?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  description,
  formControl,
  placeholder,
  options,
  label,
  disabled,
}) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              onValueChange={(value) => {
                const selectedOption = options.find(
                  (opt) => opt.value.toString() === value,
                );
                field.onChange(selectedOption);
              }}
              value={field.value?.value?.toString()}
              disabled={disabled}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder}>
                  {field.value?.label || placeholder}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value.toString()}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectField;
