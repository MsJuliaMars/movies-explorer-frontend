import React from 'react';
import './PageNotFound.css';

function PageNotFound() {
    return (
    <div className="not-found">
        <h6 className="not-found__title">404</h6>
        <p className="not-found__subtitle">Страница не найдена</p>
        <p className="not-found__back">Назад</p>
    </div>
    )

}

export default PageNotFound;
