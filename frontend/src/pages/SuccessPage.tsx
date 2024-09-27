import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle } from 'lucide-react';
//Services
import { getCheckoutSession } from '@/services/backendServices';
import { useCookies } from 'react-cookie';
import { formatCurrency } from '@/lib/utils';

const ORDER_COOKIE_KEY = 'userOrders';

export default function CompletedPurchase() {
  const [cookies, setCookie] = useCookies([ORDER_COOKIE_KEY]);
  const [data, setData] = useState<any>(null);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const sessionId = urlParams.get('session_id');

  const removeAllCookies = () => {
    setCookie(ORDER_COOKIE_KEY, []);
  };

  const getCheckoutSessionHandler = async (sessionId: string) => {
    const result = await getCheckoutSession(sessionId);
    return result?.data;
  };

  useEffect(() => {
    removeAllCookies();
    if (!sessionId) return;
    (async () => {
      const result = await getCheckoutSessionHandler(sessionId as string);
      setData(result);
    })();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <CardTitle>Order Confirmed</CardTitle>
              </div>
              <CardDescription>Thank you for your purchase!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Order Details</h3>
                  <p>Order Number: #12345</p>
                  <p>Date: {new Date().toLocaleDateString()}</p>
                </div>
                <Separator />
                {data &&
                  data.map((item: any) => (
                    <div key={item.id} className="flex flex-row">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">Product</h3>
                        <p>{item?.description ?? '-'}</p>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">Total Amount</h3>
                        <p>
                          {formatCurrency(
                            item?.amount_total ? item?.amount_total / 100 : 0,
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                <Separator />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">What's Next?</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => (window.location.href = '/')}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
