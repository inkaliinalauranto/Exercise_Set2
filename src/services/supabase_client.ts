import { createClient } from '@supabase/supabase-js'
import { Database } from "./supabase.ts"

/* Tehtävä 2: Supabasen hyödyntäminen pelisuoritustietojen 
Supabase-tietokantaan siirtämisessä ja siellä säilyttämisessä.

Kirjaston dokumentaatio: 
https://supabase.com/docs/reference/javascript/start */

const supabaseUrl = 'https://pvvokutjnjbehmiwoxow.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

/*Lisätään Supabase-palveluun tehdyn tietokannan ranking-tauluun tietue 
parametrien perusteella.*/
export const addPointsToDb = async (nickname: string, points: number) => {
  if (!nickname) {
    alert("Käyttäjänimi tarvitaan")
    return
  }

  const { data, error } = await supabase.from("ranking").insert([
    {
      nickname: nickname,
      points: points
    }
  ]) // .select()-lisäys palauttaisi lisätyn tietueen

  if (error) {
    alert("Tapahtui virhe: " + error.message)
    return
  }

  console.log(data)
}


/*Tehtävä 2: lisäominaisuus
Haetaan Supabase-palveluun tehdyn tietokannan ranking-taulusta kaikki 
tietueet. Sisällytetään niihin vain nickname- ja points-sarakkeiden arvot, 
koska muiden sarakkeiden arvoja ei haluta näyttää etusivun pistetaululla.*/
export const getResults = async () => {
  const { data, error } = await supabase.from("ranking").select("nickname, points")

  if (error) {
    alert("Tapahtui virhe: " + error.message)
    return
  }

  return data
}