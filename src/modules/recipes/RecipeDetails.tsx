import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getRecipe } from '../../api/recipeService';
import { Recipe } from '../../types';
import { toast } from 'react-toastify';

const RecipeDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchRecipe(Number(id));
        }
    }, [id]);

    const fetchRecipe = async (recipeId: number) => {
        try {
            setLoading(true);
            const data = await getRecipe(recipeId);
            setRecipe(data);
        } catch (error) {
            toast.error('Failed to load recipe details');
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontSize: '20px'
            }}>
                Loading...
            </div>
        );
    }

    if (!recipe) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontSize: '20px'
            }}>
                Recipe not found
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            padding: 'clamp(20px, 3vw, 60px)',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
            }}>
                {recipe.image && (
                    <div style={{
                        width: '100%',
                        height: 'clamp(250px, 40vw, 400px)',
                        overflow: 'hidden'
                    }}>
                        <img
                            src={recipe.image}
                            alt={recipe.name}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                )}

                <div style={{ padding: 'clamp(20px, 5vw, 40px)' }}>
                    <h1 style={{
                        color: 'white',
                        fontSize: 'clamp(24px, 5vw, 36px)',
                        marginBottom: '20px',
                        fontWeight: 'bold'
                    }}>
                        {recipe.name}
                    </h1>

                    <div style={{
                        display: 'flex',
                        gap: '15px',
                        marginBottom: '30px',
                        flexWrap: 'wrap'
                    }}>
                        <span style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            color: 'white',
                            fontSize: 'clamp(12px, 2vw, 14px)',
                            fontWeight: '500'
                        }}>
                            🍽️ {recipe.cuisine}
                        </span>
                        <span style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            color: 'white',
                            fontSize: 'clamp(12px, 2vw, 14px)',
                            fontWeight: '500'
                        }}>
                            📊 {recipe.difficulty}
                        </span>
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: '15px',
                        marginTop: '40px',
                        flexWrap: 'wrap'
                    }}>
                        <Link
                            to={`/recipes/edit/${recipe.id}`}
                            style={{
                                flex: '1 1 200px',
                                padding: '14px',
                                background: 'white',
                                color: '#667eea',
                                border: 'none',
                                borderRadius: '10px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                textDecoration: 'none',
                                display: 'block',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                transition: 'transform 0.2s'
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
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                        >
                            ← Back to List
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;
