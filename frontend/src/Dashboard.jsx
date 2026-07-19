import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import ProjectBoard from './ProjectBoard';
import NewProjectModal from './NewProjectModal';

export default function Dashboard({ currentUser, onLogout }) {
  const pageWrapper = "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 md:p-8 font-sans text-slate-900 overflow-y-auto";
  const topNavbar = "max-w-7xl mx-auto mb-8 sm:mb-10 flex justify-between items-center bg-white/80 backdrop-blur-xl p-4 sm:px-6 rounded-2xl sm:rounded-3xl shadow-sm border border-white/60";
  const welcomeText = "text-sm sm:text-base font-bold text-slate-700";
  const logoutBtn = "text-xs sm:text-sm font-bold text-slate-500 hover:text-red-600 transition-colors cursor-pointer px-3 py-1.5 rounded-xl hover:bg-red-50 focus:outline-none";
  const headerWrapper = "max-w-7xl mx-auto mb-6 sm:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4";
  const titleText = "text-2xl sm:text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight";
  const newProjectBtn = "inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-sm sm:text-base font-bold rounded-xl sm:rounded-2xl shadow-lg shadow-indigo-500/25 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 hover:-translate-y-0.5 active:translate-y-0";
  const gridContainer = "max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8";
  const cardWrapper = "bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 border border-white/60 p-6 sm:p-8 transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1 group";
  const cardHeader = "flex justify-between items-start mb-3 sm:mb-4 gap-3";
  const cardTitle = "text-lg sm:text-xl font-extrabold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors";
  const ticketBadge = "shrink-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100/50";
  const cardDescription = "text-sm sm:text-base text-slate-500 mb-6 flex-grow line-clamp-2 leading-relaxed";
  const cardFooter = "pt-4 border-t border-slate-100/80 flex items-center justify-between text-xs sm:text-sm text-slate-400 font-semibold";
  const viewBoardText = "text-indigo-600 group-hover:text-indigo-700 transition-colors flex items-center gap-1";
  const loaderWrapper = "min-h-screen bg-slate-50 flex items-center justify-center p-4";
  const loaderContent = "flex items-center gap-3 text-base sm:text-lg text-indigo-600 font-bold animate-pulse";
  const loaderSpinner = "w-5 h-5 sm:w-6 sm:h-6 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin";
  const emptyStateWrapper = "col-span-full py-16 sm:py-24 flex flex-col items-center justify-center text-center bg-white/40 backdrop-blur-md rounded-3xl border-2 border-dashed border-slate-200/60";
  const emptyStateTitle = "text-lg sm:text-xl font-extrabold text-slate-700 mb-2";
  const emptyStateDesc = "text-sm sm:text-base text-slate-500 mb-6 max-w-sm";

  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      try {
        const response = await fetch(`${baseUrl}/api/projects`, { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleLogout = async () => {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    try {
      await fetch(`${baseUrl}/api/auth/logout`, { method: 'POST', credentials: 'include' });
    } catch (err) {
      console.error("Logout failed");
    } finally {
      onLogout(); 
    }
  };

  const handleProjectUpdated = (updatedProject) => {
    setProjects(projects.map(p => p._id === updatedProject._id ? { ...p, title: updatedProject.title, description: updatedProject.description } : p));
  };

  const handleProjectDeleted = (deletedId) => {
    setProjects(projects.filter(p => p._id !== deletedId));
    navigate('/projects', { replace: true });
  };

  if (loading) {
    return (
      <div className={loaderWrapper}>
        <div className={loaderContent}>
          <div className={loaderSpinner}></div>
          <span>Loading your workspaces...</span>
        </div>
      </div>
    );
  }

  const dashboardGrid = (
    <div className={pageWrapper}>
      <div className={topNavbar}>
        <span className={welcomeText}>Welcome, {currentUser?.username || 'User'}</span>
        <button onClick={handleLogout} className={logoutBtn}>Sign Out</button>
      </div>

      <div className={headerWrapper}>
        <h1 className={titleText}>Active Projects</h1>
        <button onClick={() => setIsModalOpen(true)} className={newProjectBtn}>+ New Project</button>
      </div>

      <div className={gridContainer}>
        {projects.length === 0 ? (
          <div className={emptyStateWrapper}>
            <h3 className={emptyStateTitle}>No projects yet</h3>
            <p className={emptyStateDesc}>Create your first project to start organizing your tickets, bugs, and tasks.</p>
            <button onClick={() => setIsModalOpen(true)} className={newProjectBtn}>+ Create Project</button>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project._id} className={cardWrapper} onClick={() => navigate(`/projects/${project._id}`)}>
              <div className={cardHeader}>
                <h2 className={cardTitle}>{project.title}</h2>
                <span className={ticketBadge}>{project.tickets?.length || 0} Tickets</span>
              </div>
              <p className={cardDescription}>{project.description}</p>
              <div className={cardFooter}>
                <span>Owner: {project.owner?.username || 'Unknown'}</span>
                <span className={viewBoardText}>View Board &rarr;</span>
              </div>
            </div>
          ))
        )}
      </div>

      <NewProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={(newProject) => setProjects([...projects, newProject])} />
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={dashboardGrid} />
      <Route path=":projectId" element={
        <ProjectBoard onProjectUpdated={handleProjectUpdated} onProjectDeleted={handleProjectDeleted} />
      } />
    </Routes>
  );
}