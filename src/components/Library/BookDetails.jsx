import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import defaultBookImage from './defaultBookImage.jpg'; // Import default book image
import FreeBook from '../../components/Library/FreeBook.jpg'

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const { id } = useParams(); // Access the book ID from URL params

  useEffect(() => {
    fetchBookDetails();
  }, [id]); // Fetch book details whenever the ID changes

  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(`https://softwium.com/api/books/${id}`);
      setBook(response.data);
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <img
        src={book.img || defaultBookImage}
        style={styles.bookImage}
        alt={book.title}
      />
      <h2 style={styles.title}>{book.title}</h2>
      <p>ISBN: {book.isbn}</p>
      <p>Page Count: {book.pageCount}</p>
      <p>Authors: {book.authors.join(', ')}</p>
      <div style={styles.buttonContainer}>
        <button style={styles.button}>Download</button>
        <button style={styles.button}>Order Now</button>
      </div>
    </div>
  );
};

export default BookDetails;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: `url(${FreeBook})`, // Replace 'path_to_your_image.jpg' with the actual path to your background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh', // Ensure the container covers the entire viewport height
  },
  bookImage: {
    marginTop:"50px",
    width: '150px',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  title: {
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  button: {
    backgroundColor: '#25722a',
    color: '#ffffff',
    padding: '10px 20px',
    borderRadius: '5px',
    margin: '0 10px',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    textDecoration: 'none',
    fontSize: '16px',
  },
};