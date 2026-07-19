import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';

export default function App() {
  const pageWrapper = "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans text-slate-900 overflow-y-auto";
  const cardContainer = "max-w-md w-full bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl shadow-indigo-500/10 border border-white/60 p-6 sm:p-8 md:p-10 transition-all duration-300 mx-auto";
  const headerSection = "text-center mb-8 sm:mb-10";
  const appTitle = "text-2xl sm:text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight leading-tight";
  const appSubtitle = "mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-500 font-medium";
  const formWrapper = "space-y-5 sm:space-y-6";
  const inputGroup = "space-y-1.5 sm:space-y-2";
  const labelStyle = "block text-xs sm:text-sm font-bold text-slate-700 ml-1";
  const inputStyle = "block w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-slate-50/50 border border-slate-200 rounded-xl sm:rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-300 shadow-sm text-sm sm:text-base";
  const buttonStyle = "w-full flex justify-center py-3.5 sm:py-4 px-4 rounded-xl sm:rounded-2xl shadow-lg shadow-indigo-500/25 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 mt-2 sm:mt-4 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none";
  const errorMessage = "mt-3 sm:mt-4 text-xs sm:text-sm text-red-600 bg-red-50/80 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-red-100 text-center font-semibold shadow-sm";
  const loaderWrapper = "min-h-screen bg-slate-50 flex items-center justify-center p-4";
  const loaderContent = "flex items-center gap-3 text-base sm:text-lg text-indigo-600 font-bold animate-pulse";
  const loaderSpinner = "w-5 h-5 sm:w-6 sm:h-6 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin";
  const toggleWrapper = "mt-6 sm:mt-8 text-center text-xs sm:text-sm md:text-base text-slate-500 font-medium flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5";
  const toggleLink = "font-bold text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer focus:outline-none hover:underline decoration-2 underline-offset-4";

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      try {
        const response = await fetch(`${baseUrl}/api/auth/check-session`, { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error("No active session found");
      } finally {
        setIsCheckingSession(false);
      }
    };
    checkSession();
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const endpoint = isLoginMode ? `${baseUrl}/api/auth/login` : `${baseUrl}/api/auth/register`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setUser(data.user); 
      } else {
        setError(data.error || data.err || data.message || (isLoginMode ? 'Invalid credentials' : 'Registration failed.'));
      }
    } catch (err) {
      setError('Could not connect to the server');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setError('');
    setUsername('');
    setPassword('');
  };

  if (isCheckingSession) {
    return (
      <div className={loaderWrapper}>
        <div className={loaderContent}>
          <div className={loaderSpinner}></div>
          <span>Verifying session...</span>
        </div>
      </div>
    );
  }

  const authScreen = (
    <div className={pageWrapper}>
      <div className={cardContainer}>
        <div className={headerSection}>
          <h2 className={appTitle}>Nexus Tracker</h2>
          <p className={appSubtitle}>{isLoginMode ? 'Sign in to your workspace' : 'Create an account to begin'}</p>
        </div>

        <form onSubmit={handleAuth} className={formWrapper}>
          <div className={inputGroup}>
            <label htmlFor="username" className={labelStyle}>Username</label>
            <input id="username" type="text" placeholder={isLoginMode ? "e.g. Ashish or Alex_Dev" : "Choose a unique username"} value={username} onChange={(e) => setUsername(e.target.value)} className={inputStyle} required />
          </div>

          <div className={inputGroup}>
            <label htmlFor="password" className={labelStyle}>Password</label>
            <input id="password" type="password" placeholder={isLoginMode ? "Enter your password" : "Create a strong password"} value={password} onChange={(e) => setPassword(e.target.value)} className={inputStyle} required />
          </div>

          {error && <div className={errorMessage}>{error}</div>}

          <button type="submit" disabled={isLoading} className={buttonStyle}>
            {isLoading ? 'Processing...' : (isLoginMode ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className={toggleWrapper}>
          <span>{isLoginMode ? "Don't have an account?" : "Already have an account?"}</span>
          <button onClick={toggleMode} className={toggleLink} type="button">{isLoginMode ? "Sign up" : "Sign in"}</button>
        </div>
      </div>
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/projects" replace /> : authScreen} />
        <Route path="/projects/*" element={user ? <Dashboard currentUser={user} onLogout={() => setUser(null)} /> : <Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}