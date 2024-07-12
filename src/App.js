import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import BookList from "./components/Books/BookList";
import Profile from "./components/UserProfile/UserProfile";
import Recommendations from "./components/Books/Recommendation";
import AuthCard from "./components/Auth/AuthCard";
import BookDetails from "./components/Books/BookDetails";
import "./style.css";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import Home from "./components/Common/Home";
import { useState } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  return (
    <Router>
      <Header setQuery={setQuery} />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookList query={query} />} />
          <Route exact path="/login" element={<AuthCard />} />
          <Route path="/Home" element={<Home />} />
          <Route exact path="/register" element={<AuthCard />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/recommendations" element={<Recommendations />} />
          <Route path="/books/:id" element={<BookDetails />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
