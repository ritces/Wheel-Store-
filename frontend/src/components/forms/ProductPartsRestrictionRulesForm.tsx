import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';

// Components
import InputField from '../fields/InputField';
import { Form } from '../ui/form';
import { Button } from '../ui/button';

// Intefaces
import { productPartsRestrictionsRulesFormSchema } from '../../interfaces/productPartsRestrictionsRules';
import { toast } from '../../hooks/use-toast';

// Hooks
import { refresDataRevision } from '../../store/tools/revisionSlice';
import { useDialog } from '../../hooks/useDialog';
import { createProductRestrictionRule } from '../../services/backendServices';

const ProductPartsRestrictionRulesForm = () => {
  const { closeDialog } = useDialog();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof productPartsRestrictionsRulesFormSchema>>(
    {
      resolver: zodResolver(productPartsRestrictionsRulesFormSchema),
      defaultValues: { description: '' },
    },
  );

  const onSubmit = async (
    values: z.infer<typeof productPartsRestrictionsRulesFormSchema>,
  ) => {
    try {
      await createProductRestrictionRule(values);
      dispatch(refresDataRevision({ event: 'productEvent' }));
      closeDialog();
      toast({
        description: 'Product part restriction rule created successfully',
      });
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

export default ProductPartsRestrictionRulesForm;
