import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';

// Components
import InputField from '../fields/InputField';
import { Form } from '../ui/form';
import { Button } from '../ui/button';

// Intefaces
import { productPartsPricingRulesFormSchema } from '../../interfaces/productPartsPricingRules';
import { toast } from '../../hooks/use-toast';

// Hooks
import { refresDataRevision } from '../../store/tools/revisionSlice';
import { useDialog } from '../../hooks/useDialog';
import { createProductPricingRule } from '../../services/backendServices';

const ProductPartsPricingRulesForm = () => {
  const { closeDialog } = useDialog();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof productPartsPricingRulesFormSchema>>({
    resolver: zodResolver(productPartsPricingRulesFormSchema),
    defaultValues: {
      description: '',
      additional_price: 0,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof productPartsPricingRulesFormSchema>,
  ) => {
    try {
      await createProductPricingRule(values);
      dispatch(refresDataRevision({ event: 'productEvent' }));
      closeDialog();
      toast({ description: 'Product part pricing rule created successfully' });
    } catch (err) {
      if (err instanceof Error) {
        toast({ variant: 'destructive', description: err.message });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className={`grid sm:grid-cols-1 gap-2`}>
          <InputField
            name="description"
            label="Description"
            inputType="text"
            placeholder="Description"
            formControl={form.control}
          />
          <InputField
            name="additional_price"
            label="Additional price"
            inputType="number"
            placeholder="Additional price"
            formControl={form.control}
          />
        </div>
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="w-full"
        >
          Create
        </Button>
      </form>
    </Form>
  );
};

export default ProductPartsPricingRulesForm;
