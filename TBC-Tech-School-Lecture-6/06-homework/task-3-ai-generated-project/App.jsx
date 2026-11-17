import React, { useState } from 'react';
import MovieCard from './components/MovieCard.jsx';
import FilterBar from './components/FilterBar.jsx';
import WatchlistSummary from './components/WatchlistSummary.jsx';

/**
 * დავალება 3: MovieHub - AI-ით გენერირებული მინი-პროექტი
 * შემოწმებული და გაუმჯობესებული სტუდენტის მიერ
 */
function App() {
  const [selectedGenre, setSelectedGenre] = useState('ყველა');
  const [watchlist, setWatchlist] = useState([]);

  // ჟანრების სია (დამატებულია "⭐ ჩემი Watchlist" ფილტრი)
  const genres = ['ყველა', '⭐ Watchlist', 'Sci-Fi', 'დრამა', 'ექშენი', 'ანიმაცია'];

  // ფილმების ბაზა (დამატებულია ახალი ველები: duration, director, imdbUrl)
  const movies = [
    {
      id: 1,
      title: 'ინსეფშენი (Inception)',
      year: 2010,
      genre: 'Sci-Fi',
      rating: 8.8,
      duration: '2სთ 28წთ',
      director: 'კრისტოფერ ნოლანი',
      imdbUrl: 'https://www.imdb.com/title/tt1375666/',
      posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400'
    },
    {
      id: 2,
      title: 'ინტერსტელარი (Interstellar)',
      year: 2014,
      genre: 'Sci-Fi',
      rating: 8.7,
      duration: '2სთ 49წთ',
      director: 'კრისტოფერ ნოლანი',
      imdbUrl: 'https://www.imdb.com/title/tt0816692/',
      posterUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400'
    },
    {
      id: 3,
      title: 'ბნელი რაინდი (The Dark Knight)',
      year: 2008,
      genre: 'ექშენი',
      rating: 9.0,
      duration: '2სთ 32წთ',
      director: 'კრისტოფერ ნოლანი',
      imdbUrl: 'https://www.imdb.com/title/tt0468569/',
      posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400'
    },
    {
      id: 4,
      title: 'სპაიდერ-მენი: სამყაროს მიღმა',
      year: 2023,
      genre: 'ანიმაცია',
      rating: 8.7,
      duration: '2სთ 20წთ',
      director: 'ხოაკიმ დოს სანტოსი',
      imdbUrl: 'https://www.imdb.com/title/tt9362722/',
      posterUrl: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400'
    },
    {
      id: 5,
      title: 'მატრიცა (The Matrix)',
      year: 1999,
      genre: 'Sci-Fi',
      rating: 8.7,
      duration: '2სთ 16წთ',
      director: 'ლანა და ლილი ვაჩოვსკები',
      imdbUrl: 'https://www.imdb.com/title/tt0133093/',
      posterUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400'
    },
    {
      id: 6,
      title: 'ფორესტ გამპი (Forrest Gump)',
      year: 1994,
      genre: 'დრამა',
      rating: 8.8,
      duration: '2სთ 22წთ',
      director: 'რობერტ ზემეკისი',
      imdbUrl: 'https://www.imdb.com/title/tt0109830/',
      posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400'
    }
  ];

  // Watchlist-ში დამატების დამმუშავებელი
  const handleAddToWatchlist = (movie) => {
    if (!watchlist.includes(movie.id)) {
      setWatchlist([...watchlist, movie.id]);
    }
  };

  // Watchlist-ის გასუფთავება
  const handleClearWatchlist = () => {
    setWatchlist([]);
  };

  // ფილტრაცია (ყველა, Watchlist, ან კონკრეტული ჟანრი)
  const filteredMovies = selectedGenre === 'ყველა'
    ? movies
    : selectedGenre === '⭐ Watchlist'
      ? movies.filter((m) => watchlist.includes(m.id))
      : movies.filter((m) => m.genre === selectedGenre);

  return (
    <div style={{ maxWidth: '1000px', margin: '30px auto', fontFamily: 'Arial, sans-serif', padding: '0 16px' }}>
      <header style={{
        borderBottom: '2px solid #0284c7',
        paddingBottom: '16px',
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <h1 style={{ color: '#0284c7', margin: 0, fontSize: '28px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🎬</span> MovieHub — AI Mini-Project
          </h1>
          <p style={{ color: '#64748b', margin: '6px 0 0 0', fontSize: '14px' }}>
            დავალება 3: AI ასისტენტის მიერ გენერირებული კომპონენტები და სტუდენტის 2 გაუმჯობესება
          </p>
        </div>

        {/* სტატუს ბარათი */}
        <div style={{
          backgroundColor: '#0f172a',
          border: '1px solid #1e293b',
          borderRadius: '10px',
          padding: '8px 14px',
          fontSize: '13px',
          color: '#94a3b8'
        }}>
          სულ ფილმები: <strong style={{ color: '#38bdf8' }}>{movies.length}</strong>
        </div>
      </header>

      {/* Watchlist შეჯამების კომპონენტი */}
      <WatchlistSummary
        watchlistCount={watchlist.length}
        onClearWatchlist={handleClearWatchlist}
      />

      {/* ჟანრების ფილტრის კომპონენტი */}
      <FilterBar
        genres={genres}
        selectedGenre={selectedGenre}
        onSelectGenre={setSelectedGenre}
      />

      {/* ფილმების ბადე (Grid) */}
      {filteredMovies.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          backgroundColor: '#1e293b',
          borderRadius: '12px',
          color: '#94a3b8',
          border: '1px dashed #334155'
        }}>
          <p style={{ fontSize: '28px', margin: '0 0 8px 0' }}>🍿</p>
          <h3 style={{ color: '#f1f5f9', margin: '0 0 6px 0' }}>ფილმები ვერ მოიძებნა</h3>
          <p style={{ margin: 0, fontSize: '13px' }}>
            {selectedGenre === '⭐ Watchlist' 
              ? 'თქვენს Watchlist-ში ჯერ არცერთი ფილმი არ არის დამატებული!' 
              : 'ამ ჟანრში ფილმები ჯერ არ გვაქვს.'}
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '22px'
        }}>
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              year={movie.year}
              genre={movie.genre}
              rating={movie.rating}
              duration={movie.duration}
              director={movie.director}
              imdbUrl={movie.imdbUrl}
              posterUrl={movie.posterUrl}
              isInWatchlist={watchlist.includes(movie.id)}
              onAddToWatchlist={() => handleAddToWatchlist(movie)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
