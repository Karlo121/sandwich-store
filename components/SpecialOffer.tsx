import React from "react";
import { Sandwich } from "../types";
import { WithAddToCartProps } from "./AddToCart";
import SpecialOfferCss from "./SpecialOffer.module.css";

interface Props {
  sandwich: Sandwich;
}

const SpecialOffer: React.FC<Props> = ({ sandwich }) => {
  return (
    <div className={SpecialOfferCss.container}>
      <h2>{sandwich.name}</h2>
      <p>{sandwich.description}</p>
      <p>{Math.round(sandwich.price * 0.5)} €</p>
      <WithAddToCartProps>
        {({ addToCart }) => {
          return (
            <button
              type="button"
              onClick={() =>
                addToCart({
                  id: sandwich.id,
                  name: sandwich.name,
                  price: sandwich.price,
                })
              }
            >
              Add to cart
            </button>
          );
        }}
      </WithAddToCartProps>
    </div>
  );
};

export default SpecialOffer;
