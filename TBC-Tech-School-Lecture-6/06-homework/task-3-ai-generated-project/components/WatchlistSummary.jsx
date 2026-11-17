import React from 'react';

/**
 * დავალება 3 (AI პროექტი) - WatchlistSummary კომპონენტი
 * 
 * აჩვენებს არჩეული ფილმების შეჯამებას
 */
function WatchlistSummary({ watchlistCount, onClearWatchlist }) {
  return (
    <div style={{
      backgroundColor: '#0f172a',
      border: '1px solid #1e293b',
      borderRadius: '12px',
      padding: '14px 20px',
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#f8fafc',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '20px' }}>⭐</span>
        <span style={{ fontSize: '15px', color: '#e2e8f0' }}>
          თქვენს Watchlist-შია: <strong style={{ color: '#38bdf8', fontSize: '17px' }}>{watchlistCount}</strong> ფილმი
        </span>
      </div>                                                                                                                                                                                                                                                    

      {watchlistCount > 0 && (
        <button
          onClick={onClearWatchlist}
          style={{
            backgroundColor: 'transparent',
            border: '1px solid #ef4444',
            color: '#f87171',
            padding: '6px 14px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '600',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ef4444';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#f87171';
          }}
        >
          <span>🗑️</span> სიის გასუფთავება
        </button>
      )}
    </div>
  );
}

export default WatchlistSummary;
