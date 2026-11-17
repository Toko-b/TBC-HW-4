import React from 'react';

/**
 * დავალება 1 (ხელით დასაწერი) - BookCard კომპონენტი
 * 
 * სტუდენტის ამოცანა:
 * 1. გამოიყენეთ Props დესტრუქტურიზაცია.
 * 2. გამოიყენეთ default props (მაგ: price = 0, isBestSeller = false).
 * 3. გამოიყენეთ პირობითი რენდერინგი ბესტსელერის ემბლემისთვის (🔥 ბესტსელერი).
 * 4. გამოსახეთ კატეგორიების მასივი .map()-ით და key ატრიბუტით.
 */
function BookCard({
  title,
  author,
  price = 0,
  rating = 5.0,
  isBestSeller = false,
  categories = []
}) {
  return (
    <div>
      {/* 1. პირობითი რენდერინგი: ბესტსელერის ბეიჯი */}
      <div className='w-85 border p-3 rounded-md h-70 flex-col'>
        <div className='flex'>
          <h1 className='text-3xl'>{title}</h1>
          {isBestSeller === true ? <span className='text-orange-300 bg-yellow-200 p-x-1 w-80 h-7 rounded-xl border-yellow-400 border'>🔥ბესტსელერი</span> : <span className='hidden'></span>}
        </div>
        <p className='mt-4'>ავტორი:{author}</p>
        <div className='my-4 flex gap-2'>
          {categories.map(val => {
            return (
              <span className='bg-gray-700 p-1 rounded-md' key={val.key}>#{val}</span>
            )
          })}
        </div>
        <hr />
        <div className='flex justify-between mt-4'>
          <span>⭐{rating}/5.0</span>
          <span>{price}₾</span>
        </div>
      </div>
      {/* 2. კატეგორიების სია (.map() & key) */}
      {/* 3. ქვედა ზოლი: რეიტინგი და ფასი */}
    </div>
  );
}

export default BookCard;

