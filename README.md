## Pallopeliselainohjelma

## Esivalmistelut
Asenna Node.js-ympäristö ja Visual Studio Code -editorisovellus.

Tee [Supabase-palveluun](https://supabase.com/) käyttäjä ja luo uusi projekti. Siirry sivuvalikosta Table Editor -sivulle. Paina sivun keskellä olevaa "Create a new table" -nappia. Syötä Name-kenttään ranking. Täppää Enable Row Security pois päältä. Lisää sarakkeet seuraavilla arvoilla:
- Name: id, Type: int8, Primary: täppä, Is Identity: täppä
- Name: created_at, Type: timestamptz, Default Value: now()
- Name: points, Type: int8
- Name: nickname, Type: text

![Ohjekuva tarvittavista sarakkeista](ohjekuva1.png)

Siirry sivuvalikosta Project Settings -sivulle. Settings-sivun valikosta siirry CONFIGURATION-otsikon alta API-sivulle. Kopioi sivulla olevasta Project API Keys -laatikosta ensimäisessä kentässä oleva merkkijono. Kentän tag on public. Ota merkkijono talteen. Siirry sivuvalikosta API Docs -sivulle. Avaa GETTING STARTED -otsikon alla oleva Introduction-sivu. Ota talteen sivulla näkyvä const supabaseUrl -muuttujaan asetettu merkkijono. Talteen oton yhteydessä jätä merkkijonosta sitä ympäröivät heittomerkit pois. 

## Ohjelman lataaminen ja riippuvuuksien asentaminen
Avaa komentoterminaali, navigoi kansioon, johon haluat kloonata projektin ja kloona projekti ajamalla seuraava komento:
```
https://github.com/inkaliinalauranto/React_TypeScript_Exercise_Set2.git
```
Siirry kloonattuun projektikansioon ajamalla komentoterminaalissa seuraava cd-komento. (Jos nimesit projektin muulla nimellä, kirjoita nimi React_TypeScript_Exercise_Set2-nimen tilalle.)
```
cd React_TypeScript_Exercise_Set2
```
Aja sen jälkeen komentoterminaalissa seuraava riippuvuudet asentava komento:
```
npm install
```
Avaa projekti Visual Studio Code -editorilla ajamalla komentoterminaalissa seuraava komento:
```
code .
```

## Ohjelman konfigurointi ja käynnistäminen
Vaihda vasemman laidan tiedostopuun ".env_example"-tiedoston nimeksi ".env". 

![Ohjekuva tarvittavista sarakkeista](ohjekuva2.png)

Aseta VITE_SUPABASE_KEY-muttujassa olevien lainausmerkkien väliin Supabase-palvelusta ensimmäiseksi tallettamasi satunnaisia merkkejä sisältävä merkkijono. Aseta VITE_SUPABASE_URL-muuttujassa olevien lainausmerkkien sisään viimeiseksi tallettamasi URL-osoitteen muotoinen merkkijono. Tallenna muutokset painamalla näppäinyhdistelmää "CTRL + S" tai valitsemalla editorin ylävalikosta "File" ja edelleen "Save".

Avaa komentoterminaali editorissa painamalla näppäinyhdistelmää "CTRL + Ö" tai painamalla ylävalikon Terminal-otsikon alta kohtaa "New Terminal". Älä siirry terminaalissa projektin juurisijainnaista muualle. 

Käynnistä kehitysympäristö ajamalla seuraava komento:
```
npm run dev
```
Siirry sen jälkeen osoitteeseen http://localhost:5173/, jossa sovellus on nyt käynnissä.

## Projektissa käytettävät paketit/riippuvuudet
Projektissa käytetään seuraavia paketteja:
- supabase-js sovelluksen taustalla olevaan tietokantaan liittyviin toimintoihin
- React Awesome Reveal sovelluksen komponenttien animoimiseen
- React Router DOM sovelluksensisäiseen navigointiin
- styled-components kustomoitujen tyylikomponenttien toteuttamiseen

Kehityspalvelimena projektissa käytetään Vite-työkalua. Ohjelma on toteutettu React-sovelluskehyksellä ja TypeScript-kielellä.

## Esimerkki projektin toiminnasta
Ohjelman toimintaa esittelevä esimerkkivideo löytyy seuraavan linkin takaa: 
