import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import RecipeList from '../modules/recipes/RecipeList';
import LiquidEther from '../components/LiquidEther';
import { UserIcon } from '../components/UserIcon'; 

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Reusable style for menu items so they all look the same
  const menuItemStyle: React.CSSProperties = {
    color: 'rgba(255, 255, 255, 0.7)', // Slightly transparent for non-active items
    fontSize: 'clamp(14px, 2.5vw, 18px)',
    padding: '12px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'default', // Shows arrow cursor (not clickable)
    transition: 'color 0.2s'
  };

  const activeItemStyle: React.CSSProperties = {
    ...menuItemStyle,
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer'
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', fontFamily: 'Arial, sans-serif', overflow: 'hidden' }}>

      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          style={{ width: '100%', height: '100%' }}
          resolution={0.2}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', height: '100%', width: '100%' }}>

        <aside style={{
          width: isSidebarOpen ? 'clamp(200px, 30vw, 260px)' : '0px',
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backgroundColor: 'rgba(20, 30, 50, 0.6)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'white',
          overflow: 'hidden',
          height: '100%',
          boxSizing: 'border-box',
          flexShrink: 0
        }}>

          <div style={{
            width: '260px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: 'clamp(15px, 3vw, 20px)',
            boxSizing: 'border-box'
          }}>

            {/* HEADER with new Icon */}
            <div style={{
              marginBottom: '40px',
              display: 'flex',
              gap: '12px',
              alignItems: 'center'
            }}>
              <UserIcon />
              <span style={{ 
                color: 'white', 
                fontSize: '22px', 
                fontWeight: 'bold',
                whiteSpace: 'nowrap' 
              }}>
                Admin
              </span>
            </div>

            {/* --- MENU ITEMS --- */}
            <nav style={{ flex: 1 }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                
                {/* 1. Fake Home Item */}
                <li style={menuItemStyle}>
                  <span style={{ opacity: 0.8 }}>🏠</span> Home
                </li>

                {/* 2. REAL Recipes List Item (Active) */}
                <li>
                  <Link to="/" style={{ textDecoration: 'none' }}>
                    <div style={activeItemStyle}>
                      <span>📄</span> Recipes List
                    </div>
                  </Link>
                </li>

                
                <li style={menuItemStyle}>
                  <span style={{ opacity: 0.8 }}>📊</span> Profit
                </li>
                 <li style={menuItemStyle}>
                  <span style={{ opacity: 0.8 }}>👥</span> Staff 
                </li>

                <li style={menuItemStyle}>
                  <span style={{ opacity: 0.8 }}>⚙️</span> Settings
                </li>

              </ul>
            </nav>

            
            <div style={{ marginTop: 'auto' }}>
              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  background: 'rgba(239, 68, 68, 0.8)',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '15px'
                }}
              >
                Logout
              </button>
            </div>

          </div>
        </aside>

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

          <header style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '15px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexShrink: 0
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  cursor: 'pointer',
                  fontSize: '20px',
                  color: 'white'
                }}
              >
                {isSidebarOpen ? '✕' : '☰'}
              </button>
              <h2 style={{
                margin: 0,
                color: 'white',
                fontSize: '22px'
              }}>Dashboard</h2>
            </div>
            <span style={{
              fontWeight: 'bold',
              color: 'white'
            }}>
              {user?.firstName} {user?.lastName}
            </span>
          </header>

          <div style={{
            flex: 1,
            padding: '20px',
            color: 'white',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <RecipeList />
          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;