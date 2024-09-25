import { useEffect, useState } from "react"
import { getResults } from "../services/supabase_client"
import { ResultProps } from "../interfaces"
import { LBOverlay, LBStyle } from "./common"
import { Fade } from "react-awesome-reveal"
import { ResultList } from "./ResultList"

export function LeaderBoard() {
    const [results, setResults] = useState([{ nickname: "", points: 0 }])
  
    /*Haetaan pelisuoritustietojen haku tietokannasta results-tilamuuttujaan. 
    Annetaan useEffectille toiseksi parametriksi tyhjä array, jotta 
    tietokantahaku tapahtuu vain komponentin ensimmäisen renderöinnin 
    yhteydessä. Koska getResults on asynkroninen, hyödynnetään JS:n theniä. */
    useEffect(() => {
      getResults().then((resultsData) => {
        const resultsArray: ResultProps[] = resultsData as ResultProps[]
        setResults(resultsArray)
      })
    }, [])
  
    return <LBOverlay>
      <Fade>
        <LBStyle>
          <h1>Pistetilanne</h1>
          <ResultList results={results} />
        </LBStyle>
      </Fade>
    </LBOverlay>
  }