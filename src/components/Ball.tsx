import { CSSProperties, useState } from "react"
import { BallProps } from "../interfaces"
import { Bounce } from "react-awesome-reveal"
import { randomInteger } from "../functions"

export function Ball({ maxCount, x, y, handlePointsFromChild }: BallProps) {
  const [clicked, setClicked] = useState(0)

  /* Tässä muuttujassa oleva funktio asetetaan komponentista palautettavan 
  divin onClickille viitteenä eli sitä ei suoraan kutsuta onClickissä, 
  jotta se suoritetaan ainoastaan klikkausten yhteydessä eikä esimerkiksi 
  heti alussa. */
  const handleClick = () => {
    const newClickCount = clicked + 1
    setClicked(newClickCount)

    /*Tehtävä 2.1: lisäominaisuus
    Jos pelaaja on klikannut palloa maksimilukumäärän verran, kutsutaan 
    parent-komponentista propsina välitettyä funktiota. Välitetään 
    funktiokutsuun pelaajan pisteet eli klikkausten lukumäärä. Näin 
    yksittäisen pallon pisteet saadaan siirrettyä Game-komponentille. */
    if (newClickCount >= maxCount) {
      handlePointsFromChild(newClickCount)
    }
  }

  const completedStyle: CSSProperties = {
    transform: `translate(${x}px, ${y}px)`,
    color: `#7A2048`
  }

  /* Tehtävä 2.1: lisäominaisuus 
  Kun pallon on "poksautettu" eli palloa on klikattu maxCount-parametrissa 
  olevan lukeman verran, generoidaan pallon sijaan teksti "Valmis!". 
  Annetaan tekstille completedStyle-muuttujaan talletettu tyyli, jolla 
  teksti asetetaan samaan kohtaan, jossa poksautettu pallo oli. */
  if (clicked >= maxCount) {
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

  /*Tehtävä 2.2
  Hyödynnetään Reactille tarkoitettua React Awesome Reveal 
  -TypeScript-kirjastoa. Palautettava Ball-div asetetaan 
  Bounce-komponentin sisään, jotta palloille saadaan animaatio. 
  Välitetään Bounce-animaatiokomponentille propsina 
  millisekuntimuotoinenkesto, joka arvotaan tehtyä randomInteger-funktiota 
  hyödyntämällä.
  
  Kirjaston GitHub-repositorio: 
  https://github.com/awesome-reveal/react-awesome-reveal*/
  return <>
    <Bounce duration={randomInteger(1000, 4000)}>
      <div
        style={ballStyle}
        onClick={handleClick}>
        {clicked} / {maxCount}
      </div>
    </Bounce>
  </>
}