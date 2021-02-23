import React from "react";
import { Sandwich } from "../types";
import { useAddToCart } from "./AddToCart";
import SandwichCSS from "./Sandwich.module.css";

interface Props {
  sandwich: Sandwich;
}

const SandwichItem: React.FC<Props> = ({ sandwich }) => {
  const addToCart = useAddToCart();
  const handleAddToCartClick = () => {
    addToCart({ id: sandwich.id, name: sandwich.name, price: sandwich.price });
  };
  return (
    <li className={SandwichCSS.container}>
      <h2>{sandwich.name}</h2>
      <p>{sandwich.description}</p>
      <p>{sandwich.price} €</p>
      <button type="button" onClick={handleAddToCartClick}>
        Add to cart
      </button>
    </li>
  );
};

export default SandwichItem;
