import { DollarSign, Ruler } from 'lucide-react';
import { ReactNode, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Components
import PageView from '../PageView';
import Loading from '../Loading';
import { useDialog } from '../../hooks/useDialog';
import { DataTable } from '../DataTable';
import AssignPricingRuleForm from '../forms/AssignPricingRuleForm';

// Hooks
import { useConfirmDialog } from '@/hooks/useConfirmDialog';

// Services
import {
  getPartOptionById,
  getProductPricingRulesByPartOptionId,
  unassignPricingRuleFromPartOption,
} from '../../services/backendServices';
import { useParams } from 'react-router-dom';

export type HeaderType = {
  label: string;
  value: string;
  icon: ReactNode;
};

const AdminProductPartsPricingRules = () => {
  const { openDialog } = useDialog();
  const { id } = useParams();
  const { openConfirmDialog } = useConfirmDialog();

  const [pricingRulesData, setPricingRulesData] = useState([]);
  const [partOptionData, setPartOptionData] = useState([]);
  const [loading, setLoading] = useState(true);

  const productEvent = useSelector(
    ({ tools }: { tools: any }) => tools.revision['productEvent'] ?? 0,
  );

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const [partOption, pricingRules] = await Promise.all([
            getPartOptionById(Number(id)),
            getProductPricingRulesByPartOptionId(Number(id)),
          ]);

          setPartOptionData(partOption);
          setPricingRulesData(pricingRules);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    })();
  }, [id, productEvent]);

  const productPartsPricingRulesActions = [
    {
      label: 'Assign Pricing Rule',
      onClick: () => {
        openDialog({
          title: 'Assign Pricing Rule',
          children: <AssignPricingRuleForm partOptionId={id} />,
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

  const productPartsPricingRulesHeaders = [
    {
      label: 'Rule',
      value: 'rule_description',
      type: 'text',
      icon: <Ruler height={18} width={18} />,
    },
    {
      label: 'Additional Price',
      value: 'additional_price',
      type: 'text',
      icon: <DollarSign height={18} width={18} />,
    },
  ];

  const productPartsPricingRulesDataTableActions = [
    {
      type: 'delete',
      label: 'Delete',
      onClick: (data: any) => {
        openConfirmDialog({
          description: 'Are you sure you want to unassign this pricing rule?',
          onContinue: () =>
            unassignPricingRuleFromPartOption(Number(id), data.id),
          successMessage: 'Product pricing rule unassigned',
          triggerEvent: 'productEvent',
        });
      },
    },
  ];

  return (
    <PageView
      actions={productPartsPricingRulesActions}
      title={`Option: ${partOptionData.name}`}
      mode="subpage"
    >
      <DataTable
        key={partOptionData.id}
        headers={productPartsPricingRulesHeaders}
        data={pricingRulesData}
        loading={loading}
        actions={productPartsPricingRulesDataTableActions}
      />
    </PageView>
  );
};

export default AdminProductPartsPricingRules;
