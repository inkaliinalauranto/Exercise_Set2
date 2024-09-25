import { useEffect, useState } from "react"
import { Layout, Navigation, NavigationButton, LBOverlay, LBStyle } from "./components/common"
import { Outlet, Link } from "react-router-dom"
import { getResults } from "./services/supabase_client"

export function LeaderBoard() {
  return <LBOverlay>
    <LBStyle>
      <h1>Pistetilanne</h1>
      <p>Tähän pisteet</p>
    </LBStyle>
  </LBOverlay>
}

export default function App() {

  /*Testataan pelisuoritustietojen haku tietokannasta. Annetaan 
  useEffectille toiseksi parametriksi tyhjä array, jotta tietokantahaku 
  tapahtuu vain komponentin ensimmäisen renderöinnin yhteydessä. Koska 
  getResults on asynkroninen, hyödynnetään JS:n theniä. */
  useEffect(() => {
    getResults().then((results) => {
      console.log(results)
    })
  }, [])

  return <Layout>
    <Navigation>
      <Link to="/game"><NavigationButton>Aloita peli</NavigationButton></Link>
    </Navigation>
    {/* <input type={nickname} onChange={(e) => { setNickname(e.target.value) }} />
    <button onClick={() => { addPointsToDb(nickname, 0) }}>Testaa supabase-yhteys</button>
    <p>Nimimerkki: {nickname}</p> */}
    <LeaderBoard></LeaderBoard>
    <Outlet />
  </Layout>
}