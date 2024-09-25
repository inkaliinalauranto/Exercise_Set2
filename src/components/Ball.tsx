import { CSSProperties, useState } from "react"
import { BallProps } from "../interfaces"
import { Bounce } from "react-awesome-reveal"

export function Ball({ maxCount, x, y, handlePointsFromChild }: BallProps) {
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

    // perustele animaatiopaketti
    return <>
    <Bounce>
      <div
        style={ballStyle}
        onClick={handleClick}>
        {clicked} / {maxCount}
      </div>
    </Bounce>
    </>
  }