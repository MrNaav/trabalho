import { Link } from 'react-router-dom';
import "./CountryItem.css";

const CountryItem = ({ name, img }) => {

  return (
    <div className='country-item'>
      <img src={img} alt={name}/>
      <p className='country-item-name'>{name}</p>
    </div>
  );
};
export default CountryItem;
