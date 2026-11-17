import React, { useState } from 'react';

/**
 * დავალება 3 (AI პროექტი) - MovieCard კომპონენტი
 * 
 * გენერირებულია AI-ის მიერ და გაუმჯობესებულია სტუდენტის მიერ:
 * ✨ გაუმჯობესება 1: დამატებულია ახალი ველები (ხანგრძლივობა, რეჟისორი, IMDb ბმული)
 * ✨ გაუმჯობესება 2: ვიზუალური მხარე (Hover ეფექტი, განახლებული ბეიჯები, გრადიენტი)
 */
function MovieCard({
  title,
  year,
  genre,
  rating,
  duration = '2სთ 15წთ',
  director = 'უცნობი',
  imdbUrl,
  posterUrl = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
  onAddToWatchlist,
  isInWatchlist = false
}) {
  // სტუდენტის გაუმჯობესება: Hover ეფექტის მდგომარეობა (State)
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: isHovered ? '1px solid #38bdf8' : '1px solid #334155',
        borderRadius: '14px',
        backgroundColor: '#1e293b',
        color: '#f8fafc',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: isHovered 
          ? '0 16px 28px -6px rgba(2, 132, 199, 0.3)' 
          : '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.25s ease-in-out'
      }}
    >
      {/* ფილმის პოსტერი და ბეიჯები */}
      <div style={{ position: 'relative', width: '100%', height: '220px', backgroundColor: '#0f172a', overflow: 'hidden' }}>
        <img
          src={posterUrl}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.4s ease'
          }}
        />

        {/* რეიტინგის ბეიჯი */}
        <span style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: 'rgba(15, 23, 42, 0.88)',
          color: '#fbbf24',
          padding: '4px 10px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 'bold',
          border: '1px solid #f59e0b',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          ⭐ {rating}
        </span>

        {/* ახალი ველი 1: ხანგრძლივობის ბეიჯი პოსტერზე */}
        <span style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          color: '#94a3b8',
          padding: '3px 8px',
          borderRadius: '6px',
          fontSize: '11px',
          fontWeight: '500',
          backdropFilter: 'blur(4px)'
        }}>
          ⏱️ {duration}
        </span>
      </div>

      {/* ფილმის დეტალური ინფორმაცია */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
        <div>
          {/* ჟანრი და წელი */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{
              fontSize: '11px',
              backgroundColor: '#0f172a',
              color: '#38bdf8',
              border: '1px solid #0284c7',
              padding: '2px 8px',
              borderRadius: '12px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {genre}
            </span>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
              📅 {year}
            </span>
          </div>

          {/* სათაური */}
          <h3 style={{ margin: '0 0 8px 0', fontSize: '17px', fontWeight: 'bold', color: '#f1f5f9', lineHeight: '1.3' }}>
            {title}
          </h3>

          {/* ახალი ველი 2: რეჟისორი */}
          <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#94a3b8' }}>
            🎬 რეჟისორი: <strong style={{ color: '#cbd5e1' }}>{director}</strong>
          </p>

          {/* ახალი ველი 3: IMDb ბმული */}
          {imdbUrl && (
            <div style={{ marginBottom: '14px' }}>
              <a
                href={imdbUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: '11px',
                  color: '#f59e0b',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontWeight: '600'
                }}
              >
                <span>IMDb პროფილის ნახვა</span> ↗
              </a>
            </div>
          )}
        </div>

        {/* Watchlist ღილაკი */}
        <button
          onClick={onAddToWatchlist}
          disabled={isInWatchlist}
          style={{
            width: '100%',
            backgroundColor: isInWatchlist ? '#334155' : (isHovered ? '#0284c7' : '#0369a1'),
            color: isInWatchlist ? '#94a3b8' : '#ffffff',
            border: 'none',
            padding: '10px 14px',
            borderRadius: '8px',
            cursor: isInWatchlist ? 'default' : 'pointer',
            fontWeight: 'bold',
            fontSize: '13px',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          {isInWatchlist ? (
            <>
              <span>✓</span> დამატებულია
            </>
          ) : (
            <>
              <span>+</span> Watchlist-ში დამატება
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
