# Düdrukud CanSat 2027 — veebilehe uuendatud versioon

## Mis on siin kaasas?
- `index.html` — eestikeelne avaleht
- `style.css` — uus kohanduv kujundus
- `script.js` — mobiilimenüü ja uudiste laadimine
- `assets/dudrukud-logo.png` — teie olemasolev logo
- `content/news/` — uudiste failid
- `.pages.yml` — Pages CMS-i seadistus

## Kuidas uuendus GitHubi lisada?
1. Laadi ZIP lahti.
2. Ava oma repo: https://github.com/dariaihnatieva123-tech/PurkSatelliit2027
3. Asenda `index.html` ja `style.css`; lisa `script.js`, `.pages.yml`, `assets/` ja `content/`.
4. Tee commit. GitHub Pages uuendab saidi automaatselt pärast avaldamise lõppu.

Soovitus: enne asendamist laadi praegune repo ZIP-ina alla, et sul oleks varukoopia.

## Kuidas lisada uudiseid ilma koodi muutmata?
1. Ava https://app.pagescms.org/ ja logi sisse GitHubi kontoga.
2. Luba Pages CMS-il ligipääs ainult `PurkSatelliit2027` repole.
3. Ava repo ja vali `main` haru.
4. Ava `Uudised` ning vajuta uue postituse lisamiseks.
5. Täida pealkiri, kuupäev, kategooria, lühikirjeldus, tekst ja soovi korral pildi URL.
6. Salvesta. Pages CMS kirjutab uudise GitHubi ning GitHub Pages avaldab uuenduse.

Pages CMS on eraldi sisuhaldusliides; see ei ole privaatne admin-leht sinu saidi URL-i all. Repo muutmise õigusega GitHubi konto on vajalik. Ära jaga oma GitHubi parooli kellelegi.

## Piltide lisamine
Pages CMS-i kaudu saab üles laadida meediafaile. Selle seadistuse puhul salvesta pilt kausta `assets/` ja kasuta uudise väljal `Pildi URL` aadressi kujul (suhteline aadress):
`assets/pildi-nimi.jpg`

Kui pilt ei ilmu pärast esimest katset, kontrolli, et faili URL sisaldaks repo nime `PurkSatelliit2027`.

## Tähtsad märkused
- Uudiste laadimine kasutab GitHubi avaliku repo Contents API-t. Kui API päring ebaõnnestub, jääb lehele üldine algne uudiste sõnum.
- `image` väli on pildi URL; kõige töökindlam on kasutada sama repo `assets` kausta üles laaditud pilti.
- Enne avaldamist kontrolli missiooni mõõtmisi ja kontaktandmeid. Need jäeti üldiseks, et mitte esitada kinnitamata tehnilisi detaile.
- GitHub Pages võib avaldada muudatused väikese viivitusega.
