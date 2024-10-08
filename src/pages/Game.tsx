import { useEffect, useState } from "react"
import { Layout, Navigation, NavigationButton, DescriptionStyle } from "../components/common"
import { Link, Outlet } from "react-router-dom"
import { Ball } from "../components/Ball"
import { GameOverBox } from "../components/GameOverBox"
import { randomInteger } from "../functions"

export function Game() {
  const [currentPoints, setCurrentPoints] = useState(0)
  const [showGameOver, setShowGameOver] = useState(false)

  /* propertiesForBalls-tilamuuttujan alustusarvoksi asetetaan array. Kun 
  siihen palautettavien kullekin pallolle generoitujen objektien arvot 
  asetettin aiemmin suoraan allBalls-muuttujaan, joka asetettiin suoraan 
  returniin, arvot muuttuivat aina, kun pallo poksautettiin. Arvot muuttuivat, 
  koska Ball-komponentissa kutsuttiin tästä komponentista välitettyä
  setPointsFromBall-muuttujaa, jossa muutetaan tämän Game-komponentin 
  tilamuuttujaa (currentPoints). Tilamuuttujan arvonmuutos laukaisee tässä 
  komponentissa uudelleenrenderöinnin muita hook-muuttujia lukuunottamatta, 
  minkä vuoksi pallot arvottuine maxCount-, x- ja y-arvoineen luotiin 
  uudestaan. Siksi pallot vaihtoivat paikkaa ja niissä olevaa 
  maksimiklikkauslukua.

  Nyt pallojen ominaisuudet on asetettu objekteiksi arrayn sisälle 
  hook-muuttujaan, jonka arvo ilmeisesti pystyy samana komponentin 
  uudelleenrenderöinnin yhteydessä. Tämän ratkaisun hakemisessa käytin 
  ChatGPT:ä. (Esitetty ongelma: Ball components move every time the points 
  are updated). ChatGPT neuvoi luomaan arrayn useStatessa anonyymin 
  nuolifunktion toteutusosassa, mutta tästä poiketen asetin arrayn suoraan 
  hook-muuttujan alkuarvoksi, jotta pystyn käymään objektien 
  maxCount-arvot läpi useEffectissä.*/

  const [propertiesForBalls] = useState(
    Array(10).fill(null).map((_, i) => {
      return {
        key: i,
        maxCount: randomInteger(1, 6),
        x: randomInteger(Math.round(0.1 * window.innerWidth), Math.round(window.innerWidth - 0.1 * window.innerWidth)),
        y: randomInteger(Math.round(0.05 * window.innerHeight), Math.round(window.innerHeight - 0.3 * window.innerHeight))
      }
    })
  )


  /*Tehtävä 2.1: lisäominaisuus 
  Kutsutaan useEffect-funktiota, jonka toiseksi parametriksi asetetaan arrayn 
  sisään currentPoints-tilamuuttuja. Sen arvonmuutoksen perusteella tämä 
  useEffect aktivoituu komponentin ensimmäisen renderöintikerran lisäksi. 
  useEffectin aktivoituessa kutsutaan sille ensimmäiseksi parametriksi 
  määriteltyä funktiota. Parametrifunktion toteutusosassa yhteenlasketaan
  propertiesForBalls-muuttujaan talletettujen objektien maksimiklikkausmääriä 
  kuvaavien arvojen summa sum-muuttujaan. Verrattaan sen jälkeen pelaajan sen 
  hetkisiä pisteitä eli currentPoints-muuttujan arvoa pelin maksimipisteisiin. 
  Jos pelaajan pisteet yltävät maksimipisteisiin asetetaan 
  showGameOver-tilamuuttujan arvo trueksi, jolloin returnissa näytetään 
  GameOverBox-komponentti.*/
  useEffect(() => {
    let sum = 0
    propertiesForBalls.forEach((propertyObject) => { sum += propertyObject.maxCount })
    if (currentPoints >= sum) {
      setShowGameOver(true)
    }
  }, [currentPoints])


  /*Tehtävä 2.1: lisäominaisuus
  Muuttujaan on talletettu funktio, jonka avulla parametrina tulevat 
  pisteet lisätään pelaajan nykypisteisiin. Muuttuja välitetään propsina 
  Ball-komponentille, jossa pisteet lisätään, kun komponenttia klikataan 
  maksimiklikkausmäärän verran. Pisteet päivitetään siis lapsikomponentista
  käsin.*/
  const setPointsFromBall = (points: number) => {
    setCurrentPoints(currentPoints + points)
  }

  /* Luodaan propertiesForBalls-arrayssa olevien alkioiden verran palloja. 
  Kunkin alkion objektin arvot haetaan kunkin pallon propseiksi. Propseihin 
  kullekin pallolle lisätään viite funktioon, jonka avulla Game-komponentissa 
  saadaan pidettyä lukua pelaajan pisteistä eli siitä klikkausmäärästä, jolla 
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
    <>
      <Layout>
        <Navigation>
          {/*Fragmenteissa aaltosulkujen sisälle on mahdollistaa kirjoittaa 
          suoraan TS-koodia.*/
          
          /*Tehtävä 2.1: lisäominaisuus
          Pelin aikana on mahdollista navigoida takaisin etusivulle */}
          <Link to="/"><NavigationButton>Koti</NavigationButton></Link>
          {/*
          Tehtävä 2.1: lisäominaisuus
          Näytetään pelaajan keräämät pisteet pelin aikana:*/}
          <DescriptionStyle>Pisteet: {currentPoints}</DescriptionStyle>
        </Navigation>
        {allBalls}
        {/*Tehtävä 2.1: lisäominaisuus
        Jos showGameOver-tilamuuttujan arvo on tosi, näytetään 
        GameOverBox-komponentti.*/}
        {showGameOver && <GameOverBox setShowGO={setShowGameOver} points={currentPoints}></GameOverBox>}
        <Outlet />
      </Layout>
    </>
  )
}