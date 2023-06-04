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
                <a href="https://practicum.yandex.ru/" className="footer__link" target='_blank'>Яндекс.Практикум</a>
                <a href="https://github.com/" className="footer__link" target='_blank'>Github</a>
            </div>
            </div>
        </footer>
    );
}

export default Footer;
