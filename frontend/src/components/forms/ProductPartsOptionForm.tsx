import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';

// Components
import InputField from '../fields/InputField';
import CheckBoxField from '../fields/CheckBoxField';
import { Form } from '../ui/form';
import { Button } from '../ui/button';
import SelectField from '../fields/SelectField';

// Intefaces
import { productPartsOptionFormSchema } from '../../interfaces/productPartsOptions';
import { toast } from '../../hooks/use-toast';

// Hooks
import { refresDataRevision } from '../../store/tools/revisionSlice';
import { createProductPartOption } from '../../services/backendServices';
import { useDialog } from '../../hooks/useDialog';

const ProductPartsOptionForm = (props) => {
  const { closeDialog } = useDialog();
  const dispatch = useDispatch();

  const schema = useForm<z.infer<typeof productPartsOptionFormSchema>>({
    resolver: zodResolver(productPartsOptionFormSchema),
    defaultValues: {
      part: {
        value: props?.part?.id,
        label: props?.part?.name,
      },
      name: '',
      price: 0,
      is_available: true,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof productPartsOptionFormSchema>,
  ) => {
    if (schema?.formState?.isSubmitting) {
      try {
        const data = { ...values, part_id: values.part?.value };
        delete data.part;
        await createProductPartOption(data);
        dispatch(refresDataRevision({ event: 'productEvent' }));
        closeDialog();
        toast({ description: 'Product part option created successfully' });
      } catch (err) {
        if (err instanceof Error) {
          toast({ variant: 'destructive', description: err.message });
        }
      }
    }
  };

  return (
    <Form {...schema}>
      <form onSubmit={schema.handleSubmit(onSubmit)} className="space-y-4">
        <div className={`grid sm:grid-cols-1 gap-2`}>
          <SelectField
            name="part"
            label="Part name"
            placeholder="Part name"
            disabled={true}
            options={[]}
            formControl={schema.control}
          />
          <InputField
            name="name"
            label="Option name"
            placeholder="Option name"
            formControl={schema.control}
          />
          <InputField
            name="price"
            label="Price"
            inputType="number"
            placeholder="Price"
            formControl={schema.control}
          />
          <CheckBoxField
            name="is_available"
            placeholder="is_available"
            formControl={schema.control}
            label="Is available"
            value={schema.watch('is_available')}
          />
        </div>
        <Button
          disabled={schema?.formState?.isSubmitting}
          type="submit"
          className="w-full"
        >
          Create
        </Button>
      </form>
    </Form>
  );
};

export default ProductPartsOptionForm;
