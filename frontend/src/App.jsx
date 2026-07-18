import { useState, useEffect } from 'react';
import Dashboard from './Dashboard';

export default function App() {
  const pageWrapper = "min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 font-sans";
  const cardContainer = "max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8 md:p-10 transition-all duration-300";
  const headerSection = "text-center mb-8";
  const appTitle = "text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl";
  const appSubtitle = "mt-2 text-sm text-slate-500 sm:text-base";
  const formWrapper = "space-y-5 sm:space-y-6";
  const inputGroup = "relative";
  const labelStyle = "block text-sm font-semibold text-slate-700 mb-1.5";
  const inputStyle = "block w-full px-4 py-3 sm:py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all duration-200 text-sm sm:text-base";
  const buttonStyle = "w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm sm:text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-colors duration-200 mt-4 sm:mt-6 disabled:opacity-70 disabled:cursor-not-allowed";
  const errorMessage = "mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 text-center font-medium";
  const loaderText = "text-lg text-slate-500 font-semibold animate-pulse";
  const toggleWrapper = "mt-6 text-center text-sm sm:text-base";
  const toggleTextBase = "text-slate-600";
  const toggleLink = "ml-1 font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer focus:outline-none focus:underline";

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/check-session', {
          credentials: 'include'
        });
        
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

    const endpoint = isLoginMode ? 'http://localhost:3000/api/auth/login' : 'http://localhost:3000/api/auth/register';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user); 
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.err || errorData.message || (isLoginMode ? 'Invalid credentials' : 'Registration failed.'));
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

  if (isCheckingSession) return <div className={pageWrapper}><p className={loaderText}>Verifying session...</p></div>;
  if (user) return <Dashboard currentUser={user} onLogout={() => setUser(null)} />;

  return (
    <div className={pageWrapper}>
      <div className={cardContainer}>
        <div className={headerSection}>
          <h2 className={appTitle}>Nexus Tracker</h2>
          <p className={appSubtitle}>{isLoginMode ? 'Sign in to manage your projects' : 'Create an account to get started'}</p>
        </div>

        <form onSubmit={handleAuth} className={formWrapper}>
          <div className={inputGroup}>
            <label htmlFor="username" className={labelStyle}>Username</label>
            <input
              id="username"
              type="text"
              placeholder={isLoginMode ? "e.g. Ashish or Alex_Dev" : "Choose a unique username"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={inputStyle}
              required
            />
          </div>

          <div className={inputGroup}>
            <label htmlFor="password" className={labelStyle}>Password</label>
            <input
              id="password"
              type="password"
              placeholder={isLoginMode ? "Enter your password" : "Create a strong password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputStyle}
              required
            />
          </div>

          {error && <div className={errorMessage}>{error}</div>}

          <button type="submit" disabled={isLoading} className={buttonStyle}>
            {isLoading ? 'Processing...' : (isLoginMode ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className={toggleWrapper}>
          <span className={toggleTextBase}>{isLoginMode ? "Don't have an account?" : "Already have an account?"}</span>
          <button onClick={toggleMode} className={toggleLink} type="button">{isLoginMode ? "Sign up" : "Sign in"}</button>
        </div>
      </div>
    </div>
  );
}