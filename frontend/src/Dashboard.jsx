import { useState, useEffect } from 'react';
import ProjectBoard from './ProjectBoard';
import NewProjectModal from './NewProjectModal';

export default function Dashboard({ currentUser, onLogout }) {
  const pageWrapper = "min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8 lg:p-12 font-sans";
  const topNavbar = "max-w-7xl mx-auto mb-8 flex justify-between items-center bg-white p-4 sm:px-6 rounded-2xl shadow-sm border border-slate-100";
  const welcomeText = "text-sm sm:text-base font-bold text-slate-700";
  const logoutBtn = "text-sm font-bold text-slate-500 hover:text-red-600 transition-colors cursor-pointer";
  const headerWrapper = "max-w-7xl mx-auto mb-8 sm:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4";
  const titleText = "text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight";
  const newProjectBtn = "inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm sm:text-base font-bold rounded-xl shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2";
  const gridContainer = "max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8";
  const cardWrapper = "bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 border border-slate-100 p-5 sm:p-6 transition-all duration-200 flex flex-col cursor-pointer";
  const cardHeader = "flex justify-between items-start mb-4 gap-2";
  const cardTitle = "text-lg sm:text-xl font-bold text-slate-900 line-clamp-1";
  const ticketBadge = "shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100";
  const cardDescription = "text-sm text-slate-500 mb-6 flex-grow line-clamp-2 leading-relaxed";
  const cardFooter = "pt-4 border-t border-slate-50 flex items-center justify-between text-xs sm:text-sm text-slate-400 font-medium";
  const loadingWrapper = "max-w-7xl mx-auto text-center py-20";
  const loadingText = "text-lg text-slate-500 font-semibold animate-pulse";

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/projects', {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3000/api/auth/logout', { 
        method: 'POST',
        credentials: 'include'
      });
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      onLogout(); 
    }
  };

  if (loading) return <div className={pageWrapper}><div className={loadingWrapper}><p className={loadingText}>Loading your workspaces...</p></div></div>;
  
  if (selectedProjectId) {
    return (
      <ProjectBoard 
        projectId={selectedProjectId} 
        onBack={() => setSelectedProjectId(null)} 
        onProjectUpdated={(updatedProject) => {
          setProjects(projects.map(p => p._id === updatedProject._id ? { ...p, title: updatedProject.title, description: updatedProject.description } : p));
        }}
        onProjectDeleted={(deletedId) => {
          setProjects(projects.filter(p => p._id !== deletedId));
          setSelectedProjectId(null); 
        }}
      />
    );
  }

  return (
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
        {projects.map((project) => (
          <div key={project._id} className={cardWrapper} onClick={() => setSelectedProjectId(project._id)}>
            <div className={cardHeader}>
              <h2 className={cardTitle}>{project.title}</h2>
              <span className={ticketBadge}>{project.tickets?.length || 0} Tickets</span>
            </div>
            <p className={cardDescription}>{project.description}</p>
            <div className={cardFooter}>
              <span>Owner: {project.owner?.username || 'Unknown'}</span>
              <span className="text-indigo-600 hover:text-indigo-800">View Board &rarr;</span>
            </div>
          </div>
        ))}
      </div>

      <NewProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={(newProject) => setProjects([...projects, newProject])} />
    </div>
  );
}