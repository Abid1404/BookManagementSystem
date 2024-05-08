// eslint-disable-next-line no-unused-vars
import React , { useState } from 'react'
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero"
import BestBooks from './components/BestBooks/BestBooks';
import AppStoreBanner from './components/AppStoreBanner/AppStoreBanner';
import Testimonial from './components/Testimonial/Testimonial';
import Footer from './components/Footer/Footer';
import AOS from "aos"
import "aos/dist/aos.css"
// import OrderPopup from "./components/OrderPopup/OrderPopup.jsx";
import Library from './components/Library/Library';
// import LibraryExplorer from './components/Libraryexplorer/LibraryExplorer.jsx';
// import Books from "./components/BooksSlider/Books.jsx";
import BookDetails from './components/Library/BookDetails';

const App = () => {
  const [showLibrary, setShowLibrary] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleOrderPopup = () => {
    setShowLibrary(true);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };
  // const [orderPopup, setOrderPopup] = React.useState(false);

  // const handleOrderPopup = () => {
  //   setOrderPopup(!orderPopup);
  // };
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    
    <div className='App'>
      
      <BrowserRouter>
        <Navbar handleOrderPopup={handleOrderPopup} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Hero handleOrderPopup={handleOrderPopup} />
                <BestBooks handleOrderPopup={handleOrderPopup} />
                <AppStoreBanner />
                <Testimonial />
                <Footer />
              </>
            }
          />
          <Route
            path="/library"
            element={<Library handleBookClick={handleBookClick} />}
          />
          <Route
            path="/book/:id" // Route parameter for book ID
            element={<BookDetails handleBookClick={handleBookClick} />} // Render BookDetails component
          />
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App