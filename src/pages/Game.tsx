import { CSSProperties, FormEvent, useEffect, useState } from "react"
import { GameOverButton, GameOver, Layout, Navigation, NavigationButton, Overlay, TotalPoints } from "../components/common"
import { Link, Outlet } from "react-router-dom"
import { addPointsToDb } from "../services/supabase_client"

interface BallProps {
  maxCount: number
  x: number
  y: number
}

interface GameOverProps {
  setShowGameOver: (p: boolean) => void
}


function GameOverView({ setShowGameOver }: GameOverProps) {
  const [points, setPoints] = useState(50)
  const [nickname, setNickname] = useState("")

  const onSave = async () => {
    if (!nickname) { return }
    addPointsToDb(nickname, points)
    setShowGameOver(false)

  }

  const headerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "30px",
    background: "yellow",
    fontWeight: "bold"
  }

  function handleInput(e: FormEvent) {
    const inputElement: HTMLInputElement = e.target as HTMLInputElement
    const inputValue: string = inputElement.value
    setNickname(inputValue)
  }

  return (
    <Overlay>
      <GameOver>
        <div style={headerStyle}>
          <p>Peli päättyi</p>
          <p onClick={() => { setShowGameOver(false) }}>X</p>
        </div>
        <h3>Pisteet: {points}</h3>
        <label htmlFor="nickname">Nimimerkki</label>
        <input
          value={nickname}
          onInput={(e) => { handleInput(e) }}
          id="nickname"
          type="text" />
        <Link to="/"><GameOverButton onClick={onSave}>Tallenna</GameOverButton></Link>
      </GameOver>
      <Outlet />
    </Overlay>
  )
}


function Ball({ maxCount, x, y }: BallProps) {
  const [clicked, setClicked] = useState(0)

  /* Tässä muuttujassa oleva funktio asetetaan komponentista palautettavan 
  divin onClickille. Funktiota ei kuitenkaan suoraan kutsuta onClickissä, 
  jotta kutsuminen tapahtuu ainoastaan klikkausten yhteydessä eikä 
  esimerkiksi heti alussa. */
  const handleClick = () => {
    const newClickCount = clicked + 1
    setClicked(newClickCount)
  }

  // Tehtävä 2
  const completedStyle: CSSProperties = {
    transform: `translate(${x}px, ${y}px)`,
    color: `#7A2048`
  }

  if (clicked >= maxCount) {
    /* Tehtävä 2. Kun pallon on "poksautettu" eli palloa on klikattu 
    maxCount-parametrissa olevan lukeman verran, generoidaan pallon sijaan 
    teksti "Valmis!". Annetaan tekstille completedStyle-muuttujaan talletettu 
    tyyli, jolla teksti asetetaan samaan kohtaan, jossa poksautettu pallo 
    oli. */
    return <div style={completedStyle}>Valmis!</div>
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
      onClick={handleClick}>
      {clicked} / {maxCount}
    </div>
  </>
}


function randomInteger(min: number, max: number) {
  const randomInt = Math.floor((Math.random() * (max - min)) + min)
  return randomInt
}


export function Game() {
  const [totalPoints, setTotalPoints] = useState(40)
  const [showGameOver, setShowGameOver] = useState(false)


  useEffect(() => {
    if (totalPoints === 40) {
      setShowGameOver(true)
      setTotalPoints(20)
    }
  })

  const allBalls = Array(20).fill(null).map((_, i) => {
    return <Ball
      key={i}
      maxCount={randomInteger(1, 6)}
      x={randomInteger(Math.round(0.1 * window.innerWidth), Math.round(window.innerWidth - 0.1 * window.innerWidth))}
      y={randomInteger(Math.round(0.05 * window.innerHeight), Math.round(window.innerHeight - 0.3 * window.innerHeight))}>
    </Ball>
  })

  return (
    /* Tehtävä 2: navigointi React-router-kirjaston Link- ja 
    Outlet-komponentteja hyödyntämällä.
    
    Kirjaston GitHub-repositorio: 
    https://github.com/remix-run/react-router*/

    // Aaltosulut mahdollistavat, että JS:ää voidaan käyttää
    // niiden sisällä
    <>
      <Layout>
        <Navigation>
          <Link to="/"><NavigationButton>Koti</NavigationButton></Link>
          <TotalPoints>Kokonaispisteet: {totalPoints}</TotalPoints>
        </Navigation>
        {allBalls}
        {showGameOver && <GameOverView setShowGameOver={setShowGameOver}></GameOverView>}
        <Outlet />
      </Layout>
    </>
  )
}