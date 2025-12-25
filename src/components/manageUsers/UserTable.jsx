import { Edit, Trash2, Eye, Camera } from 'lucide-react';
import React from 'react';

const UserTable = ({ users, searchTerm, onView, onEdit, onDelete }) => {
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden">
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-dark bg-surface-muted/50">
              <th className="text-left p-4 text-xs font-bold text-muted-text uppercase">User</th>
              <th className="text-left p-4 text-xs font-bold text-muted-text uppercase">Email</th>
              <th className="text-right p-4 text-xs font-bold text-muted-text uppercase">Tokens</th>
              <th className="text-left p-4 text-xs font-bold text-muted-text uppercase">Join Date</th>
              <th className="text-center p-4 text-xs font-bold text-muted-text uppercase">Status</th>
              <th className="text-center p-4 text-xs font-bold text-muted-text uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-border-dark/50 hover:bg-surface-muted/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {user.profilePicture ? (
                      <img 
                        src={user.profilePicture} 
                        alt={user.username}
                        className="w-8 h-8 rounded-full object-cover border border-border-dark"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Camera className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <span className="text-white font-semibold">{user.username}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-muted-text">{user.email}</span>
                </td>
                <td className="p-4 text-right">
                  <span className="text-white font-mono font-semibold">{user.tokens.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </td>
                <td className="p-4">
                  <span className="text-muted-text text-sm">{user.joinDate}</span>
                </td>
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    user.status === 'active' ? 'bg-primary/20 text-primary' : 'bg-danger/20 text-danger'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onView(user)}
                      className="p-2 bg-cyan/20 text-cyan rounded-lg hover:bg-cyan/30 transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(user)}
                      className="p-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
                      className="p-2 bg-danger/20 text-danger rounded-lg hover:bg-danger/30 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;

