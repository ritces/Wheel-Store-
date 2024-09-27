import Header from '@/components/Header';
import Loading from '@/components/Loading';
import { getProducts } from '@/services/backendServices';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ProductsListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const productEvent = useSelector(
    ({ tools }: { tools: any }) => tools.revision['productEvent'] ?? 0,
  );

  useEffect(() => {
    (async () => {
      try {
        const products = await getProducts();
        const productsFormatted = products.map((product: any) => ({
          ...product,
          image_path: `${import.meta.env.VITE_SERVER}${product.image_path}`,
          price: `$${product.price}`,
          href: '#',
        }));
        setProducts(productsFormatted);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    })();
  }, [productEvent]);

  if (loading) {
    return (
      <div className="relative top-[40%]">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-white p-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Seasonal Offerings
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product: any) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 h-[17rem] content-center">
                  <img
                    alt={product.image_path}
                    src={product.image_path}
                    className="object-cover object-center w-full h-auto"
                    // className="h-auto object-cover object-center lg:h-full lg:w-auto"
                  />
                </div>
                <div className="mt-4 flex justify-between ">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={`/products/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.description}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsListPage;
