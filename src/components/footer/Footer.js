import React from "react";
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__caption">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
            <p className="footer__copyright">
                &copy; {new Date().getFullYear()}
            </p>
            <div className="footer__reference">
                <a className="footer__link">Яндекс.Практикум</a>
                <a className="footer__link">Github</a>
            </div>
            </div>
        </footer>
    );
}

export default Footer;
