import React from 'react';
import { storage } from '../../utils';
import { STORAGE_KEYS } from '../../constants';

const AdminDebug: React.FC = () => {
  const token = storage.get(STORAGE_KEYS.AUTH_TOKEN);
  const user = storage.get(STORAGE_KEYS.USER_DATA);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-sm">
      <h4 className="font-bold mb-2">Debug Info:</h4>
      <p><strong>Token:</strong> {token ? 'Present' : 'Missing'}</p>
      <p><strong>User Role:</strong> {user?.role || 'None'}</p>
      <p><strong>User ID:</strong> {user?.id || 'None'}</p>
      <p><strong>Email:</strong> {user?.email || 'None'}</p>
    </div>
  );
};

export default AdminDebug;