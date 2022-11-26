import React from 'react';

import './App.css';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import {AboutPage} from "./pages/AboutPage/AboutPage";
import {BookPage} from "./pages/BookPage/BookPage";
import {BooksPage} from "./pages/BooksPage/BooksPage";
import {LoginPage} from "./pages/LoginPage/LoginPage";
import {RegisterPage} from "./pages/RegisterPage/RegisterPage";
import {UserPage} from "./pages/UserPage/UserPage";

import {Header} from "./Components/Header/Header";

function App() {
  return (
    <div className="App">
        <Header/>
        <Router>
            <Routes>
                <Route path="/" element={<BooksPage/>}/>
                <Route path="/books" element={<BooksPage/>}/>
                <Route path="/books/:id" element={<BookPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/users/:id" element={<UserPage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
