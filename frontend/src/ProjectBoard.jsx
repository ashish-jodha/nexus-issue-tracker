import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NewTicketModal from './NewTicketModal';
import TicketDetailsModal from './TicketDetailsModal';
import EditProjectModal from './EditProjectModal';

export default function ProjectBoard({ onProjectUpdated, onProjectDeleted }) {
  const pageWrapper = "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 md:p-8 font-sans text-slate-900 overflow-y-auto";
  const topNav = "max-w-7xl mx-auto mb-6 sm:mb-8";
  const backBtn = "inline-flex items-center text-sm sm:text-base font-bold text-slate-500 hover:text-indigo-600 transition-colors duration-200 cursor-pointer focus:outline-none";
  const headerSection = "max-w-7xl mx-auto mb-8 sm:mb-10 bg-white/80 backdrop-blur-xl p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-sm border border-white/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-6";
  const titleText = "text-2xl sm:text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight mb-2 sm:mb-3";
  const descText = "text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl";
  const actionButtonsWrapper = "flex flex-col sm:flex-row gap-3 sm:gap-4 w-full md:w-auto shrink-0";
  const editProjectBtn = "inline-flex items-center justify-center px-4 py-2.5 sm:px-5 sm:py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm sm:text-base font-bold rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-4 focus:ring-slate-200 cursor-pointer";
  const addTicketBtn = "inline-flex items-center justify-center px-4 py-2.5 sm:px-5 sm:py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-sm sm:text-base font-bold rounded-xl sm:rounded-2xl shadow-lg shadow-indigo-500/25 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer";
  const sectionTitle = "max-w-7xl mx-auto text-lg sm:text-xl font-black text-slate-800 mb-6 sm:mb-8";
  const gridContainer = "max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8";
  const ticketCard = "bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 border border-white/60 p-6 sm:p-8 transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1 group";
  const ticketTopRow = "flex justify-between items-start mb-3 sm:mb-4 gap-3";
  const ticketTitle = "font-extrabold text-slate-900 text-lg sm:text-xl leading-tight line-clamp-2 group-hover:text-indigo-600 transition-colors";
  const badgeBase = "shrink-0 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border";
  const badgeHigh = `${badgeBase} bg-red-50 text-red-700 border-red-100/50`;
  const badgeMedium = `${badgeBase} bg-amber-50 text-amber-700 border-amber-100/50`;
  const badgeLow = `${badgeBase} bg-emerald-50 text-emerald-700 border-emerald-100/50`;
  const badgeStatus = "px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-600 uppercase tracking-wide border border-slate-200/50";
  const ticketDesc = "text-sm sm:text-base text-slate-500 mb-6 flex-grow line-clamp-3 leading-relaxed";
  const ticketFooter = "pt-4 border-t border-slate-100/80 flex justify-between items-center text-xs sm:text-sm font-semibold text-slate-400";
  const loaderWrapper = "min-h-screen bg-slate-50 flex items-center justify-center p-4";
  const loaderContent = "flex items-center gap-3 text-base sm:text-lg text-indigo-600 font-bold animate-pulse";
  const loaderSpinner = "w-5 h-5 sm:w-6 sm:h-6 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin";
  const emptyStateWrapper = "col-span-full py-16 sm:py-24 flex flex-col items-center justify-center text-center bg-white/40 backdrop-blur-md rounded-3xl border-2 border-dashed border-slate-200/60";
  const emptyStateTitle = "text-lg sm:text-xl font-extrabold text-slate-700 mb-2";
  const emptyStateDesc = "text-sm sm:text-base text-slate-500 max-w-sm mb-6";

  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      try {
        const response = await fetch(`${baseUrl}/api/projects/${projectId}`, { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setProject(data);
        }
      } catch (error) {
        console.error("Failed to fetch project details");
      } finally {
        setLoading(false);
      }
    };
    fetchProjectDetails();
  }, [projectId]);

  if (loading || !project) {
    return (
      <div className={loaderWrapper}>
        <div className={loaderContent}>
          <div className={loaderSpinner}></div>
          <span>Loading board...</span>
        </div>
      </div>
    );
  }

  const getPriorityBadge = (priority) => {
    const p = priority?.toLowerCase();
    if (p === 'high') return <span className={badgeHigh}>{priority}</span>;
    if (p === 'medium') return <span className={badgeMedium}>{priority}</span>;
    return <span className={badgeLow}>{priority || 'Low'}</span>;
  };

  const handleProjectUpdate = (updatedProject) => {
    const mergedProject = { ...project, title: updatedProject.title, description: updatedProject.description };
    setProject(mergedProject);
    if (onProjectUpdated) onProjectUpdated(mergedProject);
  };

  return (
    <div className={pageWrapper}>
      <div className={topNav}>
        <button onClick={() => navigate('/projects')} className={backBtn}>&larr; Back to Projects</button>
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
        {project.tickets?.length === 0 ? (
          <div className={emptyStateWrapper}>
            <h3 className={emptyStateTitle}>No tickets yet</h3>
            <p className={emptyStateDesc}>Create your first ticket to start tracking tasks and bugs.</p>
            <button onClick={() => setIsNewTicketModalOpen(true)} className={addTicketBtn}>+ Create Ticket</button>
          </div>
        ) : (
          project.tickets?.map((ticket) => (
            <div key={ticket._id} className={ticketCard} onClick={() => { setSelectedTicket(ticket); setIsDetailsModalOpen(true); }}>
              <div className={ticketTopRow}>
                <h3 className={ticketTitle}>{ticket.title}</h3>
                {getPriorityBadge(ticket.priority)}
              </div>
              <p className={ticketDesc}>{ticket.description}</p>
              <div className={ticketFooter}>
                <span className={badgeStatus}>{ticket.status || 'Open'}</span>
                <span>By: {ticket.author?.username || 'Unknown'}</span>
              </div>
            </div>
          ))
        )}
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