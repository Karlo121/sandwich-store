import React from "react";
import sandwiches from "../data/sandwiches.json";
import Sandwich from "./Sandwich";
import AppCSS from "./App.module.css";
import SandwichSVG from "../svg/sandwich.svg";
import Cart from "./Cart";
import AppStateProvider from "./AppState";
import SpecialOffer from "./SpecialOffer";

const App = () => {
  const specialOfferSandwich = sandwiches.find(
    (sandwich) => sandwich.specialOffer
  );

  return (
    <AppStateProvider>
      <div className={AppCSS.container}>
        <div className={AppCSS.header}>
          <SandwichSVG width={120} height={120} />
          <div className={AppCSS.siteTitle}>Sandwich Store</div>
          <Cart />
        </div>
        <ul className={AppCSS.sandwichList}>
          {specialOfferSandwich && (
            <SpecialOffer sandwich={specialOfferSandwich} />
          )}
          {sandwiches.map((sandwich) => {
            return <Sandwich key={sandwich.id} sandwich={sandwich} />;
          })}
        </ul>
      </div>
    </AppStateProvider>
  );
};

export default App;
