import {
  Paper,
  createTheme,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import "./App.scss";
import ImageCarousel from "./ImageCarousel";
import WineBackground from "./WineBackground.tsx";

const theme = createTheme({
  typography: {
    fontFamily: "Nunito, sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <WineBackground />
      <div className="container">
        {/* <Typography mt="2rem" variant="h2" textAlign="center" mb="2rem">
          Borgramozók
        </Typography> */}
        <Stack mt="7%" direction="row" justifyContent="space-between">
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            width="40%"
          >
            <ImageCarousel
              images={Array.from({ length: 5 }, (_, i) => i + 1).map(
                (num) => `/${num}.jpg`
              )}
              autoplayInterval={6000}
              height={500}
            ></ImageCarousel>
          </Stack>
          <Stack
            direction="column"
            justifyContent="flex-start"
            rowGap="1rem"
            width="50%"
          >
            <Paper elevation={3} sx={{ padding: "2rem" }}>
              <Typography variant="h5" textAlign="center" mb="2rem">
                Borgramozók – Kód, bor, káosz
              </Typography>
              <Typography fontSize={20} padding="0 2rem" align="justify">
                Mi vagyunk a Borgramozók – egy egyetemi baráti társaság, ahol a
                szőlőből nem csak bor, hanem bug report is készül.
              </Typography>
              <Typography fontSize={20} padding="0 2rem" align="justify">
                Informatikusok vagyunk, akiknek a main function-je az ivás és a
                bulizás, de ha kell, egy hajnalig tartó merge conflictot is
                végignyomunk egy palack vörös kíséretében.
              </Typography>
              <Typography fontSize={20} padding="0 2rem" align="justify">
                A csapat:
              </Typography>
              <Typography
                fontSize={20}
                padding="0 2rem"
                textAlign="start"
                ml="2rem"
              >
                2 gazdaságinformatikus – Ők kiszámolják, hány üveg bor fér bele
                a havi költségvetésbe, miközben SQL-ben kérdezik le a
                kedvezményes árakat.
              </Typography>
              <Typography
                fontSize={20}
                padding="0 2rem"
                align="justify"
                ml="2rem"
              >
                3 programtervező informatikus – Minden este új architektúrával
                állnak elő, de reggel már csak a para marad. Ők találják ki az
                algoritmust, hogy borral hogyan lehet hatékonyabban tanulni.
              </Typography>
              <Typography
                fontSize={20}
                padding="0 2rem"
                align="justify"
                ml="2rem"
              >
                1 PhD hallgató – A tudomány élő szőlőtőkéje, aki már háromszor
                újraírta a disszertációját, de a Borgramozókkal való ivásról
                sosem mondana le.
              </Typography>
              <Typography fontSize={20} padding="0 2rem" align="justify">
                Ismertetőjegyek: A kedvenc adatstruktúránk a borfától függ. A
                commit üzeneteink gyakran így kezdődnek: “nem vagyok benne
                biztos, de ittam hozzá egy kis bort…” Nálunk a bor-derline a
                stabil verzió.
              </Typography>
              <Typography fontSize={20} padding="0 2rem" align="justify">
                Mottónk: "In vino veritas, in codice chaos."
              </Typography>
              <Typography fontSize={20} padding="0 2rem" align="justify">
                Borgramozók: ahol a borospohár a debugger, és minden exception
                után koccintunk egyet. 🍷💻
              </Typography>
            </Paper>
          </Stack>
        </Stack>
      </div>
    </ThemeProvider>
  );
}

export default App;
