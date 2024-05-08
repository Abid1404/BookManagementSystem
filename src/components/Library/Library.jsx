import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import defaultBookImage from './defaultBookImage.jpg'; 
import defaultBookImage from '../../components/Library/defaultBookImage.jpg';
// Import default book image

import { Link } from 'react-router-dom';

const Library = ({ handleBookClick }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`https://softwium.com/api/books`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* <h2 className='header'>Library Explorer</h2> */}
      <div className="book-list" style={styles.bookList}>
        {books.map(book => (
          <div key={book.id} className="book-item" onClick={() => handleBookClick(book)}>
            <Link to={`/book/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <img
              src={book.img || defaultBookImage}
              alt={book.title}
              style={styles.bookImage}
            />
            <p style={styles.bookTitle}>{book.title}</p>
         
            </Link>
             </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  
  pageContainer: {
    backgroundColor: '#f5f5f5', // White Smoke background color
  },

  bookList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gridGap: '50px',
    justifyItems: 'center',
  },
  bookItem: {
    cursor: 'pointer',
  },
  bookImage: {
    marginTop:"20px",
    width: '150px',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  bookTitle: {
    marginTop: '5px',
    textAlign: 'center',
    fontSize: '14px',
  },
};

export default Library;