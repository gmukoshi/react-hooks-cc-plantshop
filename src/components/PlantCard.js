import React from "react";

function PlantCard({ plant, onDeletePlant, onUpdateStock }) {
  const { id, name, image, price, inStock } = plant;

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {inStock ? (
        <button className="primary" onClick={() => onUpdateStock(plant)}>
          In Stock
        </button>
      ) : (
        <button onClick={() => onUpdateStock(plant)}>Out of Stock</button>
      )}
      <button className="delete" onClick={() => onDeletePlant(id)}>
        X
      </button>
    </li>
  );
}

export default PlantCard;
