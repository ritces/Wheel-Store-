import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';

// Components
import InputField from '../fields/InputField';
import { Form } from '../ui/form';
import { Button } from '../ui/button';
import DropzoneField from '../fields/DropzoneField';

// Intefaces
import { productFormSchema } from '../../interfaces/product';
import { toast } from '../../hooks/use-toast';

// Hooks
import { refresDataRevision } from '../../store/tools/revisionSlice';
import { createProduct } from '@/services/backendServices';
import { useDialog } from '@/hooks/useDialog';

const ProductForm = () => {
  const { closeDialog } = useDialog();
  const dispatch = useDispatch();

  const schema = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      stock_quantity: 0,
      type: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof productFormSchema>) => {
    if (schema?.formState?.isSubmitting) {
      try {
        await createProduct(values);
        dispatch(refresDataRevision({ event: 'productEvent' }));
        closeDialog();
        toast({ description: 'Product created successfully' });
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
          <InputField
            name="name"
            label="Product name"
            inputType="text"
            placeholder="Product name"
            formControl={schema.control}
          />
          <InputField
            name="description"
            label="Description"
            inputType="text"
            placeholder="Description"
            formControl={schema.control}
          />
          <InputField
            name="price"
            label="Price"
            inputType="number"
            placeholder="Price"
            formControl={schema.control}
          />
          <InputField
            name="type"
            label="Product type"
            inputType="text"
            placeholder="Product type"
            formControl={schema.control}
          />
          <InputField
            name="stock_quantity"
            label="Stock quantity"
            placeholder="Stock quantity"
            inputType="number"
            formControl={schema.control}
          />
          <DropzoneField
            name="image"
            label="Click to upload an image"
            formControl={schema.control}
            schema={schema}
            accept={['image/jpeg', 'image/png', 'image/jpg']}
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

export default ProductForm;
