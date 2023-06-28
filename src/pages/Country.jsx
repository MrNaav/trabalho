import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import './Country.css'

const Country = ({img}) => {

    const {name} = useParams()

    const [flagData, setFlagData] = useState ([])
    const fetchFlagData = useCallback (async () =>{
        try {
            const{data} = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            setFlagData(data)
            console.log(data)
        }catch(error){
            console.error(error)
        }
    },[])

    useEffect(() => {
        fetchFlagData()
    },[])

    const renderFlagData = () => {
    return (
        <div className='container2'>
            <Link to="/" style={{color:"#ccc",textDecoration:"none"}}>Voltar</Link>
            {flagData.map(flag =>(
                <div className="container2">
                    <h3>Nome: {name}</h3>
                    <img src={flag.flags.png} alt={flag.name}/>
                    {flag.capital?<h3>Capital: {flag.capital[0]}</h3>:""}
                    <h3>Continente: {flag.continents[0]}</h3>
                    <h3>População: {flag.population}</h3>
                    <h3>Horário local: {flag.timezones[0]}</h3>
                </div>
            ))}
        </div>
    )
    } 

    return (
        <div>
            {renderFlagData()}
        </div>
    );
}
export default Country;