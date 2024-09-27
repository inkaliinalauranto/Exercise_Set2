import { ResultsProps } from "../interfaces"
import { Result } from "./Result"

//Tehtävä 2.1: lisäominaisuus
export function ResultList({ results }: ResultsProps) {
  /*Alustetaan muuttuja, jonka arvoa kasvatetaan, kun results-arrayta 
  iteroidaan. */
  let index = 0

  /* Käytetään sortausmenetelmää, jossa objektialkiot järjestetään arrayssa 
  niiden avainten (points) arvoja toisiinsa vertaamalla. Järjestetään objektit 
  points-avaimen arvojen suhteen suurimmasta pienimpään. */
  results.sort((a, b) => b.points - a.points)

  /*Tehdään resultItems-muuttujaan propsina välitetyn lajitellun arrayn 
  arvoja hyödyntäen uusi array: */
  const resultItems = results.map((result) => {
    index++
    /*Asetetaan kullekin luotavalle alkiolle index-muuttujan arvo sekä 
    index-propsiksi että keyksi, koska arvo on iteratiivisesti kasvava ja 
    näin ollen uniikki. Keyn avulla React pystyy pitämään luotavista 
    Result-komponenteista lukua silmukan aikana. Lähetetään index-muuttuja 
    myös Result-komponenttiin, jossa sillä kuvataan pelaajan pistesijaa. */
    return <Result
      key={index}
      nickname={result.nickname}
      points={result.points}
      index={index} />
  })

  return <>
    <div>
      {resultItems}
    </div>
  </>
}

