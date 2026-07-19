import { useState, useEffect } from 'react';

export default function EditProjectModal({ isOpen, onClose, project, onUpdate, onDelete }) {
  const overlayBase = "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 sm:p-6 transition-opacity overflow-y-auto";
  const modalContainer = "bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl shadow-indigo-500/10 border border-white/60 w-full max-w-lg flex flex-col relative my-auto";
  const modalHeader = "px-5 sm:px-6 md:px-8 py-4 sm:py-5 border-b border-slate-200/60 flex justify-between items-center bg-white/50 rounded-t-2xl sm:rounded-t-3xl";
  const modalTitleText = "text-lg sm:text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight";
  const closeBtn = "text-slate-400 hover:text-red-500 transition-colors cursor-pointer text-2xl leading-none px-2 py-1 rounded-lg hover:bg-red-50 focus:outline-none";
  const formSection = "p-5 sm:p-6 md:p-8 space-y-4 sm:space-y-6";
  const inputGroup = "space-y-1.5 sm:space-y-2";
  const labelStyle = "block text-xs sm:text-sm font-bold text-slate-700 ml-1";
  const inputStyle = "block w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-slate-50/50 border border-slate-200 rounded-xl sm:rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-300 shadow-sm text-sm sm:text-base";
  const textareaStyle = "block w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-slate-50/50 border border-slate-200 rounded-xl sm:rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-300 shadow-sm text-sm sm:text-base resize-none min-h-[120px]";
  const errorMessage = "text-xs sm:text-sm font-bold text-red-600 bg-red-50/80 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-red-100 flex justify-center text-center shadow-sm";
  const modalFooter = "px-5 sm:px-6 md:px-8 py-4 sm:py-5 border-t border-slate-200/60 bg-slate-50/30 flex flex-col-reverse sm:flex-row justify-between items-center gap-3 sm:gap-4 rounded-b-2xl sm:rounded-b-3xl";
  const deleteBtn = "w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-2.5 text-sm font-bold text-red-600 bg-white border border-red-200 rounded-xl sm:rounded-2xl hover:bg-red-50 hover:text-red-700 transition-all focus:outline-none focus:ring-4 focus:ring-red-500/10 cursor-pointer shadow-sm";
  const actionGroup = "w-full sm:w-auto flex flex-col sm:flex-row gap-2 sm:gap-3";
  const cancelBtn = "w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl sm:rounded-2xl hover:bg-slate-50 hover:text-slate-900 transition-all focus:outline-none focus:ring-4 focus:ring-slate-200 cursor-pointer shadow-sm";
  const saveBtn = "w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-2.5 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-xl sm:rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none cursor-pointer";

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (project) {
      setTitle(project.title || '');
      setDescription(project.description || '');
      setError('');
    }
  }, [project, isOpen]);

  if (!isOpen || !project) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    try {
      const response = await fetch(`${baseUrl}/api/projects/${project._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ project: { title, description } }) 
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        onUpdate(data);
        onClose();
      } else {
        setError(data.error || 'Failed to update project');
      }
    } catch (err) {
      setError("Network error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure? This will delete the project and ALL its tickets permanently.")) return;
    
    setIsProcessing(true);
    setError('');

    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    try {
      const response = await fetch(`${baseUrl}/api/projects/${project._id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        onDelete(project._id);
        onClose();
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.error || 'Failed to delete project');
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
          <h2 className={modalTitleText}>Project Settings</h2>
          <button onClick={onClose} className={closeBtn}>&times;</button>
        </div>
        
        <form onSubmit={handleSave}>
          <div className={formSection}>
            {error && <div className={errorMessage}>{error}</div>}
            
            <div className={inputGroup}>
              <label htmlFor="edit-title" className={labelStyle}>Project Title</label>
              <input id="edit-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={inputStyle} required />
            </div>
            
            <div className={inputGroup}>
              <label htmlFor="edit-description" className={labelStyle}>Description</label>
              <textarea id="edit-description" value={description} onChange={(e) => setDescription(e.target.value)} className={textareaStyle} required />
            </div>
          </div>
          
          <div className={modalFooter}>
            <button type="button" onClick={handleDelete} disabled={isProcessing} className={deleteBtn}>Delete Project</button>
            <div className={actionGroup}>
              <button type="button" onClick={onClose} disabled={isProcessing} className={cancelBtn}>Cancel</button>
              <button type="submit" disabled={isProcessing} className={saveBtn}>
                {isProcessing ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}