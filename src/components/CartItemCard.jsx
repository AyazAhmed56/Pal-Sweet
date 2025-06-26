import React from "react";
import { Button } from "./ui/button";

const CartItemCard = ({ item, onAddToCart }) => {
  return (
    <div>
      <div className=" w-full bg-white p-1">
        <Button onClick={() => onAddToCart(item)} className="w-full">
          Add To Cart
        </Button>
      </div>
    </div>
  );
};

export default CartItemCard;
