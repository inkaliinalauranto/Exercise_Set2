import { useState } from "react"
import { addPointsToDb } from "./services/supabase_client"
import { Layout, Navigation, NavigationButton } from "./components/common"
import { Outlet, Link } from "react-router-dom"

export default function App() {
  const [nickname, setNickname] = useState("")
  return <Layout>
    <Navigation>
      <Link to="/game"><NavigationButton>Aloita peli</NavigationButton></Link>
    </Navigation>
    <input type={nickname} onChange={(e) => { setNickname(e.target.value) }} />
    <button onClick={() => { addPointsToDb(nickname, 0) }}>Testaa supabase-yhteys</button>
    <p>Nimimerkki: {nickname}</p>
    <Outlet />
  </Layout>
}