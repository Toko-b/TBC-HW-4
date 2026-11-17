import React from 'react';

/**
 * დავალება 1 (ხელით დასაწერი) - LibraryHeader კომპონენტი
 * 
 * იღებს:
 * - title: ბიბლიოთეკის სათაური
 * - totalBooks: წიგნების საერთო რაოდენობა
 */
function LibraryHeader({ title = "TBC Tech ონლაინ ბიბლიოთეკა", totalBooks = "4" }) {
    return (
    <header className='flex w-full justify-between items-center bg-slate-800 p-4 rounded-xl'>
        <div className='flex-col'>
            <div><h1 className='text-sky-500 text-2xl font-bold'>📚{title}</h1></div>
            <div><p className='text-neutral-500'>ონლაინ წიგნების კატალოგი - React Props & კომპონენტების სავარჯიშო</p></div>
        </div>
        <div>
            <h3>
                სულ წიგნები:
                <span>{totalBooks}</span>
            </h3>
        </div>
    </header>)
}

export default LibraryHeader;

