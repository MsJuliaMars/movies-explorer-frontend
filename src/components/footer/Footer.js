import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <h2 className="footer__caption">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__container">
                <p className="footer__copyright">
                    &copy; {new Date().getFullYear()}
                </p>
                <ul className="footer__reference">
                    <li>
                        <a href="https://practicum.yandex.ru/" rel="noopener noreferrer" className="footer__link"
                           target='_blank'>Яндекс.Практикум</a></li>
                    <li><a href="https://github.com/" rel="noopener noreferrer" className="footer__link"
                           target='_blank'>Github</a></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
