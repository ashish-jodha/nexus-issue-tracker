import { useState, useEffect } from 'react';

export default function TicketDetailsModal({ isOpen, onClose, ticket, projectId, onUpdate, onDelete }) {
  const overlayBase = "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 sm:p-6 transition-opacity overflow-y-auto";
  const modalContainer = "bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl shadow-indigo-500/10 border border-white/60 w-full max-w-xl flex flex-col relative my-auto";
  const modalHeader = "px-5 sm:px-6 md:px-8 py-4 sm:py-5 border-b border-slate-200/60 flex justify-between items-start bg-white/50 rounded-t-2xl sm:rounded-t-3xl";
  const headerTextWrapper = "pr-4 w-full";
  const titleInput = "block w-full px-4 sm:px-5 py-2.5 sm:py-3 bg-white/40 border border-transparent hover:border-slate-200 focus:bg-white focus:border-indigo-500 rounded-xl sm:rounded-2xl text-lg sm:text-xl font-black text-slate-900 tracking-tight focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 shadow-sm mb-1.5";
  const authorText = "text-xs sm:text-sm text-slate-500 font-medium px-2";
  const closeBtn = "text-slate-400 hover:text-red-500 transition-colors cursor-pointer text-2xl leading-none px-2 py-1 rounded-lg hover:bg-red-50 focus:outline-none shrink-0 mt-2 sm:mt-3";
  const bodySection = "p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-6";
  const errorMessage = "text-xs sm:text-sm font-bold text-red-600 bg-red-50/80 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-red-100 flex justify-center text-center shadow-sm mb-4";
  const descTitle = "text-xs sm:text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide ml-1";
  const textareaStyle = "block w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-slate-50/50 border border-slate-200 rounded-xl sm:rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-300 shadow-sm text-sm sm:text-base resize-none min-h-[140px]";
  const gridGroup = "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-4 border-t border-slate-100/80";
  const inputGroup = "space-y-1.5 sm:space-y-2";
  const selectStyle = "block w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-slate-50/50 border border-slate-200 rounded-xl sm:rounded-2xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-300 shadow-sm text-sm sm:text-base appearance-none cursor-pointer";
  const modalFooter = "px-5 sm:px-6 md:px-8 py-4 sm:py-5 border-t border-slate-200/60 bg-slate-50/30 flex flex-col-reverse sm:flex-row justify-between items-center gap-3 sm:gap-4 rounded-b-2xl sm:rounded-b-3xl";
  const deleteBtn = "w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-2.5 text-sm font-bold text-red-600 bg-white border border-red-200 rounded-xl sm:rounded-2xl hover:bg-red-50 hover:text-red-700 transition-all focus:outline-none focus:ring-4 focus:ring-red-500/10 cursor-pointer shadow-sm";
  const actionGroup = "w-full sm:w-auto flex flex-col sm:flex-row gap-2 sm:gap-3";
  const cancelBtn = "w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl sm:rounded-2xl hover:bg-slate-50 hover:text-slate-900 transition-all focus:outline-none focus:ring-4 focus:ring-slate-200 cursor-pointer shadow-sm";
  const saveBtn = "w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-2.5 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-xl sm:rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none cursor-pointer";

  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (ticket) {
      setEditTitle(ticket.title || '');
      setEditDescription(ticket.description || '');
      setStatus(ticket.status || 'Open');
      setPriority(ticket.priority || 'Medium');
      setError('');
    }
  }, [ticket, isOpen]);

  if (!isOpen || !ticket) return null;

  const handleSave = async () => {
    setIsProcessing(true);
    setError('');
    
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    try {
      const response = await fetch(`${baseUrl}/api/projects/${projectId}/tickets/${ticket._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ 
          ticket: { 
            title: editTitle, 
            description: editDescription, 
            status, 
            priority 
          } 
        })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        onUpdate(data.ticket);
        onClose();
      } else {
        setError(data.error || data.err || 'Failed to update ticket. You may not have permission.');
      }
    } catch (err) {
      setError("Network error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;
    
    setIsProcessing(true);
    setError('');

    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    try {
      const response = await fetch(`${baseUrl}/api/projects/${projectId}/tickets/${ticket._id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        onDelete(ticket._id);
        onClose();
      } else {
        setError(data.error || data.err || 'Failed to delete ticket. You may not have permission.');
      }
    } catch (err) {
      setError("Network error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={overlayBase}>
      <div className={modalContainer}>
        <div className={modalHeader}>
          <div className={headerTextWrapper}>
            <input 
              type="text" 
              value={editTitle} 
              onChange={(e) => setEditTitle(e.target.value)} 
              className={titleInput} 
              required 
            />
            <p className={authorText}>Opened by {ticket.author?.username || 'Unknown'}</p>
          </div>
          <button onClick={onClose} className={closeBtn}>&times;</button>
        </div>

        <div className={bodySection}>
          {error && <div className={errorMessage}>{error}</div>}
          
          <div>
            <h3 className={descTitle}>Description</h3>
            <textarea 
              value={editDescription} 
              onChange={(e) => setEditDescription(e.target.value)} 
              className={textareaStyle} 
              required 
            />
          </div>

          <div className={gridGroup}>
            <div className={inputGroup}>
              <label htmlFor="edit-status" className={descTitle}>Status</label>
              <select id="edit-status" value={status} onChange={(e) => setStatus(e.target.value)} className={selectStyle}>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div className={inputGroup}>
              <label htmlFor="edit-priority" className={descTitle}>Priority</label>
              <select id="edit-priority" value={priority} onChange={(e) => setPriority(e.target.value)} className={selectStyle}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        </div>

        <div className={modalFooter}>
          <button type="button" onClick={handleDelete} disabled={isProcessing} className={deleteBtn}>Delete Ticket</button>
          
          <div className={actionGroup}>
            <button type="button" onClick={onClose} disabled={isProcessing} className={cancelBtn}>Cancel</button>
            <button type="button" onClick={handleSave} disabled={isProcessing} className={saveBtn}>
              {isProcessing ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}