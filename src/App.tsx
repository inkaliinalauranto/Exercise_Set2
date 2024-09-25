import { useEffect, useState } from "react"
import { Layout, Navigation, NavigationButton, LBOverlay, LeaderBoardStyle } from "./components/common"
import { Outlet, Link } from "react-router-dom"

export function LeaderBoard() {
  return <LBOverlay>
    <LeaderBoardStyle>
      <h1>Pistetilanne</h1>
      <p>Tähän pisteet</p>
    </LeaderBoardStyle>
  </LBOverlay>
}

export default function App() {
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