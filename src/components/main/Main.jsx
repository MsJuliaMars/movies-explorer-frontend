import Promo from "../promo/Promo";
import AboutProject from "../about-project/AboutProject";
import Techs from "../techs/Techs";
import AboutMe from "../about-me/AboutMe";
import Portfolio from "../portfolio/Portfolio";
import "./Main.css";

function Main({ loggedIn }) {
  return (
    <main className="main">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
}

export default Main;
