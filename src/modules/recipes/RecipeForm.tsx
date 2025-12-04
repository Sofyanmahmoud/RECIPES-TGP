import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createRecipe, updateRecipe, getRecipe } from '../../api/recipeService';
import { toast } from 'react-toastify';

const RecipeForm = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        name: '',
        cuisine: '',
        difficulty: 'Easy',
        image: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditMode && id) {
            fetchRecipe(Number(id));
        }
    }, [id, isEditMode]);

    const fetchRecipe = async (recipeId: number) => {
        try {
            setLoading(true);
            const recipe = await getRecipe(recipeId);
            setFormData({
                name: recipe.name,
                cuisine: recipe.cuisine,
                difficulty: recipe.difficulty,
                image: recipe.image
            });
        } catch (error) {
            toast.error('Failed to load recipe');
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.cuisine) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            setLoading(true);
            if (isEditMode && id) {
                await updateRecipe(Number(id), formData);
                toast.success('Recipe updated successfully!');
            } else {
                await createRecipe(formData);
                toast.success('Recipe created successfully!');
            }
            navigate('/');
        } catch (error) {
            toast.error(isEditMode ? 'Failed to update recipe' : 'Failed to create recipe');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', // This floats it on top of everything
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            justifyContent: 'center', // Centers horizontally
            alignItems: 'center',     // Centers vertically
            zIndex: 9999, // Ensures it is above everything else
            overflowY: 'auto'
        }}>
            <div style={{
                width: '90%',
                maxWidth: '450px', // Keeps the form small and nice
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '30px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <h2 style={{
                    color: 'white',
                    marginBottom: '20px',
                    textAlign: 'center',
                    marginTop: 0
                }}>
                    {isEditMode ? 'Edit Recipe' : 'Add New Recipe'}
                </h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    
                    <div>
                        <label style={labelStyle}>Recipe Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter name"
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>Cuisine</label>
                        <input
                            type="text"
                            name="cuisine"
                            value={formData.cuisine}
                            onChange={handleChange}
                            placeholder="Enter cuisine"
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>Difficulty</label>
                        <select
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleChange}
                            style={inputStyle}
                        >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>

                    <div>
                        <label style={labelStyle}>Image URL</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://..."
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                flex: 1,
                                padding: '12px',
                                background: 'white',
                                color: '#667eea',
                                border: 'none',
                                borderRadius: '10px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            style={{
                                flex: 1,
                                padding: '12px',
                                background: 'rgba(255,255,255,0.1)',
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '10px',
                                cursor: 'pointer'
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const labelStyle: React.CSSProperties = {
    display: 'block',
    color: 'white',
    marginBottom: '5px',
    fontSize: '14px',
    fontWeight: '500'
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    background: 'rgba(0, 0, 0, 0.2)',
    color: 'white',
    outline: 'none',
    boxSizing: 'border-box'
};

export default RecipeForm;