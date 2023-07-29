import React from 'react';
import './PageNotFound.css';
import {Link, useNavigate} from "react-router-dom";

function PageNotFound() {
    const navigate = useNavigate();
    function handleBackButtonClick() {
        navigate(-1);
    }

    return (
    <div className="not-found">
        <h6 className="not-found__title">404</h6>
        <p className="not-found__subtitle">Страница не найдена</p>
        <Link to="/" className="not-found__back" onClick={handleBackButtonClick}>Назад</Link>
    </div>
    )

}

export default PageNotFound;
