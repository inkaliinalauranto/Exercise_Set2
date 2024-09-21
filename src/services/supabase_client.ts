import { createClient } from '@supabase/supabase-js'
import { Database } from "./supabase.ts"

const supabaseUrl = 'https://pvvokutjnjbehmiwoxow.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)


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
    ]).select()

    if (error) {
      alert("Tapahtui virhe: " + error.message)
      return
    }

    console.log(data)
    return data.at(0)
  }