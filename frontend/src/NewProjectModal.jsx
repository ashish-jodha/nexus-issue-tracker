import { useState } from 'react';

export default function NewProjectModal({ isOpen, onClose, onSuccess }) {
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
  const modalFooter = "px-6 py-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3";
  const cancelBtn = "px-4 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200 cursor-pointer";
  const submitBtn = "px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer shadow-sm";

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ project: { title, description } }) 
      });

      if (response.ok) {
        const data = await response.json();
        setTitle('');
        setDescription('');
        onSuccess(data.project);
        onClose();
      }
    } catch (error) {
      console.error("Failed to create project:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={overlayBase}>
      <div className={modalContainer}>
        <div className={modalHeader}>
          <h2 className={modalTitleText}>Create New Project</h2>
          <button onClick={onClose} className={closeBtn}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={formSection}>
            <div className={inputGroup}>
              <label htmlFor="title" className={labelStyle}>Project Title</label>
              <input id="title" type="text" placeholder="e.g. Authentication" value={title} onChange={(e) => setTitle(e.target.value)} className={inputStyle} required />
            </div>
            <div className={inputGroup}>
              <label htmlFor="description" className={labelStyle}>Description</label>
              <textarea id="description" placeholder="Briefly describe..." value={description} onChange={(e) => setDescription(e.target.value)} className={textareaStyle} required />
            </div>
          </div>
          <div className={modalFooter}>
            <button type="button" onClick={onClose} className={cancelBtn}>Cancel</button>
            <button type="submit" disabled={isSubmitting} className={submitBtn}>{isSubmitting ? 'Creating...' : 'Create Project'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}