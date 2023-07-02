import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";
import CountryItem from "../components/CountryItem";

const Pagination = ({ request, offset }) => {
  const nextpage = () => {
    request(offset + 10);
  };

  const previousPage = () => {
    if (offset <= 10) return;
    request(offset - 10);
  };

  return (
    <div className='pagination'>
      <button onClick={previousPage} className="buttonColor">
        Carregar menos
      </button>
      <button onClick={nextpage} className="buttonColor">
        Carregar mais
      </button>
    </div>
  );
};

const Home = () => {
  const [flagData, setFlagData] = useState([]);
  const [offset, setOffset] = useState(10);
  const fetchFlag = useCallback(async (paramOffset) => {
    console.log("teste");
    try {
      const { data } = await axios.get("https://restcountries.com/v3.1/all");
      setFlagData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchFlag();
  }, []);

  const renderFlagData = () => {
    return (
      <div className="container">
        {flagData.slice(0, offset).map((flag) => (
          <Link to={`/country/${flag.name.common}`} style={{textDecoration: "none"}}>
            <CountryItem name={flag.name.common} img={flag.flags.png} />
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1 className='home-title'>Lista de Países</h1>
      {renderFlagData()}
      <Pagination offset={offset} request={(e) => setOffset(e)} />
    </div>
  );
};

export default Home;
