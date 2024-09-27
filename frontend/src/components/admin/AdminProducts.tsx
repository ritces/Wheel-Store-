import {
  Store,
  ScanBarcode,
  // Activity,
  DollarSign,
  ClipboardList,
  ClipboardType,
  // Ban,
  // Ruler,
  Image,
  // DotsVertical,
} from 'lucide-react';
import { ReactNode, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Components
import PageView from '../PageView';
import { useDialog } from '../../hooks/useDialog';
import { DataTable } from '../DataTable';
import Loading from '../Loading';
import ProductForm from '@/components/forms/ProductForm';

// Hooks
import { useConfirmDialog } from '@/hooks/useConfirmDialog';

// Services
import { getProducts, deleteProduct } from '../../services/backendServices';

export type HeaderType = {
  label: string;
  value: string;
  icon: ReactNode;
};
const AdminProducts = () => {
  const { openDialog } = useDialog();
  const { openConfirmDialog } = useConfirmDialog();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const productEvent = useSelector(
    ({ tools }: { tools: any }) => tools.revision['productEvent'] ?? 0,
  );

  useEffect(() => {
    (async () => {
      try {
        const products = await getProducts();
        const produtsFormatted = products.map((product: any) => ({
          ...product,
          hasImage: product.image_path ? 'Yes' : 'No',
        }));
        setData(produtsFormatted);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    })();
  }, [productEvent]);

  const pageActions = [
    {
      label: 'Add Product',
      onClick: () => {
        openDialog({
          title: 'Add Product',
          children: <ProductForm />,
        });
      },
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loading />
      </div>
    );
  }

  const headers = [
    {
      label: 'Name',
      value: 'name',
      type: 'text',
      icon: <ScanBarcode height={18} width={18} />,
    },
    {
      label: 'Type',
      value: 'type',
      type: 'text',
      icon: <ClipboardType height={18} width={18} />,
    },
    {
      label: 'Description',
      value: 'description',
      type: 'text',
      icon: <ClipboardList height={18} width={18} />,
    },
    {
      label: 'Price',
      value: 'price',
      type: 'currency',
      icon: <DollarSign height={18} width={18} />,
    },
    {
      label: 'Stock Quantity',
      value: 'stock_quantity',
      icon: <Store height={18} width={18} />,
    },
    {
      label: 'Image',
      value: 'hasImage',
      icon: <Image height={18} width={18} />,
    },
  ];

  const dataTableActions = [
    {
      type: 'delete',
      label: 'Delete',
      onClick: (data: any) => {
        openConfirmDialog({
          description:
            "Are you sure you want to remove this product? You won't be able to initiate any further transactions with this funding source.",
          onContinue: () => deleteProduct(data.id),
          successMessage: 'Product deleted',
          triggerEvent: 'productEvent',
        });
      },
    },
  ];

  return (
    <PageView
      actions={pageActions}
      title="Products"
      mode="subpage"
      subtitle={`${data.length} products`}
    >
      <DataTable
        headers={headers}
        data={data}
        loading={loading}
        actions={dataTableActions}
      />
    </PageView>
  );
};

export default AdminProducts;
