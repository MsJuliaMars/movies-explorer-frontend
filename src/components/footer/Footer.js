import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <h2 className="footer__caption">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__container">
            <p className="footer__copyright">
                &copy; {new Date().getFullYear()}
            </p>
            <div className="footer__reference">
                <a href="https://practicum.yandex.ru/" rel="noopener noreferrer" className="footer__link" target='_blank'>Яндекс.Практикум</a>
                <a href="https://github.com/" rel="noopener noreferrer" className="footer__link" target='_blank'>Github</a>
            </div>
            </div>
        </footer>
    );
}

export default Footer;
