import { useEffect, useState } from "react"
import { getResults } from "../services/supabase_client"
import { ResultProps } from "../interfaces"
import { LBOverlay, LBStyle } from "./common"
import { Fade } from "react-awesome-reveal"
import { ResultList } from "./ResultList"

/*Tehtävä 2.2: lisäominaisuus, jossa hyödynnetään itsevalittua kirjastoa 
Etusivulla näytetään pistetaulu. Tulokset haetaan Supabase-palveluun tehdyn 
tietokannan ranking-taulusta. */
export function LeaderBoard() {
  const [results, setResults] = useState([{ nickname: "", points: 0 }])
  const [isFetched, setIsFetched] = useState(false)

  /*Kun komponentti renderöidään ensimmäisen kerran (toisena parametrina 
  tyhjä array), haetaan pelisuoritukset tietokannasta 
  results-tilamuuttujaan. Koska getResults on asynkroninen, hyödynnetään 
  JavaScriptin then-metodia. Asetetaan myös isFetched-tilamuuttujan arvo 
  todeksi, jolloin pistetaulukomponentti palautetaan kokonaisuudessaan 
  returnissa.*/
  useEffect(() => {
    getResults().then((resultsData) => {
      const resultsArray: ResultProps[] = resultsData as ResultProps[]
      setResults(resultsArray)
      setIsFetched(true)
    })
  }, [])

  /*Tehtävä 2.2: itsevalitun kirjaston hyödyntäminen
  Hyödynnetään Reactille tarkoitettua React Awesome Reveal 
  -TypeScript-kirjastoa. Pistetaulu asetetaan Fade-komponentin sisään, 
  jolloin pistetaululle saadaan häivytysanimaatio. 
  
  Kirjaston GitHub-repositorio: 
  https://github.com/awesome-reveal/react-awesome-reveal */
  return <>
    {/*Palautetaan eli näytetään komponentti vasta, kun isFetchedin arvo 
    on tosi. Arvo muutetaan todeksi useEffectissä, kun pelisuoritukset on 
    haettu tietokannasta. */}
    {isFetched && <LBOverlay>
      <Fade>
        <LBStyle>
          <h1>Pistetilanne</h1>
          {/*Välitetään results-tilamuuttujaan haetut tulokset propsina 
          lapsikomponentille. */}
          <ResultList results={results} />
        </LBStyle>
      </Fade>
    </LBOverlay>}
  </>
}