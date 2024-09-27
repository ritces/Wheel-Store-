import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PageView from '../components/PageView';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';

import AdminProducts from '../components/admin/AdminProducts';
import AdminParts from '../components/admin/AdminParts';
import AdminPartsRules from '../components/admin/AdminPartsRules';

const AdminPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(
    searchParams.get('tab') || 'products',
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="parts">Product Parts</TabsTrigger>
            <TabsTrigger value="rules">Product Rules</TabsTrigger>
          </TabsList>
          <TabsContent value="products">
            <div className="pt-4">
              <AdminProducts />
            </div>
          </TabsContent>
          <TabsContent value="parts">
            <div className="pt-4">
              <AdminParts />
            </div>
          </TabsContent>
          <TabsContent value="rules">
            <div className="pt-4">
              <AdminPartsRules />
            </div>
          </TabsContent>
        </Tabs>
      </PageView>
    </div>
  );
};

export default AdminPage;
