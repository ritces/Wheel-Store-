import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';

// Components
import InputField from '../fields/InputField';
import SelectField from '../fields/SelectField';
import { Form } from '../ui/form';
import { Button } from '../ui/button';
import Loading from '../Loading';

// Intefaces
import { productPartsFormSchema } from '../../interfaces/productParts';
import { toast } from '../../hooks/use-toast';

// Hooks
import { refresDataRevision } from '../../store/tools/revisionSlice';
import { createProductPart, getProducts } from '../../services/backendServices';
import { useDialog } from '../../hooks/useDialog';

const ProductPartsForm = () => {
  const { closeDialog } = useDialog();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof productPartsFormSchema>>({
    resolver: zodResolver(productPartsFormSchema),
    defaultValues: {
      name: '',
      product: undefined, // Add this line
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const products = await getProducts();
        const productsOptions = products.map((product: any) => ({
          label: product.name,
          value: product.id,
        }));
        setProducts(productsOptions);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    })();
  }, []);

  const onSubmit = async (values: z.infer<typeof productPartsFormSchema>) => {
    try {
      const productPartData = {
        name: values.name,
        product_id: values.product?.value,
      };
      await createProductPart(productPartData);
      dispatch(refresDataRevision({ event: 'productEvent' }));
      closeDialog();
      toast({ description: 'Product part created successfully' });
    } catch (err) {
      if (err instanceof Error) {
        toast({ variant: 'destructive', description: err.message });
      }
    }
  };

  if (loading) {
    return (
      <div className="relative top-[40%]">
        <Loading />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className={`grid sm:grid-cols-1 gap-2`}>
          <SelectField
            name="product"
            label="Product"
            options={products}
            formControl={form.control}
            placeholder="Select a product"
          />
          <InputField
            name="name"
            label="Part name"
            inputType="text"
            placeholder="Part name"
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

export default ProductPartsForm;
