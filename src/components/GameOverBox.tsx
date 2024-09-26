import { useEffect, useState } from "react"
import { GameOverProps } from "../interfaces"
import { addPointsToDb } from "../services/supabase_client"
import { GOStyle, GOButton, GOElement, GOOverlay } from "./common"
import { Link, Outlet } from "react-router-dom"
import { Fade } from "react-awesome-reveal"

/*Tehtävä 2.1: lisäominaisuus
Kun pelaaja läpäisee pelin, näytetään tämä komponentti, jossa palautetaan 
eli näytetään mm. pisteet. Lisäksi pelaajan on mahdollista viedä oma 
suoritus tietokantaan syöttämällä nimimerkki input-kenttään ja painamalla 
Tallenna-nappia, minkä jälkeen navigoidaan etusivulle. Vaihtoehtoisesti 
pelaaja voi painaa Ohita-nappia, joka myös on linkki etusivulle.*/
export function GameOverBox({ setShowGO: setShowGameOver, points }: GameOverProps) {
  const [nickname, setNickname] = useState("")
  /*Totuusarvomuotoinen tilamuuttuja, jonka arvo määrittelee sen, onko 
  Tallenna-nappi enabloitu.*/
  const [isDisabled, setIsDisabled] = useState(true)

  /*Seurataan nickname-tilamuuttujan arvoa. Jos tilamuuttujassa on muitakin 
  merkkejä kuin välilyöntejä, asetetaan isDisabled-tilamuuttujan arvo 
  falseksi. Silloin käyttöliittymässä oleva nappi enabloidaan, koska napin 
  disabled-propsille välitetään isDisabled-tilamuuttujan arvo, joka tässä 
  tilanteessa on false. Muussa tapauksessa asetetaan tilamuuttujan arvo 
  trueksi, jolloin nappia ei voi painaa. Silloin nimikenttään joko ei ole 
  kirjoitettu tai kirjoitetut merkit ovat välilyöntejä. */
  useEffect(() => {
    if (nickname.trim().length !== 0) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [nickname])

  /*Kun käyttäjä klikkaa Tallenna-nappia, kutsutaan tähän muuttujaan 
  tallennettua funktiota. Funktio on asynkroninen, koska addPointsToDb
  on asynkroninen. Jos nimikenttään ei ole kirjoitettu, nappi on yllä 
  olevan useEffect-funktiokutsun vuoksi disabloitu, nappia voi painaa eikä 
  tätä funktiota kutsuta. Tuplatarkistetaan silti, että nimikenttään on 
  kirjoitettu tarkastamalla nickname-tilamuuttujan arvo. Jos se on falsy, 
  palataan funktiosta toimenpiteittä. Muussa tapauksessa lisätään pelaajan 
  tiedot tietokantaan addPointsToDb-funktiota kutsumalla. Pisteet saadaan 
  parent- eli Game-komponentilta propsina.*/
  const onSave = async () => {
    if (!nickname) { return }
    await addPointsToDb(nickname, points)
    setShowGameOver(false)
  }

  return <>
    <GOOverlay>
      {/*Tehtävä 2.2
      Hyödynnetään Reactille tarkoitettua React Awesome Reveal 
      -TypeScript-kirjastoa. Varsinainen GameOver-ruutu asetetaan 
      Fade-komponentin sisään, jotta ruudulle saadaan animaatio. Välitetään 
      propsina animaatiolle "suunta".

      Kirjaston GitHub-repositorio: 
      https://github.com/awesome-reveal/react-awesome-reveal */
      }
      <Fade direction={"up"}>
        <GOStyle>
          <p>Läpäisit pelin!</p>
          <GOElement><h3>Pisteet: {points}</h3></GOElement>
          <GOElement><label htmlFor="nickname">Nimimerkki:</label></GOElement>
          <GOElement>
            {/*Asetetaan käyttäjän kirjoittamat kirjaimet inputista 
            nickname-tilamuuttujaan onChange-tapahtuman yhteydessä:*/}
            <input
              value={nickname}
              onChange={(e) => { setNickname(e.target.value) }}
              id="nickname"
              type="text" />
          </GOElement>

          <Link to="/"><GOButton disabled={isDisabled} onClick={onSave}>Tallenna</GOButton></Link>
          {/*Kun Ohita-nappia klikataan asetetaan parent-komponentista 
          välitetty setteri falseksi, jotta tämä komponentti suljetaan. 
          Tämä voi olla tarpeen, jos esimerkiksi linkki ei toimisi. */}
          <Link to="/"><GOButton onClick={() => { setShowGameOver(false) }}>Ohita</GOButton></Link>
        </GOStyle>
      </Fade>
      <Outlet />
    </GOOverlay>
  </>
}