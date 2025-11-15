import { useEffect, useState } from "react";
import axios from "axios";
import CocktailCard from "../compnents/CocktailCard";

interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

const Home: React.FC = () => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url =
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail";
        const { data } = await axios.get(url);
        setDrinks(data.drinks || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = q
    ? drinks.filter((d) =>
        d.strDrink.toLowerCase().includes(q.toLowerCase())
      )
    : drinks;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Cocktails</h1>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nombre..."
          className="border rounded px-3 py-2 w-64"
        />
      </header>

      {loading ? (
        <p className="text-gray-600">Cargando...</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.slice(0, Math.max(15, filtered.length)).map((drink) => (
            <CocktailCard key={drink.idDrink} {...drink} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;