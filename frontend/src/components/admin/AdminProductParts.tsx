import { ScanBarcode, DollarSign, ClipboardList } from 'lucide-react';
import { ReactNode, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Components
import PageView from '../PageView';
import Loading from '../Loading';
import { useDialog } from '../../hooks/useDialog';
import { DataTable } from '../DataTable';
import ProductPartsOptionForm from '../forms/ProductPartsOptionForm';

// Hooks
import { useConfirmDialog } from '@/hooks/useConfirmDialog';

// Services
import {
  getPartById,
  getProductPartsOptions,
  deleteProductPartOption,
} from '../../services/backendServices';
import { useParams } from 'react-router-dom';

export type HeaderType = {
  label: string;
  value: string;
  icon: ReactNode;
};

const AdminProductParts = () => {
  const { openDialog } = useDialog();
  const { id } = useParams();
  const { openConfirmDialog } = useConfirmDialog();

  const [partsOptionsData, setPartsOptionsData] = useState([]);
  const [partData, setPartData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const productEvent = useSelector(
    ({ tools }: { tools: any }) => tools.revision['productEvent'] ?? 0,
  );

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const [part, partsOptions] = await Promise.all([
            getPartById(Number(id)),
            getProductPartsOptions(),
          ]);

          const partsOptionsByPartId = partsOptions.filter(
            (option: any) => option.part_id === +id,
          );
          setPartData(part);
          setPartsOptionsData(partsOptionsByPartId);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    })();
  }, [id, productEvent]);

  const partActions = [
    {
      label: 'Add Part Option',
      onClick: () => {
        openDialog({
          title: 'Add Part Option',
          children: <ProductPartsOptionForm part={partData} />,
        });
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

  const partHeaders = [
    {
      label: 'Part Name',
      value: 'part_name',
      type: 'text',
      icon: <ScanBarcode height={18} width={18} />,
    },
    {
      label: 'Option Name',
      value: 'name',
      type: 'text',
      icon: <ScanBarcode height={18} width={18} />,
    },
    {
      label: 'Price',
      value: 'price',
      type: 'text',
      icon: <DollarSign height={18} width={18} />,
    },
    {
      label: 'Is Available',
      value: 'is_available',
      type: 'text',
      icon: <ClipboardList height={18} width={18} />,
    },
  ];

  const partDataTableActions = [
    {
      type: 'delete',
      label: 'Delete',
      onClick: (data: any) => {
        openConfirmDialog({
          description:
            'Are you sure you want to remove this product part option?',
          onContinue: () => deleteProductPartOption(data.id),
          successMessage: 'Product part option deleted',
          triggerEvent: 'productEvent',
        });
      },
    },
    {
      type: 'view',
      label: 'Details',
      onClick: (data: any) =>
        (window.location.href = `/admin/products/parts/${data.part_id}/options/${data.id}`),
    },
  ];

  return (
    <PageView
      actions={partActions}
      title={`Part: ${partData.name}`}
      mode="subpage"
      subtitle=" "
    >
      <DataTable
        key={partData.id}
        headers={partHeaders}
        data={partsOptionsData}
        loading={loading}
        actions={partDataTableActions}
      />
    </PageView>
  );
};

export default AdminProductParts;
