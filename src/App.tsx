import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './auth/Login';
import ProtectedRoute from './auth/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import RecipeForm from './modules/recipes/RecipeForm';
import RecipeDetails from './modules/recipes/RecipeDetails';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recipes/add"
          element={
            <ProtectedRoute>
              <RecipeForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recipes/edit/:id"
          element={
            <ProtectedRoute>
              <RecipeForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recipes/:id"
          element={
            <ProtectedRoute>
              <RecipeDetails />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;