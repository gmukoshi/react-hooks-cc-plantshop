import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then(setPlants)
      .catch((error) => {
        console.error("Error fetching plants:", error);
        setError(error.message);
      });
  }, []);

  function handleAddPlant(newPlant) {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(newPlant),
    })
      .then((r) => r.json())
      .then((addedPlant) => setPlants((plants) => [...plants, addedPlant]))
      .catch((error) => {
        console.error("Error adding plant:", error);
        setError(error.message);
      });
  }

  function handleDeletePlant(id) {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    })
      .then(() => setPlants((plants) => plants.filter((p) => p.id !== id)))
      .catch((error) => {
        console.error("Error deleting plant:", error);
        setError(error.message);
      });
  }

  function handleUpdateStock(plant) {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({ inStock: !plant.inStock }),
    })
      .then((r) => r.json())
      .then((updatedPlant) => {
        const updatedPlants = plants.map((p) =>
          p.id === updatedPlant.id ? updatedPlant : p
        );
        setPlants(updatedPlants);
      })
      .catch((error) => {
        console.error("Error updating stock:", error);
        setError(error.message);
      });
  }

  const displayedPlants = plants.filter((plant) => {
    return plant.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      {error && <div style={{ color: "red", padding: "10px" }}>Error: {error}</div>}
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList
        plants={displayedPlants}
        onDeletePlant={handleDeletePlant}
        onUpdateStock={handleUpdateStock}
      />
    </main>
  );
}

export default PlantPage;
