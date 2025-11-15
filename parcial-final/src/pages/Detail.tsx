import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface DrinkDetail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strCategory: string;
  strGlass: string;
  strInstructions: string;
  [key: string]: string | undefined;
}

function getIngredients(drink: DrinkDetail): { ing: string; meas: string }[] {
  const items = [];
  for (let i = 1; i <= 15; i++) {
    const ing = drink[`strIngredient${i}`];
    const meas = drink[`strMeasure${i}`];
    if (ing) items.push({ ing, meas: meas || "" });
  }
  return items;
}

const Detail: React.FC = () => {
  const { id } = useParams();
  const [drink, setDrink] = useState<DrinkDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOne = async () => {
      try {
        setLoading(true);
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        const { data } = await axios.get(url);
        setDrink(data.drinks?.[0] || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOne();
  }, [id]);

  if (loading) return <div className="p-6">Cargando detalle...</div>;
  if (!drink) return <div className="p-6">No se encontró el cóctel.</div>;

  const ingredients = getIngredients(drink);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link to="/" className="text-blue-600 hover:underline">← Volver</Link>
      <div className="mt-4 bg-white rounded-lg shadow p-4">
        <div className="flex gap-4">
          <img
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
            className="w-48 h-48 object-cover rounded"
          />
          <div>
            <h2 className="text-2xl font-bold">{drink.strDrink}</h2>
            <p className="text-sm text-gray-600">
              Categoría: {drink.strCategory} · Vaso: {drink.strGlass}
            </p>
            <p className="mt-3">{drink.strInstructions}</p>
          </div>
        </div>

        <h3 className="mt-6 text-xl font-semibold">Ingredientes</h3>
        <ul className="list-disc ml-6">
          {ingredients.map((item, idx) => (
            <li key={idx}>
              {item.ing} {item.meas ? `- ${item.meas}` : ""}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Detail;