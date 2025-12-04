import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getRecipe } from '../../api/recipeService'
import { Recipe } from '../../types'
import { toast } from 'react-toastify'

const RecipeDetails = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [recipe, setRecipe] = useState<Recipe | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (id) {
            fetchRecipe(Number(id))
        }
    }, [id])

    const fetchRecipe = async (recipeId: number) => {
        try {
            setLoading(true)
            const data = await getRecipe(recipeId)
            setRecipe(data)
        } catch (error) {
            toast.error('Failed to load recipe details')
            navigate('/')
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                color: 'white',
                fontSize: '20px'
            }}>
                Loading...
            </div>
        )
    }

    if (!recipe) return null

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: '20px',
            boxSizing: 'border-box'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '600px',
                maxHeight: '90vh',
                overflowY: 'auto',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: 'clamp(20px, 5vw, 40px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                color: 'white'
            }}>
                <h1 style={{ fontSize: 'clamp(24px, 5vw, 36px)', marginBottom: '10px', textAlign: 'center' }}>
                    {recipe.name}
                </h1>
                
                <p style={{ textAlign: 'center', opacity: 0.8, marginBottom: '30px', fontSize: '18px' }}>
                    {recipe.cuisine} • {recipe.difficulty}
                </p>

                {recipe.image && (
                    <img 
                        src={recipe.image} 
                        alt={recipe.name} 
                        style={{
                            width: '100%',
                            height: '250px',
                            objectFit: 'cover',
                            borderRadius: '12px',
                            marginBottom: '30px',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}
                    />
                )}

                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <Link 
                        to={`/recipes/edit/${recipe.id}`}
                        style={{
                            flex: '1 1 200px',
                            padding: '14px',
                            background: 'white',
                            color: '#667eea',
                            borderRadius: '10px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            textDecoration: 'none',
                            display: 'block',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                        }}
                    >
                        ✏️ Edit Recipe
                    </Link>

                    <button
                        onClick={() => navigate('/')}
                        style={{
                            flex: '1 1 200px',
                            padding: '14px',
                            background: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '10px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        ← Back to List
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RecipeDetails