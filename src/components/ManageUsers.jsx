import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { useNotification } from './NotificationProvider.jsx';
import ConfirmModal from './ConfirmModal.jsx';
import UserTable from './manageUsers/UserTable.jsx';
import ViewUserModal from './manageUsers/ViewUserModal.jsx';
import EditUserModal from './manageUsers/EditUserModal.jsx';

const ManageUsers = () => {
  const { showSuccess } = useNotification();
  const [users, setUsers] = useState([
    { id: 1, username: 'alex_trader', email: 'alex@example.com', tokens: 124592.45, joinDate: '2024-01-15', status: 'active', profilePicture: null },
    { id: 2, username: 'crypto_master', email: 'crypto@example.com', tokens: 85620.30, joinDate: '2024-01-20', status: 'active', profilePicture: null },
    { id: 3, username: 'trader_pro', email: 'trader@example.com', tokens: 45230.10, joinDate: '2024-02-01', status: 'active', profilePicture: null },
  ]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    status: 'active',
    profilePicture: null,
  });

  const handleView = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profilePicture: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      profilePicture: null,
    });
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      status: user.status,
      profilePicture: user.profilePicture || null,
    });
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    setUsers(users.map(user => 
      user.id === selectedUser.id 
        ? { ...user, ...formData, profilePicture: formData.profilePicture }
        : user
    ));
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleDelete = (userId) => {
    const user = users.find(u => u.id === userId);
    setUserToDelete({ id: userId, username: user?.username || 'this user' });
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(user => user.id !== userToDelete.id));
      showSuccess('User deleted successfully!');
      setShowConfirmModal(false);
      setUserToDelete(null);
    }
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Manage Users</h2>
          <p className="text-muted-text">View, edit, or delete user accounts</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-text" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-surface-dark border border-border-dark rounded-lg text-white placeholder:text-muted-text focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Users Table */}
      <UserTable
        users={users}
        searchTerm={searchTerm}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* View Modal */}
      {showViewModal && selectedUser && (
        <ViewUserModal
          selectedUser={selectedUser}
          onClose={() => setShowViewModal(false)}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && selectedUser && (
        <EditUserModal
          selectedUser={selectedUser}
          formData={formData}
          onFormChange={setFormData}
          onImageChange={handleImageChange}
          onRemoveImage={handleRemoveImage}
          onClose={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }}
          onUpdate={handleUpdate}
        />
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={showConfirmModal}
        title="Delete User"
        message={`Are you sure you want to delete ${userToDelete?.username || 'this user'}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowConfirmModal(false);
          setUserToDelete(null);
        }}
      />
    </div>
  );
};

export default ManageUsers;

