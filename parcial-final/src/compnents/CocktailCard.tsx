import { Link } from "react-router-dom";

interface Props {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

const CocktailCard: React.FC<Props> = ({ idDrink, strDrink, strDrinkThumb }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-3">
      <img
        src={strDrinkThumb}
        alt={strDrink}
        className="w-full h-40 object-cover rounded-md"
        loading="lazy"
      />
      <h3 className="mt-3 text-lg font-semibold">{strDrink}</h3>
      <p className="text-sm text-gray-500">ID: {idDrink}</p>
      <Link
        to={`/cocktail/${idDrink}`}
        className="mt-3 inline-block bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        Ver detalle
      </Link>
    </div>
  );
};

export default CocktailCard;