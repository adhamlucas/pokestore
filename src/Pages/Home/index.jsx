import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';
import './index.css';

import CardItem from '../../Components/old/CardItem';
import Card from '../../Components/Card';

const Home = () => {
  const imageTestUrl = 'https://pokeres.bastionbot.org/images/pokemon/132.png';
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20');
      setPokemon(data.results);
    };

    fetchPokemon();
  }, []);

  return (
    <div className="home">
      <header>
        <div className="search-bar">
          <input placeholder="Search..." />
          <div className="search-button">
            <FiSearch size="24px" />
          </div>
        </div>
      </header>

      <main>
        <div className="items-container">
          {pokemon.map((item) => (
            <Card
              name={item.name}
              image="https://pokeres.bastionbot.org/images/pokemon/6.png"
            />
          ))}

          <Card name="Ditto" price="50,00" image={imageTestUrl} />

          <CardItem name="Adham" price="40,00" image={imageTestUrl} />

          <div className="item">
            <div className="item-content">
              <div className="item-image">
                <img src="https://pokeres.bastionbot.org/images/pokemon/132.png" alt="" />
              </div>
              <div className="item-informations">
                <p className="item-name">Ditto</p>
                <p className="item-price">R$ 40,00</p>
              </div>
              <button className="item-buy-button" type="button">
                Comprar
              </button>
            </div>
          </div>

        </div>

        <div className="shopping-cart">
          <div className="orders">
            <div className="order">
              <div className="order-image">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png" alt="colocar o nome do pokemon" />
              </div>
              <div className="order-informations">
                <p className="order-name">Ditto</p>
                <p className="order-quantity">1</p>
                <p className="order-price">R$ 40,00</p>
              </div>

              <div className="order-buttons">
                <button type="button" className="order-plus">+</button>
                <button type="button" className="order-minus">-</button>
              </div>
            </div>
          </div>

          <div className="order-total">
            <p>Total</p>
            <p className="order-total-price">R$ 40,00</p>
          </div>

          <button type="button" className="order-button-buy">
            Comprar
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
