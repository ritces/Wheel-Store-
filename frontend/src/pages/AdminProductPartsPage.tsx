import PageView from '../components/PageView';

import AdminProductParts from '../components/admin/AdminProductParts';

const AdminProductPartsPage = () => {
  return (
    <div className="pb-12">
      <PageView actions={[]} title="Administration">
        <AdminProductParts />
      </PageView>
    </div>
  );
};

export default AdminProductPartsPage;
