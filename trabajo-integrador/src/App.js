import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./screens/Home/Home";
import Movies from "./screens/Movies/Movies";
import Series from "./screens/Series/Series";
import Favorites from "./screens/Favorites/Favorites";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import NotFound from "./screens/Not-found/Not-found";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/movies" component={Movies} />
          <Route path="/series" component={Series} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
