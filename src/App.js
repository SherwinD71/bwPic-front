import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import PhotosPage from "./pages/PhotosPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { UserTokenContextProvider } from "./contexts/UserTokenContext";
import PhotoPage from "./pages/PhotoPage";
import CreatePhotoPage from "./pages/CreatePhotoPage";
import ProfilePage from "./pages/ProfilePage";
import EditPasswordPage from "./pages/EditPasswordPaje";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Router>
      <div className="contenedor-general">
        <UserTokenContextProvider>
          <Header />
          <div className="wrapper">
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/photos">
                <PhotosPage />
              </Route>
              <Route path="/register">
                <RegisterPage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/photo/:id">
                <PhotoPage />
              </Route>
              <Route path="/create/photo">
                <CreatePhotoPage />
              </Route>
              <Route path="/profile">
                <ProfilePage />
              </Route>
              <Route path="/editPassword">
                <EditPasswordPage />
              </Route>
            </Switch>
          </div>
        </UserTokenContextProvider>
        <ToastContainer position="bottom-center" autoClose={4000} limit={3} />
      </div>
    </Router>
  );
};

export default App;
