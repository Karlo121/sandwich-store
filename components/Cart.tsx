import React, { createRef } from "react";
import CartCSS from "./Cart.module.css";
import { FiShoppingCart } from "react-icons/fi";
import { AppStateContext } from "./AppState";

interface Props {}

interface State {
  isOpen: boolean;
}

class Cart extends React.Component<Props, State> {
  #containerReference: React.RefObject<HTMLDivElement>;
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.#containerReference = createRef();
  }

  handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  }

  // Close div if clicked outside
  handleOutsideClick = (e: MouseEvent) => {
    if (
      this.#containerReference.current &&
      !this.#containerReference.current.contains(e.target as Node)
    ) {
      this.setState({ isOpen: false });
    }
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideClick);
  }

  render() {
    return (
      <AppStateContext.Consumer>
        {(state) => {
          const itemsCount = state.cart.items.reduce((sum, item) => {
            return sum + item.quantity;
          }, 0);

          return (
            <div
              className={CartCSS.cartContainer}
              ref={this.#containerReference}
            >
              <button
                className={CartCSS.button}
                type="button"
                onClick={this.handleClick}
              >
                <FiShoppingCart />
                {itemsCount < 1 ? (
                  <span>{itemsCount} sandwich</span>
                ) : (
                  <span>{itemsCount} sandwiches</span>
                )}
              </button>
              <div
                className={CartCSS.cartDropDown}
                style={{ display: this.state.isOpen ? "block" : "none" }}
              >
                <ul>
                  {state.cart.items.map((item) => {
                    return (
                      <li key={item.id}>
                        {item.name} &times; {item.quantity}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        }}
      </AppStateContext.Consumer>
    );
  }
}

export default Cart;
