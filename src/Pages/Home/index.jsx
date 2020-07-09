import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';
import './index.css';

import Card from '../../Components/Card';
import ShoppingCart from '../../Components/ShoppingCart';
import Modal from '../../Components/Modal';

const Home = () => {
  const [pokemon, setPokemon] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getPokemonData(page);
  }, []);

  useEffect(() => {
    const localShoppingCart = JSON.parse(getLocalStorageShoppingCart());
    if (localShoppingCart) {
      setShoppingCart(localShoppingCart);
      setTotal(calculateTotal(localShoppingCart));
    }
  }, []);

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [page]);

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
      shoppingCart[orderIndex].quantity += 1;
      const totalPrice = calculateTotal(shoppingCart);
      setTotal(totalPrice);
      setLocalStorageShoppingCart(shoppingCart);
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
    setLocalStorageShoppingCart(newShoppingCart);
  };

  const calculateTotal = (orders) => {
    const sum = (acumulator, nextElement) => (
      acumulator + (nextElement.price * nextElement.quantity)
    );
    return orders.reduce(sum, 0);
  };

  const filterPokemonOrder = (id) => {
    return shoppingCart.findIndex((element) => (element.id === id));
  };

  const plusPokemonOrderQuantity = (id) => {
    const orderIndex = filterPokemonOrder(id);
    const newShoppingCart = shoppingCart;

    newShoppingCart[orderIndex].quantity += 1;
    const totalPrice = calculateTotal(newShoppingCart);
    setShoppingCart(newShoppingCart);
    setTotal(totalPrice);
    setLocalStorageShoppingCart(newShoppingCart);
  };

  const minusPokemonOrderQuantity = (id) => {
    const orderIndex = filterPokemonOrder(id);
    const newShoppingCart = shoppingCart;

    if (newShoppingCart[orderIndex].quantity === 1) {
      removePokemonOrder(newShoppingCart[orderIndex].id);
      return;
    }

    newShoppingCart[orderIndex].quantity -= 1;
    const totalPrice = calculateTotal(newShoppingCart);
    setShoppingCart(newShoppingCart);
    setTotal(totalPrice);
    setLocalStorageShoppingCart(newShoppingCart);
  };

  const removePokemonOrder = (id) => {
    const newShoppingCart = shoppingCart.filter((order) => (order.id !== id));
    const totalPrice = calculateTotal(newShoppingCart);
    setShoppingCart(newShoppingCart);
    setTotal(totalPrice);
    setLocalStorageShoppingCart(newShoppingCart);
  };

  const endShopping = () => {
    setShoppingCart([]);
    setLocalStorageShoppingCart([]);
    setTotal(0);
    setShowModal(true);
  };

  const setLocalStorageShoppingCart = (newShoppingCart) => {
    localStorage.setItem('pokemonShoppingCart', JSON.stringify(newShoppingCart));
  };

  const getLocalStorageShoppingCart = () => {
    const local = localStorage.getItem('pokemonShoppingCart');

    if (local) {
      return local;
    }

    return null;
  };

  const hideModal = () => {
    setShowModal(false);
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

        <ShoppingCart
          orders={shoppingCart}
          total={total}
          minusPokemonOrderQuantity={minusPokemonOrderQuantity}
          plusPokemonOrderQuantity={plusPokemonOrderQuantity}
          endShopping={endShopping}
        />

        {showModal && <Modal hideModal={() => hideModal} />}
      </main>
    </div>
  );
};

export default Home;
