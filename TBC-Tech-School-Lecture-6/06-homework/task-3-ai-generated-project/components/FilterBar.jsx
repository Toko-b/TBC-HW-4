import React from 'react';

/**
 * დავალება 3 (AI პროექტი) - FilterBar კომპონენტი
 * 
 * ჟანრების ფილტრი
 */
function FilterBar({ genres, selectedGenre, onSelectGenre }) {
  return (
    <div style={{
      display: 'flex',
      gap: '10px',
      overflowX: 'auto',
      paddingBottom: '12px',
      marginBottom: '22px'
    }}>
      {genres.map((genre) => {
        const isSelected = genre === selectedGenre;
        return (
          <button
            key={genre}
            onClick={() => onSelectGenre(genre)}
            style={{
              backgroundColor: isSelected ? '#0284c7' : '#1e293b',
              color: isSelected ? '#ffffff' : '#94a3b8',
              border: isSelected ? '1px solid #38bdf8' : '1px solid #334155',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: isSelected ? 'bold' : '500',
              whiteSpace: 'nowrap',
              boxShadow: isSelected ? '0 4px 12px rgba(2, 132, 199, 0.4)' : 'none',
              transition: 'all 0.2s ease-in-out'
            }}
          >
            {genre}
          </button>
        );
      })}
    </div>
  );
}

export default FilterBar;
