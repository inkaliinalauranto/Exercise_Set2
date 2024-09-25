import { Layout, Navigation, NavigationButton, DescriptionStyle } from "./components/common"
import { Outlet, Link } from "react-router-dom"
import { LeaderBoard } from "./components/LeaderBoard"

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