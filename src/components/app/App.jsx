import Footer from "../footer/Footer";
import PageNotFound from "../page-not-found/PageNotFound";
import Login from "../login/Login";
import Header from "../header/Header";
import Register from "../register/Register";
import Profile from "../profile/Profile";
import Main from "../main/Main";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Movies from "../movies/Movies";
import SavedMovies from "../saved-movies/SavedMovies";

function App() {
    const navigate = useNavigate();

    return (
        <main className="root">
            <Routes>
                <Route exact path="/"  element={<>
                    <Header/>
                    <Main/>
                    <Footer/>
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
                    <Header/>
                    <Profile/>
                </>}>
                </Route>

                <Route path="/movies" element={<>
                    <Header/>
                    <Movies/>
                    <Footer/>
                </>}>
                </Route>

                <Route path="/saved-movies" element={<>
                    <Header/>
                    <SavedMovies/>
                    <Footer/>
                </>}>
                </Route>

                <Route path="*" element={<PageNotFound/>}>
                </Route>
            </Routes>
        </main>
    );
}

export default App;
