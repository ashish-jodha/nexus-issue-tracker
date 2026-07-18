import { useState, useEffect } from 'react';

export default function EditProjectModal({ isOpen, onClose, project, onUpdate, onDelete }) {
  const overlayBase = "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 sm:p-6 transition-opacity";
  const modalContainer = "bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 flex flex-col relative";
  const modalHeader = "px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50";
  const modalTitleText = "text-xl font-extrabold text-slate-900 tracking-tight";
  const closeBtn = "text-slate-400 hover:text-slate-700 transition-colors cursor-pointer text-2xl leading-none px-2";
  const formSection = "p-6 sm:p-8 space-y-5";
  const inputGroup = "space-y-1.5";
  const labelStyle = "block text-sm font-bold text-slate-700";
  const inputStyle = "block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-colors text-sm sm:text-base";
  const textareaStyle = "block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-colors text-sm sm:text-base resize-none min-h-[120px]";
  const errorMessage = "text-sm font-bold text-red-600 bg-red-50 p-3 rounded-xl border border-red-100";
  const modalFooter = "px-6 py-5 border-t border-slate-100 bg-slate-50 flex flex-col-reverse sm:flex-row justify-between items-center gap-3";
  const deleteBtn = "w-full sm:w-auto px-4 py-2.5 text-sm font-bold text-red-600 bg-white border border-red-200 rounded-xl hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer";
  const actionGroup = "w-full sm:w-auto flex gap-3";
  const cancelBtn = "w-full sm:w-auto px-4 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200 cursor-pointer";
  const saveBtn = "w-full sm:w-auto px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer shadow-sm";

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

    try {
      const response = await fetch(`http://localhost:3000/api/projects/${project._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ project: { title, description } }) 
      });

      if (response.ok) {
        const updatedProject = await response.json();
        onUpdate(updatedProject);
        onClose();
      } else {
        const data = await response.json().catch(() => ({}));
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

    try {
      const response = await fetch(`http://localhost:3000/api/projects/${project._id}`, {
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
              <button type="submit" disabled={isProcessing} className={saveBtn}>{isProcessing ? 'Saving...' : 'Save Changes'}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}