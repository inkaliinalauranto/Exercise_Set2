import { useEffect, useState } from "react"
import { Layout, Navigation, NavigationButton, DescriptionStyle } from "../components/common"
import { Link, Outlet } from "react-router-dom"
import { Ball } from "../components/Ball"
import { GameOverBox } from "../components/GameOverBox"


function randomInteger(min: number, max: number) {
  const randomInt = Math.floor((Math.random() * (max - min)) + min)
  return randomInt
}


export function Game() {
  const [currentPoints, setCurrentPoints] = useState(0)
  const [maxPoints, setMaxPoints] = useState(0)
  const [showGameOver, setShowGameOver] = useState(false)

  /* Kun alla arrayhyn palautettavien kullekin pallolle generoitujen objektien 
  arvot asetettin suoraan allBalls-muuttujaan, joka asetettiin suoraan 
  returniin, arvot muuttuivat aina, kun pallo poksautettiin. Arvot muuttuivat, 
  koska Ball-komponentissa kutsuttiin tästä komponentista välitettyä
  setPointsFromBall-muuttujaa, jossa muutetaan tämän Game-komponentin 
  tilamuuttujaa (currentPoints). Tilamuuttujan arvon muutos laukaisee tässä 
  komponentissa uudelleenrenderöinnin hook-muuttujia lukuunottamatta, minkä
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


  /*Määritellään useEffect-funktiokutsun toisella parametrilla eli tyhjällä 
  arraylla, että ensimmäisenä parametrina oleva funktio ajetaan vain yhden 
  kerran eli ensimmäisellä renderöinnillä. Lasketaan silloin funktion 
  toteutusosassa propertiesForBalls-muuttujaan talletettujen objektien 
  maksimiklikkausmääriä kuvaavien arvojen summa sum-muuttujaan. Talletetaan 
  tulos maxPoints-tilamuuttujaan, jotta sitä voidaan verrata pelaajan 
  klikkausten määrään seuraavassa useEffectissä.*/
  useEffect(() => {
    let sum = 0
    propertiesForBalls.forEach((propertyObject) => { sum += propertyObject.maxCount })
    setMaxPoints(sum)
  }, [])


  /*Toisena parametrina arrayn sisään asetetaan currentPoints-tilamuuttuja, 
  jonka arvon muutoksen perusteella tämä useEffect aktivoituu. Silloin 
  pelaajan sen hetkisiä pisteitä eli currentPoints-muuttujan arvoa verrataan 
  pelin maksimipisteisiin. Jos pelaajan pisteet yltävät maksimipisteisiin 
  asetetaan showGameOver-tilamuuttujan arvo trueksi, jolloin returnissa 
  näytetään GameOverBox-komponentti.*/
  useEffect(() => {
    if (currentPoints >= maxPoints) {
      setShowGameOver(true)
    }
  }, [currentPoints])


  /*Muuttujaan on talletettu funktio, jonka avulla parametrina tulevat 
  pisteet lisätään pelaajan nykypisteisiin. Muuttuja välitetään propsina 
  Ball-komponentille, jossa pisteet lisätään, kun komponenttia klikataan 
  maksimiklikkausmäärän verran. Pisteet päivitetään siis lapsikomponentista
  käsin. */
  const setPointsFromBall = (points: number) => {
    setCurrentPoints(currentPoints + points)
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
      handlePointsFromChild={setPointsFromBall}>
    </Ball>
  })

  return (
    /* Tehtävä 2: navigointi React-router-kirjaston Link- ja 
    Outlet-komponentteja hyödyntämällä.
    
    Kirjaston GitHub-repositorio: 
    https://github.com/remix-run/react-router*/
    <>
      <Layout>
        <Navigation>
          <Link to="/"><NavigationButton>Koti</NavigationButton></Link>
          <DescriptionStyle>Pisteet: {currentPoints}</DescriptionStyle>
        </Navigation>
        {allBalls}
        {/*Aaltosulkujen sisällä on mahdollistaa kirjoittaa suoraan 
        TS-koodia. Jos showGameOver-tilamuuttujan arvo on tosi, näytetään 
        GameOverBox-komponentti.*/}
        {showGameOver && <GameOverBox setShowGameOver={setShowGameOver} points={currentPoints}></GameOverBox>}
        <Outlet />
      </Layout>
    </>
  )
}