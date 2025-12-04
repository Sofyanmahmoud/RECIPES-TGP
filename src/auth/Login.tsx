import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LiquidEther from '../components/LiquidEther';
import { UserIcon } from '../components/UserIcon';

const Login = () => {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(async () => {
      const result = await login(username, password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message || 'Login failed');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          style={{ width: '100%', height: '100%' }}
          resolution={0.2}
        />
      </div>

      <div style={{
        position: 'relative',
        zIndex: 1,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}>

        <div style={{
          width: '100%',
          maxWidth: '400px',
          padding: 'clamp(30px, 5vw, 40px)',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          color: 'white'
        }}>

          <div style={{ textAlign: 'center', marginBottom: 'clamp(20px, 4vw, 30px)' }}>
            
            {/* --- NEW ICON REPLACES THE PURPLE CIRCLE --- */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              marginBottom: '15px',
              transform: 'scale(1.5)' // Make it bigger for the login page
            }}>
              <UserIcon />
            </div>
            {/* ------------------------------------------- */}

            <h2 style={{ margin: 0, fontSize: 'clamp(22px, 4vw, 28px)' }}>Welcome Back</h2>
            <p style={{ margin: '10px 0 0', opacity: 0.7, fontSize: 'clamp(14px, 2vw, 16px)' }}>Login as Admin</p>
          </div>

          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.5)',
              color: '#ffcdcd',
              padding: 'clamp(8px, 2vw, 10px)',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: 'clamp(12px, 2vw, 14px)',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: 'clamp(12px, 2vw, 14px)',
                opacity: 0.9
              }}>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={inputStyle}
                placeholder="Enter username"
              />
            </div>

            <div style={{ marginBottom: 'clamp(20px, 4vw, 30px)' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: 'clamp(12px, 2vw, 14px)',
                opacity: 0.9
              }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: 'clamp(12px, 2vw, 14px)',
                borderRadius: '8px',
                border: 'none',
                background: isLoading ? 'rgba(255,255,255,0.2)' : 'white',
                color: isLoading ? 'white' : '#5227FF',
                fontWeight: 'bold',
                fontSize: 'clamp(14px, 2vw, 16px)',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}
            >
              {isLoading ? 'Logging in...' : 'Sign In'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 15px',
  borderRadius: '8px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  background: 'rgba(0, 0, 0, 0.2)',
  color: 'white',
  fontSize: 'clamp(14px, 2vw, 16px)',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.3s'
};

export default Login;