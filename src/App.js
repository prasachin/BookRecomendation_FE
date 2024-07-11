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

const App = () => {
  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route exact path="/login" element={<AuthCard />} />
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
