import { useState } from "react"
import { GameOverProps } from "../interfaces"
import { addPointsToDb } from "../services/supabase_client"
import { GOStyle, GOButton, GOElement, GOOverlay } from "./common"
import { Link, Outlet } from "react-router-dom"
import { Fade } from "react-awesome-reveal"

// Selitä + perustele animaatiopaketti
export function GameOverBox({ setShowGameOver, points }: GameOverProps) {
  const [nickname, setNickname] = useState("")

  const onSave = async () => {
    if (!nickname) { return }
    await addPointsToDb(nickname, points)
    setShowGameOver(false)
  }

  return (
    <GOOverlay>
      <Fade>
        <GOStyle>
          <p>Läpäisit pelin!</p>
          <GOElement><h3>Pisteet: {points}</h3></GOElement>
          <GOElement><label htmlFor="nickname">Nimimerkki:</label></GOElement>
          <GOElement>
            <input
              value={nickname}
              onChange={(e) => { setNickname(e.target.value) }}
              id="nickname"
              type="text" />
          </GOElement>

          <Link to="/"><GOButton onClick={onSave}>Tallenna</GOButton></Link>
          <Link to="/"><GOButton>Ohita</GOButton></Link>
        </GOStyle>
      </Fade>
      <Outlet />
    </GOOverlay>
  )
}