import { useEffect, useState } from "react"
import { getResults } from "../services/supabase_client"
import { ResultProps } from "../interfaces"
import { LBOverlay, LBStyle } from "./common"
import { Fade } from "react-awesome-reveal"
import { ResultList } from "./ResultList"

/*Tehtävä 2.1 lisäominaisuus: etusivulla näytettävä pistetaulu. Tulokset 
haetaan Supabase-palveluun tehdyn tietokannan ranking-taulusta. */
export function LeaderBoard() {
  const [results, setResults] = useState([{ nickname: "", points: 0 }])

  /*Kun komponentti renderöidään ensimmäisen kerran (toisena parametrina 
  tyhjä array), haetaan pelisuoritukset tietokannasta 
  results-tilamuuttujaan. Koska getResults on asynkroninen, hyödynnetään 
  JavaScriptin then-metodia. */
  useEffect(() => {
    getResults().then((resultsData) => {
      const resultsArray: ResultProps[] = resultsData as ResultProps[]
      setResults(resultsArray)
    })
  }, [])

  return <>
    <LBOverlay>
      <Fade>
        <LBStyle>
          <h1>Pistetilanne</h1>
          {/*Välitetään results-tilamuuttujaan haetut tulokset propsina 
          lapsikomponentille. */}
          <ResultList results={results} />
        </LBStyle>
      </Fade>
    </LBOverlay>
  </>
}