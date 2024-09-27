import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';

// Components
import SelectField from '../fields/SelectField';
import { Form } from '../ui/form';
import { Button } from '../ui/button';
import Loading from '../Loading';

// Intefaces
import { assignRuleFormSchema } from '../../interfaces/assignRule';
import { toast } from '../../hooks/use-toast';

// Hooks
import { refresDataRevision } from '../../store/tools/revisionSlice';
import {
  assignPricingRuleToPartOption,
  getProductPricingRules,
} from '../../services/backendServices';
import { useDialog } from '../../hooks/useDialog';

const AssignPricingRuleForm = (props) => {
  const { closeDialog } = useDialog();
  const dispatch = useDispatch();

  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof assignRuleFormSchema>>({
    resolver: zodResolver(assignRuleFormSchema),
    defaultValues: {
      rule: undefined, // Add this line
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const rules = await getProductPricingRules();
        const rulesOptions = rules.map((rule: any) => ({
          label: `${rule.description} - ${rule.additional_price}$`,
          value: rule.id,
        }));
        setRules(rulesOptions);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    })();
  }, []);

  const onSubmit = async (values: z.infer<typeof assignRuleFormSchema>) => {
    try {
      const ruleId = +values.rule.value;
      const partOptionId = props.partOptionId;
      await assignPricingRuleToPartOption(partOptionId, ruleId);
      dispatch(refresDataRevision({ event: 'productEvent' }));
      closeDialog();
      toast({ description: 'Rule assigned successfully' });
    } catch (err) {
      if (err instanceof Error) {
        toast({ variant: 'destructive', description: err.message });
      }
    }
  };

  if (loading) {
    return (
      <div className="relative top-[40%]">
        <Loading />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className={`grid sm:grid-cols-1 gap-2`}>
          <SelectField
            name="rule"
            label="Rule"
            options={rules}
            formControl={form.control}
            placeholder="Select a rule"
          />
        </div>
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="w-full"
        >
          Assign
        </Button>
      </form>
    </Form>
  );
};

export default AssignPricingRuleForm;
