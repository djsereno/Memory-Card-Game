import logo from '../assets/logo.png';
import '../styles/Header.scss';

interface HeaderProps {
  currentScore: number;
  highScore: number;
}

const Header = ({ currentScore, highScore }: HeaderProps) => {
  return (
    <header className="header">
      <span className="instructions">
        <p>Pick a card, but don't pick</p>
        <p>the same card twice!</p>
      </span>
      <img className="logo" src={logo} alt="logo" />
      <div className="score-board">
        <p className="high-score">{`High Score: ${highScore}`}</p>
        <p className="current-score">{`Score: ${currentScore}`}</p>
      </div>
    </header>
  );
};

export default Header;
