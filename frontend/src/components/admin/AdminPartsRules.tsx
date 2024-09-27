import { ScanBarcode, DollarSign, ClipboardList, Link } from 'lucide-react';
import { ReactNode, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Components
import PageView from '../PageView';
import Loading from '../Loading';
import { useDialog } from '../../hooks/useDialog';
import { DataTable } from '../DataTable';
import ProductPartsPricingRuleForm from '../forms/ProductPartsPricingRulesForm';
import ProductPartsRestrictionRuleForm from '../forms/ProductPartsRestrictionRulesForm';

// Hooks
import { useConfirmDialog } from '@/hooks/useConfirmDialog';

// Services
import {
  getProductPricingRules,
  deleteProductPricingRule,
  getProductRestrictionRules,
  deleteProductRestrictionRule,
} from '../../services/backendServices';

export type HeaderType = {
  label: string;
  value: string;
  icon: ReactNode;
};

const AdminPartsRules = () => {
  const { openDialog } = useDialog();
  const { openConfirmDialog } = useConfirmDialog();

  const [pricingRulesData, setPricingRulesData] = useState([]);
  const [restrictionRulesData, setRestrictionRulesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const productEvent = useSelector(
    ({ tools }: { tools: any }) => tools.revision['productEvent'] ?? 0,
  );

  useEffect(() => {
    (async () => {
      try {
        const [pricingRules, restrictionRules] = await Promise.all([
          getProductPricingRules(),
          getProductRestrictionRules(),
        ]);
        setPricingRulesData(pricingRules);
        setRestrictionRulesData(restrictionRules);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    })();
  }, [productEvent]);

  const pricingRulesActions = [
    {
      label: 'Add Pricing Rule',
      onClick: () => {
        openDialog({
          title: 'Add Pricing Rule',
          children: <ProductPartsPricingRuleForm />,
        });
      },
    },
  ];

  const restrictionRulesActions = [
    {
      label: 'Add Restriction Rule',
      onClick: () => {
        openDialog({
          title: 'Add Restriction Rule',
          children: <ProductPartsRestrictionRuleForm />,
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

  const pricingRulesHeaders = [
    {
      label: 'Description',
      value: 'description',
      type: 'text',
      icon: <ScanBarcode height={18} width={18} />,
    },
    {
      label: 'Additional Price',
      value: 'additional_price',
      type: 'text',
      icon: <DollarSign height={18} width={18} />,
    },
    {
      label: 'Product Options Parts Associated',
      value: 'product_options_parts_names',
      type: 'text',
      icon: <Link height={18} width={18} />,
    },
  ];

  const restrictionRulesHeaders = [
    {
      label: 'Description',
      value: 'description',
      type: 'text',
      icon: <ClipboardList height={18} width={18} />,
    },
    {
      label: 'Product Options Parts Associated',
      value: 'product_options_parts_names',
      type: 'text',
      icon: <Link height={18} width={18} />,
    },
  ];

  const pricingRulesDataTableActions = [
    {
      type: 'delete',
      label: 'Delete',
      onClick: (data: any) => {
        openConfirmDialog({
          description: 'Are you sure you want to remove this pricing rule?',
          onContinue: () => deleteProductPricingRule(data.id),
          successMessage: 'Pricing rule deleted',
          triggerEvent: 'productEvent',
        });
      },
    },
  ];

  const restrictionRulesDataTableActions = [
    {
      type: 'delete',
      label: 'Delete',
      onClick: (data: any) => {
        openConfirmDialog({
          description: 'Are you sure you want to remove this restriction rule?',
          onContinue: () => deleteProductRestrictionRule(data.id),
          successMessage: 'Restriction rule deleted',
          triggerEvent: 'productEvent',
        });
      },
    },
  ];

  return (
    <div className="w-full flex flex-col space-y-12">
      <div className="w-full">
        <PageView
          actions={pricingRulesActions}
          title="Pricing Rules"
          mode="subpage"
          subtitle=" "
        >
          <DataTable
            headers={pricingRulesHeaders}
            data={pricingRulesData}
            loading={loading}
            actions={pricingRulesDataTableActions}
          />
        </PageView>
      </div>
      <div className="w-full">
        <PageView
          actions={restrictionRulesActions}
          title="Restriction Rules"
          mode="subpage"
          subtitle=" "
        >
          <DataTable
            headers={restrictionRulesHeaders}
            data={restrictionRulesData}
            loading={loading}
            actions={restrictionRulesDataTableActions}
          />
        </PageView>
      </div>
    </div>
  );
};

export default AdminPartsRules;
