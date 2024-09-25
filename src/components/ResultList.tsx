import { ResultsProps } from "../interfaces"
import { Result } from "./Result"

export function ResultList({ results }: ResultsProps) {
    /*Alustetaan muuttuja, jonka arvoa kasvatetaan, kun results-arrayta 
    iteroidaan. */
    let index = 0
  
    /* Käytetään sortausmenetelmää, jossa objektialkiot järjestetään arrayssa 
    niiden avainten (points) arvoja toisiinsa vertaamalla. Järjestetään objektit 
    points-avaimen arvojen suhteen suurimmasta pienimpään. */
    results.sort((a, b) => b.points - a.points)
  
    const resultItems = results.map((result) => {
      index++
      /*Asetetaan kullekin alkiolle index-muuttujan arvo sekä index-propsiksi 
      että keyksi, koska arvo on uniikki ja automaattisesti kasvava. Näin React 
      pystyy pitämään Result-komponenteista lukua silmukan aikana. Lähetetään 
      index-muuttuja myös Result-komponenttiin, jossa sillä kuvataan pelaajan 
      pistesijaa. */
      return <Result key={index} nickname={result.nickname} points={result.points} index={index} />
    })
  
    return <div>
      {resultItems}
    </div>
  }
  
  