import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createRecipe, updateRecipe, getRecipe } from '../../api/recipeService'
import { toast } from 'react-toastify'

const RecipeForm = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditMode = Boolean(id)

  const [formData, setFormData] = useState({ name: '', cuisine: '', difficulty: 'Easy', image: '' })
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState('')

  useEffect(() => {
    if (isEditMode && id) loadRecipe(Number(id))
  }, [id, isEditMode])

  const loadRecipe = async (id: number) => {
    try {
      setLoading(true)
      const data = await getRecipe(id)
      setFormData({ name: data.name, cuisine: data.cuisine, difficulty: data.difficulty, image: data.image })
      setPreview(data.image)
    } catch {
      toast.error('Failed to load recipe')
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image too large (max 5MB)')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const res = reader.result as string
      setFormData({ ...formData, image: res })
      setPreview(res)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.cuisine) return toast.error('Required fields missing')

    try {
      setLoading(true)
      if (isEditMode && id) {
        await updateRecipe(Number(id), formData)
        toast.success('Updated!')
      } else {
        await createRecipe(formData)
        toast.success('Created!')
      }
      navigate('/')
    } catch {
      toast.error('Operation failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <h2 style={styles.title}>{isEditMode ? 'Edit Recipe' : 'New Recipe'}</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input name="name" placeholder="Recipe Name" value={formData.name} onChange={handleChange} required style={styles.input} />
          <input name="cuisine" placeholder="Cuisine" value={formData.cuisine} onChange={handleChange} required style={styles.input} />
          
          <select name="difficulty" value={formData.difficulty} onChange={handleChange} style={styles.input}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Compact Image Section */}
          <div style={{ width: '100%' }}>
            {preview ? (
              <div style={styles.previewContainer}>
                <img src={preview} alt="Preview" style={styles.previewImage} />
                <button type="button" onClick={() => { setFormData({ ...formData, image: '' }); setPreview('') }} style={styles.removeBtn}>×</button>
              </div>
            ) : (
              <label style={styles.uploadBox}>
                <span style={{ fontSize: '24px', marginRight: '10px' }}>📷</span>
                <span style={{ fontSize: '14px', opacity: 0.8 }}>Upload Image</span>
                <input type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
              </label>
            )}
          </div>

          <div style={styles.btnGroup}>
            <button type="submit" disabled={loading} style={{ ...styles.btn, background: 'white', color: '#667eea' }}>
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button type="button" onClick={() => navigate('/')} style={{ ...styles.btn, background: 'rgba(255,255,255,0.2)', color: 'white' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed', inset: 0, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999
  },
  card: {
    width: '90%', maxWidth: '400px', background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)',
    borderRadius: '20px', padding: '25px', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
  },
  title: { color: 'white', textAlign: 'center', margin: '0 0 20px 0' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  input: {
    width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(136, 133, 133, 0.2)',
    background: 'rgba(0, 0, 0, 0.2)', color: 'white', outline: 'none', boxSizing: 'border-box'
  },
  uploadBox: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '10px',
    borderRadius: '8px', border: '2px dashed rgba(255, 255, 255, 0.3)', background: 'rgba(0, 0, 0, 0.1)',
    cursor: 'pointer', color: 'white', boxSizing: 'border-box'
  },
  previewContainer: { position: 'relative', width: '100%', borderRadius: '8px', overflow: 'hidden' },
  previewImage: { width: '100%', height: '140px', objectFit: 'cover', display: 'block' },
  removeBtn: {
    position: 'absolute', top: '5px', right: '5px', width: '24px', height: '24px', borderRadius: '50%',
    background: 'white', border: 'none', color: '#667eea', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  btnGroup: { display: 'flex', gap: '10px', marginTop: '10px' },
  btn: { flex: 1, padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }
}

export default RecipeForm