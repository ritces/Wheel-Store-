import { useState } from 'react';
import { ShoppingCart, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatCurrency } from '@/lib/utils';
import { useCookies } from 'react-cookie';
//Services
import { createCheckoutSession } from '@/services/backendServices';

interface CartProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ORDER_COOKIE_KEY = 'userOrders';

export default function Cart({ open, onOpenChange }: CartProps) {
  const [cookies, setCookie, removeCookie] = useCookies([ORDER_COOKIE_KEY]);
  const [loading, setLoading] = useState(false);

  const orders = cookies?.userOrders;
  const products = orders?.map((order: any) => {
    return {
      id: order.values.product_id,
      name: order.name,
      price: formatCurrency(order.totalPrice),
      quantity: order.quantity,
      parts: order.values.parts,
      description: order.values.parts
        .map((part: any) => part?.selectedOption?.name)
        .filter((name: any) => name && name.length > 0)
        .join(', '),
      imageSrc: `${import.meta.env.VITE_SERVER}${order.image}`,
      imageAlt: order.vaimageAlt,
    };
  });

  const totalPrice = orders?.reduce((total: number, order: any) => {
    return total + Number(order.totalPrice);
  }, 0);

  const removeCookiByIndex = (index: number) => {
    const updatedOrders = cookies?.userOrders?.filter((_, i: number) => i !== index);
    console.log(updatedOrders, "updatedOrders");
    if (updatedOrders.length) {
      setCookie(ORDER_COOKIE_KEY, updatedOrders, { path: '/' });
    } else {
      removeCookie(ORDER_COOKIE_KEY, { path: '/' });
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await createCheckoutSession(orders);
      setLoading(false);
      window.location.href = res.url;
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md [&>button]:hidden flex flex-col"
      >
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center gap-x-2">
              <ShoppingCart />
              Cart
            </div>
          </SheetTitle>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-4"
            onClick={() => onOpenChange(false)}
          >
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Close panel</span>
          </Button>
        </SheetHeader>

        <div className="flex-grow overflow-hidden">
          <ScrollArea className="h-full">
            <div className="mt-2">
              <ul className="space-y-4">
                {products?.map((product: any, index: number) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        alt={product.imageAlt}
                        src={product.imageSrc}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium">
                          <h3>
                            <a href={product.href}>{product.name}</a>
                          </h3>
                          <p className="ml-4">{product.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {product.color}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        {product.description && (
                          <p className="text-muted-foreground">
                            {product.description}
                          </p>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCookiByIndex(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollArea>
        </div>

        {/* Cart total section */}
        <div className="border-t pt-6 mt-6">
          <div className="flex justify-between text-base font-medium">
            <p>Subtotal</p>
            <p>{formatCurrency(totalPrice ?? 0)}</p>
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Button
              disabled={!orders?.length || loading}
              className="w-full"
              onClick={handleCheckout}
            >
              {loading ? 'Loading...' : 'Checkout'}
            </Button>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm">
            <p className="text-muted-foreground">
              or{' '}
              <Button variant="link" onClick={() => onOpenChange(false)}>
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </Button>
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
