import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Country from "../components/Country";
import './Flag.css'
import { Link } from "react-router-dom";

const Pagination = ({request, offset}) => {
    
    const nextpage = () => {
        request(offset + 12)
    }
    
    const previousPage = () => {
        if (offset <= 12) return
        request(offset - 12)
    }

    return (
        <div>
            <button onClick={previousPage} className="buttonColor">Carregar menos</button>
            <button onClick={nextpage} className="buttonColor">Carregar mais</button>
        </div>
    )
}


const Flag = () => {

    const [flagData, setFlagData] = useState([])
    const [offset, setOffset] = useState(12);
    const fetchFlag = useCallback(async (paramOffset) => {
        console.log('teste')
        try{
            const { data } = await axios.get('https://restcountries.com/v3.1/all')
            setFlagData(data)
            console.log(data)
        }catch(error){
            console.error(error)
        }
    },[])
    
    useEffect(() => {
        fetchFlag()
    },[])

    const renderFlagData = () => {
        return (
                <div className="container">
                    {flagData.slice(0,offset).map(flag =>(
                        <Link to={`/country/${flag.name.common}`} >
                            <div>
                                <Country name={flag.name.common} img={flag.flags.png}/>
                            </div>
                        </Link>
            ))}
            </div>
        )
    }

    return (
        <div>
            <details>
                <summary>Lista dos países</summary>
                <p>Selecione o país para mais informações</p>

            </details>
        {renderFlagData()}
        <Pagination offset={offset} request={(e) => setOffset(e)}/>
        </div>
    );
}

export default Flag;