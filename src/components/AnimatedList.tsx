import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './AnimatedList.css';
import { Recipe } from '../types/index';

const AnimatedItem = ({ children, index, onMouseEnter }: { children: React.ReactNode; index: number; onMouseEnter: () => void }) => {
  return (
    <motion.div
      data-index={index}
      onMouseEnter={onMouseEnter}
      initial={{ scale: 0.9, opacity: 0, y: 10 }}
      whileInView={{ scale: 1, opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, delay: 0.05 }}
      style={{ marginBottom: '1rem' }}
    >
      {children}
    </motion.div>
  );
};

interface AnimatedListProps {
  items?: Recipe[];
  onDelete: (id: number) => void;
  className?: string;
}

const AnimatedList = ({
  items = [],
  onDelete,
  className = '',
}: AnimatedListProps) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleItemMouseEnter = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  return (
    <div className={`scroll-list-container ${className}`}>

      <div className="scroll-list">
        {items.map((recipe, index) => (
          <AnimatedItem
            key={recipe.id || index}
            index={index}
            onMouseEnter={() => handleItemMouseEnter(index)}
          >
            <div className={`item ${selectedIndex === index ? 'selected' : ''}`}>

              <img
                src={recipe.image}
                alt={recipe.name}
                loading="lazy"
                style={{
                  width: 'clamp(50px, 10vw, 60px)',
                  height: 'clamp(50px, 10vw, 60px)',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  background: '#333'
                }}
              />

              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="item-text" style={{
                  fontSize: 'clamp(14px, 2vw, 16px)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>{recipe.name}</p>
                <div style={{
                  fontSize: 'clamp(12px, 1.5vw, 14px)',
                  opacity: 0.8,
                  display: 'flex',
                  gap: '10px',
                  marginTop: '4px',
                  flexWrap: 'wrap'
                }}>
                  <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px' }}>
                    {recipe.cuisine}
                  </span>
                  <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px' }}>
                    {recipe.difficulty}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 'clamp(5px, 1vw, 10px)', flexWrap: 'wrap' }}>
                <Link to={`/recipes/${recipe.id}`}>
                  <button style={{
                    background: 'rgba(56, 189, 248, 0.8)',
                    color: 'white',
                    border: 'none',
                    padding: 'clamp(6px, 1vw, 8px) clamp(12px, 2vw, 15px)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: 'clamp(12px, 1.5vw, 14px)',
                    whiteSpace: 'nowrap'
                  }}>
                    View
                  </button>
                </Link>
                <Link to={`/recipes/edit/${recipe.id}`}>
                  <button style={{
                    background: 'rgba(255,255,255,0.9)',
                    color: 'black',
                    border: 'none',
                    padding: 'clamp(6px, 1vw, 8px) clamp(12px, 2vw, 15px)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: 'clamp(12px, 1.5vw, 14px)',
                    whiteSpace: 'nowrap'
                  }}>
                    Edit
                  </button>
                </Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(recipe.id);
                  }}
                  style={{
                    background: 'rgba(239, 68, 68, 0.8)',
                    color: 'white',
                    border: 'none',
                    padding: 'clamp(6px, 1vw, 8px) clamp(12px, 2vw, 15px)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: 'clamp(12px, 1.5vw, 14px)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Delete
                </button>
              </div>

            </div>
          </AnimatedItem>
        ))}
      </div>
    </div>
  );
};

export default AnimatedList;