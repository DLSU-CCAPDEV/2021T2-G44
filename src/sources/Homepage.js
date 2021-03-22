import './assets/styles.css';
import cover from './assets/cover.svg';
import { useEffect } from "react";

// Component Imports
import ButtonLink from './components/ButtonLink';

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

  useEffect(() => {
      document.title = "Home - Sched-It";
  });

  // Processing to check if user is logged in or not.
  // If logged in, redirect to the dashboard.

  return (
      <div>
          <div className="mainContent">
              <div className="contentCenterPiece">
                  <div style={primerStyles}>
                      <h1 style={mainHeaderStyles}>Sched-It</h1>
                      <p style={{ fontSize: "24px" }}>A place to organize everything in time</p>
                      <ButtonLink text="Learn More" href="about.html" style={{ width: "40%" }} />
                  </div>

                  <img src={cover} alt="Cover art" style={coverImageStyles} />
              </div>
          </div>
      </div>
  );
}