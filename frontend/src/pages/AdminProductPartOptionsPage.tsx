import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PageView from '../components/PageView';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';

import AdminProductPartsPricingRules from '../components/admin/AdminProductPartsPricingRules';
import AdminProductPartsRestrictionRules from '../components/admin/AdminProductPartsRestrictionRules';

const AdminProductPartsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(
    searchParams.get('tab') || 'pricing',
  );

  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab, setSearchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`?tab=${value}`, { replace: true });
  };

  return (
    <div className="pb-12">
      <PageView actions={[]} title="Administration">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="mt-4"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pricing">Pricing Rules</TabsTrigger>
            <TabsTrigger value="restrictions">Restrictions Rules</TabsTrigger>
          </TabsList>
          <TabsContent value="pricing">
            <div className="pt-4">
              <AdminProductPartsPricingRules />
            </div>
          </TabsContent>
          <TabsContent value="restrictions">
            <div className="pt-4">
              <AdminProductPartsRestrictionRules />
            </div>
          </TabsContent>
        </Tabs>
      </PageView>
    </div>
  );
};

export default AdminProductPartsPage;
