import './assets/styles.css';
import cover from './assets/cover.svg';

// Component Imports
import ButtonLink from './components/ButtonLink';

const centerpieceStyles = {
  width: "90%",
  height: "90%",

  "marginTop": "2em",

  // Also a flex-box
  display: "flex",
  "justifyContent": "space-between",
  "alignItems": "center",

  // Debug
  /*
  "border-style": "solid",
  "border-color": "black",
  "border-width": "2px"
  */
}

const primerStyles = {
  "marginLeft": "6em",
  width: "35%"
}

const coverImageStyles = {
  width: "80%",
  height: "80%"
}

const mainHeaderStyles = {
  "fontFamily": "Roboto",
  "fontStyle": "normal",
  "fontWeight": "bold",
  "fontSize": "36px",
  "lineHeight": "42px",

  "color": "#38302E"
}

export default function Homepage() {

  // Processing to check if user is logged in or not.
  // If logged in, redirect to the dashboard.

  return (
    <div>
      <div className="mainContent">
        <div style={centerpieceStyles}>
          <div style={primerStyles}>
            <h1 style={mainHeaderStyles}>Sched-It</h1>
            <p style={ { "fontSize": "24px" } }>
              A place to organize everything in time
            </p>
            <ButtonLink text="Learn More" href="about.html" style={ { width: "40%" } } />
          </div>

          <img src={cover} alt="Cover art" style={ coverImageStyles } />
        </div>
      </div>
    </div>
  );
}