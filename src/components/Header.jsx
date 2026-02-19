import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, Moon, Sun } from "lucide-react";
import { CloudSunRain } from "lucide-react";
import { useTheme } from "@/context/theme-provider";
import { useWeather } from "@/context/weatherContext";
import { useState } from "react";

function Header() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const [inputValue, setInputValue] = useState("");
  const { setCity } = useWeather();

  const handleClick = () => {
    if (!inputValue || inputValue === "") return;

    setCity(inputValue);

    setInputValue("");
  };

  return (
    <div>
      <header className="flex justify-between mt-4 px-4 items-center">
        <h1 className="text-2xl dark:text-gray-100 text-gray-700 font-bold max-sm:hidden flex items-center">
          Weather
         <CloudSunRain size={30} />
        </h1>
        <CloudSunRain size={48} className="sm:hidden" />
        <div className="flex md:w-1/2">
          <Input
            placeholder="Enter City"
            className="shadow"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button onClick={handleClick} size="icon">
            <Search />
          </Button>
        </div>

        <div
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark ? "rotate-90" : "rotate-0"}`}
        >
          {isDark ? (
            <Sun className="h-6 w-6 text-yellow-400 rotate-0 transition-all" />
          ) : (
            <Moon className="h-6 w-6 text-blue-400 rotate-0 transition-all" />
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
