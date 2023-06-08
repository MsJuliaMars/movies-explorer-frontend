import Footer from "../footer/Footer";
import PageNotFound from "../page-not-found/PageNotFound";
import Login from "../login/Login";
import Header from "../header/Header";
import Register from "../register/Register";
import Profile from "../profile/Profile";
import Main from "../main/Main";
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Movies from "../movies/Movies";
import SavedMovies from "../saved-movies/SavedMovies";

function App() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="root">
                {  location.pathname === '/' ||
                    location.pathname === '/movies' ||
                location.pathname === '/saved-movies' ||
                location.pathname === '/profile' ? (<Header />) : null}
            <Routes>
                <Route exact path="/"  element={<>
                    <Main/>
                </>}>
                </Route>

                <Route
                    path="/sign-up"
                    element={<Register/>}
                >
                </Route>
                <Route
                    path="/sign-in"
                    element={<Login/>}
                ></Route>
                <Route
                    path="*"
                    element={<PageNotFound/>}
                >
                </Route>

                <Route path="/profile" element={<>
                    <Profile/>
                </>}>
                </Route>

                <Route path="/movies" element={<>
                    <Movies/>
                </>}>
                </Route>

                <Route path="/saved-movies" element={<>
                    <SavedMovies/>
                </>}>
                </Route>

                <Route path="*" element={<PageNotFound/>}>
                </Route>
            </Routes>
            { location.pathname === '/' ||
            location.pathname === '/movies' ||
            location.pathname === '/saved-movies' ? (<Footer />) : null}
        </div>
    );
}

export default App;
