import { MessageSquare, CheckCircle, XCircle, Search, Filter } from 'lucide-react';
import React, { useState } from 'react';
import { useNotification } from './NotificationProvider.jsx';

const HandleTickets = () => {
  const { showError, showSuccess } = useNotification();
  const [tickets, setTickets] = useState([
    { 
      id: 1, 
      user: 'alex_trader', 
      email: 'alex@example.com',
      subject: 'Cannot buy coins', 
      message: 'I am unable to purchase any coins. The buy button is not working.',
      status: 'open',
      createdAt: '2024-01-20 14:30',
      priority: 'high'
    },
    { 
      id: 2, 
      user: 'crypto_master', 
      email: 'crypto@example.com',
      subject: 'Token balance incorrect', 
      message: 'My token balance shows 0 but I should have 1000 tokens.',
      status: 'open',
      createdAt: '2024-01-20 15:45',
      priority: 'medium'
    },
    { 
      id: 3, 
      user: 'trader_pro', 
      email: 'trader@example.com',
      subject: 'Chart not loading', 
      message: 'The price chart is not displaying correctly on my dashboard.',
      status: 'resolved',
      createdAt: '2024-01-19 10:20',
      priority: 'low'
    },
  ]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [response, setResponse] = useState('');

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setResponse('');
    setShowTicketModal(true);
  };

  const handleResolve = (ticketId) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status: 'resolved' }
        : ticket
    ));
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, status: 'resolved' });
    }
  };

  const handleSendResponse = () => {
    if (!response.trim()) {
      showError('Please enter a response');
      return;
    }
    
    // Mark as resolved and send response
    if (selectedTicket) {
      handleResolve(selectedTicket.id);
      console.log('Response sent:', response);
      setShowTicketModal(false);
      setResponse('');
      showSuccess('Ticket response sent successfully!');
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-danger/20 text-danger';
      case 'medium': return 'bg-yellow-400/20 text-yellow-400';
      case 'low': return 'bg-primary/20 text-primary';
      default: return 'bg-muted-text/20 text-muted-text';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Handle Tickets</h2>
          <p className="text-muted-text">View and respond to user support tickets</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-text" />
          <input
            type="text"
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-surface-dark border border-border-dark rounded-lg text-white placeholder:text-muted-text focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-text" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-10 pr-4 py-3 bg-surface-dark border border-border-dark rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-dark bg-surface-muted/50">
                <th className="text-left p-4 text-xs font-bold text-muted-text uppercase">ID</th>
                <th className="text-left p-4 text-xs font-bold text-muted-text uppercase">User</th>
                <th className="text-left p-4 text-xs font-bold text-muted-text uppercase">Subject</th>
                <th className="text-left p-4 text-xs font-bold text-muted-text uppercase">Priority</th>
                <th className="text-left p-4 text-xs font-bold text-muted-text uppercase">Status</th>
                <th className="text-left p-4 text-xs font-bold text-muted-text uppercase">Created</th>
                <th className="text-center p-4 text-xs font-bold text-muted-text uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-border-dark/50 hover:bg-surface-muted/30 transition-colors">
                  <td className="p-4">
                    <span className="text-muted-text font-mono">#{ticket.id}</span>
                  </td>
                  <td className="p-4">
                    <div>
                      <span className="text-white font-semibold">{ticket.user}</span>
                      <p className="text-muted-text text-xs">{ticket.email}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-white">{ticket.subject}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      ticket.status === 'resolved' 
                        ? 'bg-primary/20 text-primary' 
                        : ticket.status === 'in_progress'
                        ? 'bg-yellow-400/20 text-yellow-400'
                        : 'bg-danger/20 text-danger'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-muted-text text-sm">{ticket.createdAt}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleViewTicket(ticket)}
                        className="p-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors"
                        title="View & Respond"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      {ticket.status !== 'resolved' && (
                        <button
                          onClick={() => handleResolve(ticket.id)}
                          className="p-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors"
                          title="Mark as Resolved"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Detail Modal */}
      {showTicketModal && selectedTicket && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-surface-dark border border-border-dark rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Ticket #{selectedTicket.id}</h3>
                <p className="text-muted-text text-sm">{selectedTicket.subject}</p>
              </div>
              <button
                onClick={() => setShowTicketModal(false)}
                className="p-2 hover:bg-surface-muted rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5 text-muted-text" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-background-dark rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-white font-semibold">{selectedTicket.user}</p>
                    <p className="text-muted-text text-sm">{selectedTicket.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(selectedTicket.priority)}`}>
                      {selectedTicket.priority}
                    </span>
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      selectedTicket.status === 'resolved' 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-danger/20 text-danger'
                    }`}>
                      {selectedTicket.status}
                    </span>
                  </div>
                </div>
                <p className="text-muted-text text-sm mb-2">Created: {selectedTicket.createdAt}</p>
                <div className="mt-4">
                  <p className="text-muted-text text-sm mb-2">Message:</p>
                  <p className="text-white">{selectedTicket.message}</p>
                </div>
              </div>

              {selectedTicket.status !== 'resolved' && (
                <div>
                  <label className="block text-sm font-semibold text-muted-text mb-2">Your Response</label>
                  <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    className="w-full px-4 py-3 bg-background-dark border border-border-dark rounded-lg text-white resize-none"
                    rows="4"
                    placeholder="Enter your response to the user..."
                  />
                </div>
              )}
            </div>

            {selectedTicket.status !== 'resolved' && (
              <div className="flex gap-3">
                <button
                  onClick={() => setShowTicketModal(false)}
                  className="flex-1 px-4 py-2 bg-surface-muted text-white rounded-lg hover:bg-surface-muted/80 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={handleSendResponse}
                  className="flex-1 px-4 py-2 bg-primary hover:bg-primary-hover text-background-dark font-semibold rounded-lg transition-all"
                >
                  Send Response & Resolve
                </button>
              </div>
            )}

            {selectedTicket.status === 'resolved' && (
              <button
                onClick={() => setShowTicketModal(false)}
                className="w-full px-4 py-2 bg-primary hover:bg-primary-hover text-background-dark font-semibold rounded-lg transition-all"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HandleTickets;

