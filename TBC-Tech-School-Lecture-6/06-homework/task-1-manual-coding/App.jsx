import React from 'react';
import LibraryHeader from './components/LibraryHeader.jsx';
import BookCard from './components/BookCard.jsx';

/**
 * დავალება 1 (ხელით დასაწერი) - მთავარი გამშვები ფაილი
 */
function App() {
  const booksData = [
    {
      id: 1,
      title: 'React-ის ფილოსოფია და პრაქტიკა',
      author: 'გიორგი მაისურაძე',
      price: 45,
      rating: 4.9,
      isBestSeller: true,
      categories: ['React', 'Frontend', 'JavaScript']
    },
    {
      id: 2,
      title: 'JavaScript: სრული გზამკვლევი',
      author: 'დევიდ ფლანაგანი',
      price: 60,
      rating: 4.7,
      isBestSeller: true,
      categories: ['Programming', 'JavaScript', 'Web']
    },
    {
      id: 3,
      title: 'HTML & CSS ვებ დეველოპმენტისთვის',
      author: 'ჯონ დაკეტი',
      price: 35,
      rating: 4.5,
      isBestSeller: false,
      categories: ['HTML', 'CSS', 'UI']
    },
    {
      id: 4,
      title: 'ალგორითმები მარტივ ენაზე',
      author: 'ადიტია ბჰარგავა',
      price: 0, // უფასო წიგნი - Default prop შემოწმებისთვის
      rating: 4.8,
      isBestSeller: false,
      categories: ['Algorithms', 'Computer Science']
    }
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', fontFamily: 'Arial, sans-serif', padding: '0 16px' }}>
      <LibraryHeader />
      <div className='flex flex-wrap gap-10'>
        {booksData.map(val => {
          return (
            <BookCard key={val.id} title={val.title} author={val.author} price={val.price} rating={val.rating} isBestSeller={val.isBestSeller} categories={val.categories} />
          )
        })}
      </div>
    </div>
  );
}

export default App;

