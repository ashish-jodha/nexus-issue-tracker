import { useState, useEffect } from 'react';

export default function TicketDetailsModal({ isOpen, onClose, ticket, projectId, onUpdate, onDelete }) {
  const overlayBase = "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 sm:p-6 transition-opacity";
  const modalContainer = "bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden border border-slate-100 flex flex-col relative";
  const modalHeader = "px-6 py-5 border-b border-slate-100 flex justify-between items-start bg-slate-50/50";
  const headerTextWrapper = "pr-4 w-full";
  const titleInput = "block w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xl font-extrabold text-slate-900 tracking-tight focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-colors mb-1";
  const authorText = "text-sm text-slate-500 font-medium px-1";
  const closeBtn = "text-slate-400 hover:text-slate-700 transition-colors cursor-pointer text-2xl leading-none px-2 shrink-0 mt-1";
  const bodySection = "p-6 sm:p-8 space-y-6";
  const errorMessage = "text-sm font-bold text-red-600 bg-red-50 p-3 rounded-xl border border-red-100 mb-2";
  const descTitle = "text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide";
  const textareaStyle = "block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-colors text-sm sm:text-base resize-none min-h-[120px]";
  const gridGroup = "grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-slate-100";
  const inputGroup = "space-y-1.5";
  const selectStyle = "block w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-colors text-sm font-semibold shadow-sm appearance-none cursor-pointer";
  const modalFooter = "px-6 py-5 border-t border-slate-100 bg-slate-50 flex flex-col-reverse sm:flex-row justify-between items-center gap-3";
  const deleteBtn = "w-full sm:w-auto px-4 py-2.5 text-sm font-bold text-red-600 bg-white border border-red-200 rounded-xl hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer";
  const actionGroup = "w-full sm:w-auto flex gap-3";
  const cancelBtn = "w-full sm:w-auto px-4 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200 cursor-pointer";
  const saveBtn = "w-full sm:w-auto px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer shadow-sm";

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
    
    try {
      const response = await fetch(`http://localhost:3000/api/projects/${projectId}/tickets/${ticket._id}`, {
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

      if (response.ok) {
        const data = await response.json();
        onUpdate(data.ticket);
        onClose();
      } else {
        const data = await response.json().catch(() => ({}));
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

    try {
      const response = await fetch(`http://localhost:3000/api/projects/${projectId}/tickets/${ticket._id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        onDelete(ticket._id);
        onClose();
      } else {
        const data = await response.json().catch(() => ({}));
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