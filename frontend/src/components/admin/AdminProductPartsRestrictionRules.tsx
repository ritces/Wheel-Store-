import { Ruler } from 'lucide-react';
import { ReactNode, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Components
import PageView from '../PageView';
import Loading from '../Loading';
import { useDialog } from '../../hooks/useDialog';
import { DataTable } from '../DataTable';
import AssignRuleForm from '../forms/AssignPricingRuleForm';

// Hooks
import { useConfirmDialog } from '@/hooks/useConfirmDialog';

// Services
import {
  getPartOptionById,
  getProductRestrictionRulesByPartOptionId,
  unassignRestrictionRuleFromPartOption,
} from '../../services/backendServices';
import { useParams } from 'react-router-dom';
import AssignRestrictionRuleForm from '../forms/AssignRestrictionRuleForm';

export type HeaderType = {
  label: string;
  value: string;
  icon: ReactNode;
};

const AdminProductPartsRestrictionRules = () => {
  const { openDialog } = useDialog();
  const { id } = useParams();
  const { openConfirmDialog } = useConfirmDialog();

  const [restrictionRulesData, setRestrictionRulesData] = useState([]);
  const [partOptionData, setPartOptionData] = useState([]);
  const [loading, setLoading] = useState(true);

  const productEvent = useSelector(
    ({ tools }: { tools: any }) => tools.revision['productEvent'] ?? 0,
  );

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const [partOption, restrictionRules] = await Promise.all([
            getPartOptionById(Number(id)),
            getProductRestrictionRulesByPartOptionId(Number(id)),
          ]);

          setPartOptionData(partOption);
          setRestrictionRulesData(restrictionRules);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    })();
  }, [id, productEvent]);

  const productPartsRestrictionRulesActions = [
    {
      label: 'Assign Restriction Rule',
      onClick: () => {
        openDialog({
          title: 'Assign Restriction Rule',
          children: <AssignRestrictionRuleForm partOptionId={id} />,
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

  const productPartsRestrictionRulesHeaders = [
    {
      label: 'Rule',
      value: 'rule_description',
      type: 'text',
      icon: <Ruler height={18} width={18} />,
    },
  ];

  const productPartsRestrictionRulesDataTableActions = [
    {
      type: 'delete',
      label: 'Delete',
      onClick: (data: any) => {
        openConfirmDialog({
          description:
            'Are you sure you want to unassign this restriction rule?',
          onContinue: () =>
            unassignRestrictionRuleFromPartOption(Number(id), data.id),
          successMessage: 'Product restriction rule unassigned',
          triggerEvent: 'productEvent',
        });
      },
    },
  ];

  return (
    <PageView
      actions={productPartsRestrictionRulesActions}
      title={`Option: ${partOptionData.name}`}
      mode="subpage"
    >
      <DataTable
        headers={productPartsRestrictionRulesHeaders}
        data={restrictionRulesData}
        loading={loading}
        actions={productPartsRestrictionRulesDataTableActions}
      />
    </PageView>
  );
};

export default AdminProductPartsRestrictionRules;
