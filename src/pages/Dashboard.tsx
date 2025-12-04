import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import RecipeList from '../modules/recipes/RecipeList'
import LiquidEther from '../components/LiquidEther'
import { UserIcon } from '../components/UserIcon'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      if (!mobile) setIsSidebarOpen(true)
      else setIsSidebarOpen(false)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { icon: '🏠', label: 'Home' },
    { icon: '📄', label: 'Recipes List', path: '/' },
    { icon: '📊', label: 'Analytics' },
    { icon: '👥', label: 'Team Members' },
    { icon: '⚙️', label: 'Settings' }
  ]

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', fontFamily: 'Arial, sans-serif', overflow: 'hidden' }}>
      
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <LiquidEther colors={['#5227FF', '#FF9FFC', '#B19EEF']} style={{ width: '100%', height: '100%' }} resolution={0.2} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', height: '100%' }}>
        
        {isMobile && isSidebarOpen && (
          <div 
            onClick={() => setIsSidebarOpen(false)}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 10,
              backdropFilter: 'blur(2px)'
            }}
          />
        )}

        <aside style={{
          position: isMobile ? 'absolute' : 'relative',
          zIndex: 20,
          height: '100%',
          width: isSidebarOpen ? '260px' : '0px',
          transition: 'width 0.3s ease',
          backgroundColor: 'rgba(20, 30, 50, 0.95)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'white',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          boxShadow: isSidebarOpen ? '5px 0 15px rgba(0,0,0,0.3)' : 'none'
        }}>
          <div style={{ 
            padding: '20px', 
            display: 'flex', 
            flexDirection: 'column', 
            height: '100%', 
            width: '260px',
            boxSizing: 'border-box' // Ensures padding doesn't add to width
          }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', flexShrink: 0 }}>
              <UserIcon />
              <div>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{user?.firstName} {user?.lastName}</div>
                <div style={{ fontSize: '12px', opacity: 0.6 }}>Admin</div>
              </div>
            </div>

            <nav style={{ flex: 1, overflowY: 'auto' }}> 
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {navItems.map((item) => (
                  <li key={item.label} style={{ marginBottom: '5px' }}>
                    {item.path ? (
                      <Link 
                        to={item.path} 
                        onClick={() => isMobile && setIsSidebarOpen(false)}
                        style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', cursor: 'pointer' }}
                      >
                        <span>{item.icon}</span> {item.label}
                      </Link>
                    ) : (
                      <div style={{ color: 'rgba(255, 255, 255, 0.7)', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', cursor: 'default' }}>
                        <span style={{ opacity: 0.8 }}>{item.icon}</span> {item.label}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div style={{ marginTop: 'auto', paddingTop: '20px', flexShrink: 0 }}>
              <button onClick={handleLogout} style={{ width: '100%', padding: '12px', background: 'rgba(239, 68, 68, 0.8)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                Logout
              </button>
            </div>
          </div>
        </aside>

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%' }}>
          <header style={{ padding: '15px 20px', background: 'rgba(255, 255, 255, 0.1)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'white', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', fontSize: '18px' }}>
              {isSidebarOpen ? '✕' : '☰'}
            </button>
            <h2 style={{ margin: 0, color: 'white', fontSize: '22px' }}>Dashboard</h2>
          </header>

          <div style={{ flex: 1, padding: isMobile ? '10px' : '20px', overflow: 'hidden' }}>
            <RecipeList />
          </div>
        </main>

      </div>
    </div>
  )
}

export default Dashboard