import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000";

function CitiesProvider({ children }) {
  const [cities, setCitites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentcity] = useState({});

  useEffect(function () {
    async function fetchCitites() {
      try {
        // setIsLoading(true);

        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCitites(data);
      } catch {
        alert("there was an error in loading data..");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCitites();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentcity(data);
    } catch {
      alert("there was an errror while loading (getcity) ");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCitites((cities) => [...cities, data]);
    } catch {
      alert("there was an errror while creating the city ");
    } finally {
      setIsLoading(false);
    }
  }
  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      setCitites((cities) => cities.filter((city) => city.id !== id));
    } catch {
      alert("there was an errror while deleting the city ");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("city context used outside the provider");
  return context;
}

export { CitiesProvider, useCities };
