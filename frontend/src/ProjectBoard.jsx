import { useState, useEffect } from 'react';
import NewTicketModal from './NewTicketModal';
import TicketDetailsModal from './TicketDetailsModal';
import EditProjectModal from './EditProjectModal';

export default function ProjectBoard({ projectId, onBack, onProjectUpdated, onProjectDeleted }) {
  const pageWrapper = "min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8 lg:p-12 font-sans";
  const topNav = "max-w-7xl mx-auto mb-6";
  const backBtn = "inline-flex items-center text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors duration-200 cursor-pointer";
  const headerSection = "max-w-7xl mx-auto mb-8 sm:mb-12 bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4";
  const titleText = "text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2";
  const descText = "text-base text-slate-500 leading-relaxed max-w-2xl";
  const actionButtonsWrapper = "flex flex-col sm:flex-row gap-3 w-full sm:w-auto";
  const editProjectBtn = "shrink-0 inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-xl shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200 cursor-pointer";
  const addTicketBtn = "shrink-0 inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 cursor-pointer";
  const sectionTitle = "max-w-7xl mx-auto text-xl font-bold text-slate-800 mb-6";
  const gridContainer = "max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6";
  const ticketCard = "bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-200 p-5 sm:p-6 flex flex-col transition-all duration-200 hover:-translate-y-1 cursor-pointer";
  const ticketTopRow = "flex justify-between items-start mb-3 gap-3";
  const ticketTitle = "font-bold text-slate-900 text-lg leading-tight line-clamp-2";
  const badgeBase = "shrink-0 px-2.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border";
  const badgeHigh = `${badgeBase} bg-red-50 text-red-700 border-red-100`;
  const badgeMedium = `${badgeBase} bg-amber-50 text-amber-700 border-amber-100`;
  const badgeLow = `${badgeBase} bg-emerald-50 text-emerald-700 border-emerald-100`;
  const badgeStatus = "px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-600 uppercase tracking-wide";
  const ticketDesc = "text-sm text-slate-600 mb-6 flex-grow line-clamp-3 leading-relaxed";
  const ticketFooter = "pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-semibold text-slate-400";
  const loader = "text-center py-20 text-lg text-slate-500 font-semibold animate-pulse";

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/projects/${projectId}`, {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setProject(data);
        }
      } catch (error) {
        console.error("Failed to fetch project details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (loading || !project) return <div className={pageWrapper}><div className={loader}>Loading board...</div></div>;

  const getPriorityBadge = (priority) => {
    const p = priority?.toLowerCase();
    if (p === 'high') return <span className={badgeHigh}>{priority}</span>;
    if (p === 'medium') return <span className={badgeMedium}>{priority}</span>;
    return <span className={badgeLow}>{priority || 'Low'}</span>;
  };

  const handleProjectUpdate = (updatedProject) => {
    const mergedProject = { ...project, title: updatedProject.title, description: updatedProject.description };
    setProject(mergedProject);
    onProjectUpdated(mergedProject);
  };

  return (
    <div className={pageWrapper}>
      <div className={topNav}>
        <button onClick={onBack} className={backBtn}>&larr; Back to Projects</button>
      </div>

      <div className={headerSection}>
        <div>
          <h1 className={titleText}>{project.title}</h1>
          <p className={descText}>{project.description}</p>
        </div>
        <div className={actionButtonsWrapper}>
          <button onClick={() => setIsEditProjectModalOpen(true)} className={editProjectBtn}>Settings</button>
          <button onClick={() => setIsNewTicketModalOpen(true)} className={addTicketBtn}>+ New Ticket</button>
        </div>
      </div>

      <h2 className={sectionTitle}>Active Tickets</h2>
      
      <div className={gridContainer}>
        {project.tickets?.map((ticket) => (
          <div key={ticket._id} className={ticketCard} onClick={() => { setSelectedTicket(ticket); setIsDetailsModalOpen(true); }}>
            <div className={ticketTopRow}>
              <h3 className={ticketTitle}>{ticket.title}</h3>
              {getPriorityBadge(ticket.priority)}
            </div>
            <p className={ticketDesc}>{ticket.description}</p>
            <div className={ticketFooter}>
              <span className={badgeStatus}>{ticket.status || 'Open'}</span>
              <span>By: {ticket.author?.username || 'Current User'}</span>
            </div>
          </div>
        ))}
      </div>

      <NewTicketModal 
        isOpen={isNewTicketModalOpen} 
        onClose={() => setIsNewTicketModalOpen(false)} 
        onSuccess={(newTicket) => setProject(prev => ({...prev, tickets: [...prev.tickets, newTicket]}))}
        projectId={projectId}
      />

      <TicketDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        ticket={selectedTicket}
        projectId={projectId} 
        onUpdate={(updatedTicket) => setProject(prev => ({...prev, tickets: prev.tickets.map(t => t._id === updatedTicket._id ? updatedTicket : t)}))}
        onDelete={(deletedTicketId) => setProject(prev => ({...prev, tickets: prev.tickets.filter(t => t._id !== deletedTicketId)}))}
      />

      <EditProjectModal
        isOpen={isEditProjectModalOpen}
        onClose={() => setIsEditProjectModalOpen(false)}
        project={project}
        onUpdate={handleProjectUpdate}
        onDelete={onProjectDeleted}
      />
    </div>
  );
}