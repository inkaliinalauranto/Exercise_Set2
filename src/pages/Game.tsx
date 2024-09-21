import { CSSProperties, useState } from "react"
import { Layout, Navigation, NavigationButton, TotalPoints } from "../components/common"
import { Link, Outlet } from "react-router-dom"

interface BallProps {
  maxCount: number
  x: number
  y: number
}


function Ball({ maxCount, x, y }: BallProps) {
  const [clicked, setClicked] = useState(0)

  // Tehtävä 2
  const xStyle: CSSProperties = {
    transform: `translate(${x}px, ${y}px)`,
    color: `#7A2048`
  }

  if (clicked >= maxCount) {
    // Tehtävä 2
    return <div style={xStyle}>Valmis!</div>
  }

  /*Tässä tyyli luodaan komponentin sisällä, koska tyylistä 
  halutaan dynaaminen. */
  const ballStyle: CSSProperties = {
    background: "#7A2048",
    width: 50 + "px",
    height: 50 + "px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    border: "2px solid white",
    color: "white",
    position: "absolute",
    userSelect: "none",
    cursor: "pointer",
    transform: `translate(${x}px, ${y}px)`,
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    padding: "5px"
  }

  return <>
    <div
      style={ballStyle}
      onClick={() => { setClicked(clicked + 1) }}>
      {clicked} / {maxCount}
    </div>
  </>
}


function randomInteger(min: number, max: number) {
  const randomInt = Math.floor((Math.random() * (max - min)) + min)
  return randomInt
}


export function Game() {
  const allBalls = Array(20).fill(null).map((_, i) => {
    return <Ball
      key={i}
      maxCount={randomInteger(1, 6)}
      x={randomInteger(Math.round(0.1 * window.innerWidth), Math.round(window.innerWidth - 0.1 * window.innerWidth))}
      y={randomInteger(Math.round(0.05 * window.innerHeight), Math.round(window.innerHeight - 0.3 * window.innerHeight))}>
    </Ball>
  })

  return (
    <>
      <Layout>
        <Navigation>
          <Link to="/"><NavigationButton>Koti</NavigationButton></Link>
          <TotalPoints>Kokonaispisteet: 0</TotalPoints>
        </Navigation>
        {allBalls}

        <Outlet />
      </Layout>
    </>
  )
}