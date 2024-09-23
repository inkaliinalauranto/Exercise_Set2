import { CSSProperties, FormEvent, useEffect, useState } from "react"
import { GameOverButton, GameOver, Layout, Navigation, NavigationButton, Overlay, TotalPoints, GameOverElement } from "../components/common"
import { Link, Outlet } from "react-router-dom"
import { addPointsToDb } from "../services/supabase_client"

interface BallProps {
  maxCount: number
  x: number
  y: number
  handlePointsFromChild: (num: number) => void
}

interface GameOverProps {
  setShowGameOver: (p: boolean) => void
  points: number
}

// Selitä
function GameOverView({ setShowGameOver, points }: GameOverProps) {
  const [nickname, setNickname] = useState("")

  const onSave = async () => {
    if (!nickname) { return }
    addPointsToDb(nickname, points)
    setShowGameOver(false)

  }

  function handleInput(e: FormEvent) {
    const inputElement: HTMLInputElement = e.target as HTMLInputElement
    const inputValue: string = inputElement.value
    setNickname(inputValue)
  }

  return (
    <Overlay>
      <GameOver>
        <p>Läpäisit pelin!</p>
        <GameOverElement><h3>Pisteet: {points}</h3></GameOverElement>
        <GameOverElement><label htmlFor="nickname">Nimimerkki:</label></GameOverElement>
        <GameOverElement>
          <input
            value={nickname}
            onInput={(e) => { handleInput(e) }}
            id="nickname"
            type="text" />
        </GameOverElement>

        <Link to="/"><GameOverButton onClick={onSave}>Tallenna</GameOverButton></Link>
        <Link to="/"><GameOverButton>Ohita</GameOverButton></Link>
      </GameOver>
      <Outlet />
    </Overlay>
  )
}


function Ball({ maxCount, x, y, handlePointsFromChild }: BallProps) {
  const [clicked, setClicked] = useState(0)

  /* Tässä muuttujassa oleva funktio asetetaan komponentista palautettavan 
  divin onClickille. Funktiota ei kuitenkaan suoraan kutsuta onClickissä, 
  jotta kutsuminen tapahtuu ainoastaan klikkausten yhteydessä eikä 
  esimerkiksi heti alussa. */
  const handleClick = () => {
    const newClickCount = clicked + 1
    setClicked(newClickCount)

    if (newClickCount >= maxCount) {
      handlePointsFromChild(newClickCount)
    }
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
  const [currentPoints, setTotalPoints] = useState(0)
  const [showGameOver, setShowGameOver] = useState(false)

  /* Kun alla olevien kullekin pallolle generoitujen objektien arvot asetettin 
  suoraan allBalls-muuttujaan, joka asetettiin suoraan returniin, arvot 
  muuttuivat aina, kun pallo poksautettiin. Arvot muuttuivat, koska 
  Ball-komponentissa kutsuttiin tästä komponentista välitettyä
  handlePointsFromChild-muuttujaa, jossa muutetaan tämän Game-komponentin 
  tilamuuttujaa (currentPoints). Tilamuuttujan arvon muutos laukaisee tässä 
  komponentissa hook-muuttujia lukuunottamatta uudelleenrenderöintiä, minkä
  vuoksi pallot arvottueine maxCount-, x- ja y-arvoineen luotiin uudestaan. 
  Siksi pallot vaihtoivat paikkaa ja niissä olevaa maksimiklikkauslukua.

  Nyt pallojen ominaisuudet on asetettu objekteiksi arrayn sisälle 
  hook-muuttujaan, jonka arvo ilmeisesti pystyy samana komponentin 
  uudelleenrenderöinnin yhteydessä. Tämän ratkaisun hakemisessa käytin 
  ChatGPT:ä. (Esitetty ongelma: Ball components move every time the points 
  are updated). ChatGPT neuvoi luomaan arrayn useStatessa anonyymin 
  nuolifunktion toteutusosassa, mutta tästä poiketen asetin arrayn suoraan 
  hook-muuttujan alkuarvoksi, jotta pystyn käymään objektien 
  maxCount-arvot läpi useEffectissä.*/

  const [propertiesForBalls] = useState(
    Array(5).fill(null).map((_, i) => {
      return {
        key: i,
        maxCount: randomInteger(1, 6),
        x: randomInteger(Math.round(0.1 * window.innerWidth), Math.round(window.innerWidth - 0.1 * window.innerWidth)),
        y: randomInteger(Math.round(0.05 * window.innerHeight), Math.round(window.innerHeight - 0.3 * window.innerHeight))
      }
    })
  )


  // Selitä
  useEffect(() => {
    let sum = 0
    propertiesForBalls.forEach((propertyObject) => { sum += propertyObject.maxCount })

    if (currentPoints >= sum) {
      setShowGameOver(true)
    }
  })

  const handlePointsFromChild = (points: number) => {
    setTotalPoints(currentPoints + points)
  }


  /* Luodaan propertiesForBalls-arrayssa olevien alkioiden verran palloja. 
  Kunkin alkion objektin arvot haetaan kunkin pallon propseiksi. Propseihin 
  kullekin pallolle lisätään viite funktioon, jonka avulla Game-komponentissa 
  saadaan pidettyä lukua pelaajan pisteistä eli siitä klikkausmäärästä, joilla 
  pelaaja on saanut palloja poksautettua.
  */
  const allBalls = propertiesForBalls.map((ballProperties) => {
    return <Ball
      key={ballProperties.key}
      maxCount={ballProperties.maxCount}
      x={ballProperties.x}
      y={ballProperties.y}
      handlePointsFromChild={handlePointsFromChild}>
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
          <TotalPoints>Pisteet: {currentPoints}</TotalPoints>
        </Navigation>
        {allBalls}
        {showGameOver && <GameOverView setShowGameOver={setShowGameOver} points={currentPoints}></GameOverView>}
        <Outlet />
      </Layout>
    </>
  )
}