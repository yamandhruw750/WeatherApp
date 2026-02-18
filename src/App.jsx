import { ThemeProvider } from "@/context/theme-provider";
import { WeatherProvider } from "./context/weatherContext";

import MainCard from "./components/Card";
// import Layout from "./components/Layout";
import Header from "./components/Header";

function App() {
  return (
    <WeatherProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="h-screen w-full">
          <Header />
          <MainCard />
          {/* <Layout /> */}
        </div>
      </ThemeProvider>
    </WeatherProvider>
  );
}

export default App;
