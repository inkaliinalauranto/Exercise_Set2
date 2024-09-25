import { useEffect, useState } from "react"
import { Layout, Navigation, NavigationButton, LBOverlay, LBStyle, ResultStyle, Space, DescriptionStyle } from "./components/common"
import { Outlet, Link } from "react-router-dom"
import { getResults } from "./services/supabase_client"
import { Fade } from "react-awesome-reveal"


interface ResultItemProps {
  nickname: string
  points: number
  index: number
}

interface ResultProps {
  nickname: string
  points: number
}

interface ResultsProps {
  results: ResultProps[]
}


export function Result({ nickname, points, index }: ResultItemProps) {
  return <>
    <ResultStyle>
      <Space><p>Sija {index}.</p></Space>
      <Space><p>{nickname}, </p></Space>
      <Space><p>pisteet: {points}</p></Space>
    </ResultStyle>
  </>
}


export function ResultList({ results }: ResultsProps) {
  /*Alustetaan muuttuja, jonka arvoa kasvatetaan, kun results-arrayta 
  iteroidaan. */
  let index = 0

  /* Käytetään sortausmenetelmää, jossa objektialkiot järjestetään arrayssa 
  niiden avainten (points) arvoja vertaamalla. Järjestetään objektit 
  points-avaimen arvon suhteen suurimmasta pienimpään. */
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

export default function App() {
  // Perustele animaatiopaketti
  return <Layout>
    <Navigation>
      <DescriptionStyle><DescriptionStyle>Pallonpoksautus</DescriptionStyle></DescriptionStyle>
      <Link to="/game"><NavigationButton>Aloita peli</NavigationButton></Link>
    </Navigation>
    {/* <input type={nickname} onChange={(e) => { setNickname(e.target.value) }} />
    <button onClick={() => { addPointsToDb(nickname, 0) }}>Testaa supabase-yhteys</button>
    <p>Nimimerkki: {nickname}</p> */}
    <LeaderBoard />
    <Outlet />
  </Layout>
}