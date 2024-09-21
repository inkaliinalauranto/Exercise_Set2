import { useState } from "react"
import { addPointsToDb } from "./services/supabase_client"
import { Layout, Navigation, HomeButton } from "./components/common"

export default function App() {
  const [nickname, setNickname] = useState("")
  return <Layout>
    <Navigation>
      <HomeButton>Koti</HomeButton>
    </Navigation>
    <input type={nickname} onChange={(e) => { setNickname(e.target.value) }} />
    <button onClick={() => { addPointsToDb(nickname, 0) }}>Testaa supabase-yhteys</button>
    Nimimerkki: {nickname}

  </Layout>
}