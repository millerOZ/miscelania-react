import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <>
      <h2>404 -LA PAGINA NO SE ENCUENTRA</h2>

      <Link to={"/about"}>
        <button>VOLVER AL INICIO</button>
      </Link>
    </>
  );
};
