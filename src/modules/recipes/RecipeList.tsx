import { useEffect, useState } from 'react'
import { getRecipes, deleteRecipe } from '../../api/recipeService'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import AnimatedList from '../../components/AnimatedList'
import { Recipe } from '../../types/index'

const RecipeList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchRecipes()
  }, [])

  const fetchRecipes = async () => {
    try {
      const data = await getRecipes()
      setRecipes(data)
    } catch (error) {
      console.error("Error fetching recipes:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await deleteRecipe(id)
        setRecipes(recipes.filter(recipe => recipe.id !== id))
        toast.success("Recipe deleted successfully!")
      } catch (error) {
        toast.error("Failed to delete recipe")
      }
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', width: '100%' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(255,255,255,0.1)',
          borderLeftColor: '#ffffff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexShrink: 0,
        gap: '15px'
      }}>
        <h2 style={{ color: 'white', margin: 0, fontSize: '24px' }}>All Recipes</h2>
        
        <Link to="/recipes/add">
          <button style={{
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            + Add New Recipe
          </button>
        </Link>
      </div>

      <div style={{ flex: 1, minHeight: 0 }}>
        <AnimatedList items={recipes} onDelete={handleDelete} />
      </div>
    </div>
  )
}

export default RecipeList