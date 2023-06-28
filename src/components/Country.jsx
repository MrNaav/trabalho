import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import './Country.css'

const Country = ({img}) => {

    const {name} = useParams()

    const [flagData, setFlagData] = useState ([])
    const fetchFlagData = useCallback (async (paramOffset) =>{
        console.log('teste')
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

    const listLg = () => {
        const list = []
        for(const lg in flagData[0].languages) {
            console.log(flagData[0].languages)
        }
    }

    const renderFlagData = () => {
    return (
        <div className='container'>
            {flagData.map(flag =>(
                <div className="container">
                    <h3>Nome: {name}</h3>
                    <img src={img}/>
                    {flag.capital?<h3>Capital: {flag.capital[0]}</h3>:""}
                    <h3>Continente: {flag.continents[0]}</h3>
                    <h3>População: {flag.population}</h3>
                    <h3>Horário local: {flag.timezones[0]}</h3>
                    {listLg()}
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