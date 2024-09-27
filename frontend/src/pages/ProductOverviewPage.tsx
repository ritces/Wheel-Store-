import { z } from 'zod';
import { useState, useEffect, useMemo } from 'react';
import { ShoppingCartIcon } from 'lucide-react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';

// Services
import {
  getProductById,
  getPricingConditions,
  getRestrictionConditions,
} from '../services/backendServices';
import { orderItemSchema } from '../interfaces/orderItem';

// Components
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import Loading from '@/components/Loading';
import Cart from '@/components/Cart';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

interface ProductData {
  id: number;
  name: string;
  price: number;
  description: string;
  stock_quantity: number;
  image_path: string;
  parts: [
    {
      id: number;
      name: string;
      is_available: boolean;
      options: [
        {
          id: number;
          name: string;
          parts: [object] | null;
          is_available: boolean;
          price: number;
        },
      ];
    },
  ];
}

type FormValues = z.infer<typeof orderItemSchema>;
const ORDER_COOKIE_KEY = 'userOrders';

const ProductOverviewPage = () => {
  const [cookies, setCookie] = useCookies([ORDER_COOKIE_KEY]);

  const { id } = useParams();

  const [loadingButton, setLoadingButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [pricingConditionsData, setPricingConditionsData] = useState<any>(null);
  const [restrictionConditionsData, setRestrictionConditionsData] =
    useState<any>(null);

  // Add this new state to track disabled options
  const [disabledOptions, setDisabledOptions] = useState<Set<number>>(
    new Set(),
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(orderItemSchema),
    defaultValues: {
      product_id: 0,
      parts: [],
    },
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'parts',
  });

  const onSubmit = async (values: FormValues) => {
    setError(null);
    setLoadingButton(true);
    const selectedParts = values.parts.filter(
      (part) => part?.selectedOption?.id,
    );

    if (!selectedParts.length && values.parts.length) {
      setError('Please select a part');
    }

    const dataSend = {
      totalPrice,
      values,
      name: productData?.name,
      image: productData?.image_path,
    };

    if (cookies?.userOrders) {
      const updatedOrders = [...cookies.userOrders, dataSend];
      setCookie(ORDER_COOKIE_KEY, updatedOrders, { path: '/' });
    } else {
      setCookie(ORDER_COOKIE_KEY, [dataSend], { path: '/' });
    }
    setCartOpen(true);
    setLoadingButton(false);
  };

  useEffect(() => {
    (async () => {
      if (id) {
        try {
          const [product, pricingConditions, restrictionsConditions] =
            await Promise.all([
              getProductById(+id),
              getPricingConditions(),
              getRestrictionConditions(),
            ]);

          setProductData(product);
          setPricingConditionsData(pricingConditions);
          setRestrictionConditionsData(restrictionsConditions);
          form.setValue('product_id', product.id);

          // Initialize form with parts
          product.parts.forEach((part: any) => {
            append({
              id: part.id,
              name: part.name,
              selectedOption: { id: null, name: '', price: 0 },
            });
          });
          setLoading(false);
        } catch (e) {
          console.log(e);
          setLoading(false);
        }
      }
    })();
  }, [id, append, form]);

  const parts = form.watch('parts');

  const totalPrice = useMemo(() => {
    if (!productData) return 0;
    if (!parts.length) return productData?.price;

    const totalPriceParts = parts.reduce((acc, part) => {
      const option = part.selectedOption;
      const price = option?.price ? Number(option.price) : 0;
      return acc + price;
    }, 0);

    let additionalPrice = 0;

    if (pricingConditionsData) {
      // Get all selected option IDs
      const selectedOptionIds = parts
        .filter((part) => part.selectedOption?.id)
        .map((part) => part.selectedOption.id);

      // Group pricing conditions by rule_id
      const groupedConditions = pricingConditionsData.reduce(
        (acc: any, condition: any) => {
          if (!acc[condition.rule_id]) {
            acc[condition.rule_id] = [];
          }
          acc[condition.rule_id].push(condition);
          return acc;
        },
        {},
      );

      // Check each rule
      Object.values(groupedConditions).forEach((conditions: any) => {
        const ruleOptionIds = conditions.map((c: any) => c.part_option_id);

        // Check if selected options match exactly with the rule's options
        if (ruleOptionIds.every((id: any) => selectedOptionIds.includes(id))) {
          // Apply the additional price only once per matched rule
          const pricingRule = conditions[0]?.pricing_rule;
          if (pricingRule) {
            additionalPrice += Number(pricingRule.additional_price);
          }
        }
      });
    }

    return totalPriceParts + Number(productData?.price) + additionalPrice;
  }, [JSON.stringify(parts), productData, pricingConditionsData]);

  useEffect(() => {
    // Add this new effect to process restrictionConditionsData
    if (restrictionConditionsData && parts.length) {
      const selectedOptionIds = parts
        .filter((part) => part.selectedOption?.id)
        .map((part) => part.selectedOption.id);

      const groupedRestrictions = restrictionConditionsData.reduce(
        (acc: any, condition: any) => {
          if (!acc[condition.rule_id]) {
            acc[condition.rule_id] = [];
          }
          acc[condition.rule_id].push(condition);
          return acc;
        },
        {},
      );

      const newDisabledOptions = new Set<number>();

      Object.values(groupedRestrictions).forEach((conditions: any) => {
        const ruleOptionIds = conditions.map((c: any) => c.part_option_id);

        // Get the part IDs for the selected options
        const selectedPartIds = new Set(
          parts
            .filter((part) => part.selectedOption?.id)
            .map((part) => part.id),
        );

        // Filter out options from the same part as the selected options
        const relevantRuleOptionIds = ruleOptionIds.filter((id) => {
          const option = productData?.parts
            .flatMap((part) => part.options)
            .find((opt) => opt.id === id);
          return option && !selectedPartIds.has(option.parts?.[0]?.id);
        });

        // Check if selectedOptionIds is a subset of relevantRuleOptionIds
        if (
          selectedOptionIds.every((id) => relevantRuleOptionIds.includes(id))
        ) {
          // If met, add all part_option_ids to the disabled set
          conditions.forEach((condition: any) => {
            newDisabledOptions.add(condition.part_option_id);
          });
        }
      });

      // Remove currently selected options from the disabled set
      selectedOptionIds.forEach((id) => {
        newDisabledOptions.delete(id);
      });

      setDisabledOptions(newDisabledOptions);
    }
  }, [restrictionConditionsData, JSON.stringify(parts), productData]);

  if (loading) {
    return (
      <div className="relative top-[40%]">
        <Loading />
      </div>
    );
  }

  // if (!productData) {
  //   return (window.location.href = '/not-found');
  // }

  const product = {
    name: productData.name,
    price: totalPrice,
    href: '#',
    breadcrumbs: [{ id: 1, name: 'Products', href: '/' }],
    images: [
      {
        src: `${import.meta.env.VITE_SERVER}${productData.image_path}`,
        alt: 'Two each of gray, white, and black shirts laying flat.',
      },
    ],
    description: productData.description,
    details: `Be one of the lucky few to get your hands on our latest product! We are thrilled to introduce our brand new ${productData.name} – a unique experience available exclusively to the first ${productData.stock_quantity} buyer.`,
    parts: productData.parts,
  };

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Breadcrumb navigation */}
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Main content grid */}
        <div className="mx-auto max-w-7xl p-8 sm:px-6 lg:px-8 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 space-x-12 gap-y-10">
            {/* Image gallery - takes up 2 columns on large screens */}
            <div className="lg:col-span-1 justify-self-center">
              <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden">
                <img
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  width={500}
                />
              </div>

              {/* Product details */}
              <div className="mt-10">
                <h2 className="text-xl font-medium text-gray-900">
                  Description
                </h2>
                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
              </div>

              {/* Details */}
              <div className="mt-10">
                <h2 className="text-xl font-medium text-gray-900">
                  Stock Quantity
                </h2>
                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.details}</p>
                </div>
              </div>
            </div>

            {/* Product info - takes up 1 column */}
            <div className="lg:col-span-1 space-y-4">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
              <div className="mt-4">
                <p className="text-3xl tracking-tight text-gray-900">
                  {`$${product.price}`}
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid sm:grid-cols-1 gap-2">
                    {fields.map((field, index) => (
                      <FormField
                        key={field.id}
                        control={form.control}
                        name={`parts.${index}.selectedOption`}
                        render={({ field: formField }) => (
                          <FormItem>
                            <FormLabel>{field.name}</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={(value) => {
                                  const [optionId, optionName, optionPrice] =
                                    value.split('|');
                                  formField.onChange({
                                    id: parseInt(optionId),
                                    name: optionName,
                                    price: parseInt(optionPrice),
                                  });
                                }}
                                value={`${formField.value.id}|${formField.value.name}`}
                                className={`mt-2 grid grid-cols-${productData?.parts?.[index]?.options?.length} lg:grid-cols-${productData?.parts?.[index]?.options?.length} gap-4`}
                              >
                                {productData?.parts?.[index]?.options?.map(
                                  (option) => (
                                    <FormItem key={option.id}>
                                      <FormControl>
                                        <div className="relative">
                                          <RadioGroupItem
                                            value={`${option.id}|${option.name}|${option.price}`}
                                            id={option.id.toString()}
                                            disabled={
                                              !option.is_available ||
                                              disabledOptions.has(option.id)
                                            }
                                            className="sr-only"
                                          />
                                          <FormLabel
                                            htmlFor={option.id.toString()}
                                            className={`
                                            ${
                                              option.is_available &&
                                              !disabledOptions.has(option.id)
                                                ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                : 'cursor-not-allowed bg-gray-50 text-gray-200'
                                            }
                                            block rounded-md border border-border p-4 font-normal shadow-sm hover:border-primary peer-aria-checked:border-primary peer-aria-checked:ring-1 peer-aria-checked:ring-ring text-center
                                            ${
                                              formField.value.id === option.id
                                                ? 'border-primary ring-1 ring-ring'
                                                : ''
                                            }
                                          `}
                                          >
                                            {option.name}
                                          </FormLabel>
                                        </div>
                                      </FormControl>
                                    </FormItem>
                                  ),
                                )}
                              </RadioGroup>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  {error && <p className="text-red-500">{error}</p>}
                  <Button
                    disabled={loadingButton}
                    type="submit"
                    className="w-full"
                  >
                    <ShoppingCartIcon className="w-4 h-4 mr-2" />
                    {loadingButton ? 'Adding to cart...' : 'Add to cart'}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
      {/* Add the Cart component here */}
      <Cart open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
};

export default ProductOverviewPage;
