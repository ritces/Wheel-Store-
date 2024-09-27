import { ScanBarcode } from 'lucide-react';
import { ReactNode, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Components
import PageView from '../PageView';
import Loading from '../Loading';
import { useDialog } from '../../hooks/useDialog';
import { DataTable } from '../DataTable';
import ProductPartsForm from '../forms/ProductPartsForm';

// Hooks
import { useConfirmDialog } from '@/hooks/useConfirmDialog';

// Services
import {
  getProductParts,
  deleteProductPart,
} from '../../services/backendServices';

export type HeaderType = {
  label: string;
  value: string;
  icon: ReactNode;
};

const AdminParts = () => {
  const { openDialog } = useDialog();
  const { openConfirmDialog } = useConfirmDialog();

  const [partsData, setPartsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const productEvent = useSelector(
    ({ tools }: { tools: any }) => tools.revision['productEvent'] ?? 0,
  );

  useEffect(() => {
    (async () => {
      try {
        const parts = await getProductParts();
        setPartsData(parts);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    })();
  }, [productEvent]);

  const partsActions = [
    {
      label: 'Add Part',
      onClick: () => {
        openDialog({ title: 'Add Part', children: <ProductPartsForm /> });
      },
    },
  ];

  if (loading) {
    return (
      <div className="relative top-[40%]">
        <Loading />
      </div>
    );
  }

  const partsHeaders = [
    {
      label: 'Product',
      value: 'product_name',
      type: 'text',
      icon: <ScanBarcode height={18} width={18} />,
    },
    {
      label: 'Part Name',
      value: 'name',
      type: 'text',
      icon: <ScanBarcode height={18} width={18} />,
    },
  ];

  const partsDataTableActions = [
    {
      type: 'delete',
      label: 'Delete',
      onClick: (data: any) => {
        openConfirmDialog({
          description: 'Are you sure you want to remove this product part?',
          onContinue: () => deleteProductPart(data.id),
          successMessage: 'Product part deleted',
          triggerEvent: 'productEvent',
        });
      },
    },
    {
      type: 'view',
      label: 'Details',
      onClick: (data: any) =>
        (window.location.href = `/admin/products/parts/${data.id}`),
    },
  ];

  return (
    <PageView actions={partsActions} title="Parts" mode="subpage" subtitle=" ">
      <DataTable
        headers={partsHeaders}
        data={partsData}
        loading={loading}
        actions={partsDataTableActions}
      />
    </PageView>
  );
};

export default AdminParts;
