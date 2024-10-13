import logo from '../assets/logo.png';
import ball from '../assets/loading.png';
import '../styles/Header.scss';

interface HeaderProps {
  currentScore: number;
  highScore: number;
}

const Header = ({ currentScore, highScore }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header__instructions">
        <img className="accent" src={ball} alt="accent" />
        <div className="instructions">
          <p>Pick a card, but don't pick</p>
          <p>the same card twice!</p>
        </div>
      </div>
      <img className="header__logo" src={logo} alt="logo" />
      <div className="header__scoreboard">
        <div className="scoreboard">
          <p className="high-score">{`High Score: ${highScore}`}</p>
          <p className="current-score">{`Score: ${currentScore}`}</p>
        </div>
        <img className="accent" src={ball} alt="accent" />
      </div>
    </header>
  );
};

export default Header;
