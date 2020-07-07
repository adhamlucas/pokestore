import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';
import './index.css';

// import CardItem from '../../Components/old/CardItem';
import Card from '../../Components/Card';
import ShoppingCart from '../../Components/ShoppingCart';

const Home = () => {
  const [pokemon, setPokemon] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getPokemonData(page);
  }, []);

  const getPokemonData = async (pageNumber) => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${pageNumber}&limit=20`);
    await getPokemon(data.results);
    setLoading(false);
  };

  const getPokemon = async (pokeData) => {
    const pokemonData = await Promise.all(pokeData.map(async (item) => {
      const { data } = await axios.get(item.url);
      const poke = {
        id: data.id,
        name: data.name,
        price: generatePrice(data.height, data.weight),
        image: `https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`,
      };

      return poke;
    }));
    console.log(pokemonData);
    setPokemon(pokemonData);
  };

  const nextPage = () => {
    setLoading(true);
    const pageNumber = page + 20;
    getPokemonData(pageNumber);
    setPage(pageNumber);
    setLoading(false);
  };

  const previousPage = () => {
    setLoading(true);
    const pageNumber = (page - 20) < 0 ? 0 : (page - 20);
    getPokemonData(pageNumber);
    setPage(pageNumber);
    setLoading(false);
  };

  const generatePrice = (height, weight) => (height + weight);

  const buyItem = (id, name, price, image) => {
    const orderIndex = filterPokemonOrder(id);

    if (orderIndex >= 0) {
      const newShoppingCart = shoppingCart;
      newShoppingCart[orderIndex].quantity += 1;
      // newShoppingCart[orderIndex].price = price * newShoppingCart[orderIndex].quantity;
      setShoppingCart(newShoppingCart);
      const totalPrice = calculateTotal(newShoppingCart);
      setTotal(totalPrice);
      return;
    }

    const order = {
      id,
      name,
      price,
      image,
      quantity: 1,
    };

    const newShoppingCart = [...shoppingCart, order];
    const totalPrice = calculateTotal(newShoppingCart);
    setTotal(totalPrice);
    setShoppingCart(newShoppingCart);

    // // let shopping = localStorage.getItem('shoppingCart');

    // // if (shopping == null) {
    // //   const test = {
    // //     shopping: {},
    // //   };

    // //   test['shopping'][id] = {
    // //     name,
    // //     price,
    // //     image,
    // //     quantity: 1,
    // //   };

    // //   localStorage.setItem('shoppingCart', JSON.stringify(test));
    // //   console.log("hello");

    // //   return;
    // }

    // shopping = JSON.parse(shopping);

    // shopping['shopping'][id] = {
    //   name,
    //   price,
    //   image,
    //   quantity: 1,
    // };

    // localStorage.setItem('shoppingCart', JSON.stringify(shopping));
  };

  const calculateTotal = (orders) => {
    const sum = (acumulator, nextElement) => (acumulator + (nextElement.price * nextElement.quantity));
    return orders.reduce(sum, 0);
  };

  const filterPokemonOrder = (id) => {
    return shoppingCart.findIndex((element) => (element.id === id));
  };

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
          {loading ? <></> : (pokemon.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
              clickBuyItem={buyItem}
            />
          )))}


          <div className="pagination-container">
            <button onClick={() => previousPage()} type="button">Anterior</button>
            <button onClick={() => nextPage()} type="button">Próxima</button>
          </div>
        </div>

        <ShoppingCart orders={shoppingCart} total={total} />

      </main>
    </div>
  );
};

export default Home;
