"use client"; // This is a client component 👈🏽

import { useState } from "react";

const initialTodos = [
  {
    type: "Fruit",
    name: "Apple",
  },
  {
    type: "Vegetable",
    name: "Broccoli",
  },
  {
    type: "Vegetable",
    name: "Mushroom",
  },
  {
    type: "Fruit",
    name: "Banana",
  },
  {
    type: "Vegetable",
    name: "Tomato",
  },
  {
    type: "Fruit",
    name: "Orange",
  },
  {
    type: "Fruit",
    name: "Mango",
  },
  {
    type: "Fruit",
    name: "Pineapple",
  },
  {
    type: "Vegetable",
    name: "Cucumber",
  },
  {
    type: "Fruit",
    name: "Watermelon",
  },
  {
    type: "Vegetable",
    name: "Carrot",
  },
];

export default function Home() {
  const [todos, setTodos] = useState(initialTodos);
  const [fruitTodos, setFruitTodos] = useState([]);
  const [vegetableTodos, setVegetableTodos] = useState([]);

  const handleClick = (item, index, isMainList) => {
    if (isMainList) {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);

      const targetList = item.type === "Fruit" ? fruitTodos : vegetableTodos;
      const setTargetList =
        item.type === "Fruit" ? setFruitTodos : setVegetableTodos;

      setTargetList([...targetList, item]);

      setTimeout(() => {
        setTargetList((current) => {
          const itemIndex = current.findIndex((i) => i.name === item.name);
          if (itemIndex > -1) {
            const updatedList = current.filter((_, idx) => idx !== itemIndex);

            setTodos((prevTodos) => {
              const isAlreadyAdded = prevTodos.some(
                ({ name }) => name === item.name
              );
              return isAlreadyAdded ? prevTodos : [...prevTodos, item];
            });

            return updatedList;
          }
          return current;
        });
      }, 5000);
    } else {
      const setTargetList =
        item.type === "Fruit" ? setFruitTodos : setVegetableTodos;

      setTargetList((current) => current.filter((_, idx) => idx !== index));
      setTodos((prevTodos) => [...prevTodos, item]);
    }
  };

  return (
    <div
      className="flex justify-center items-start space-x-4 p-4 bg-white text-gray-800"
      style={{ height: "100vh" }}
    >
      <div className="w-1/3 bg-white p-2 shadow" style={{ overflowY: "auto" }}>
        <table className="w-full">
          <tbody>
            {todos.map((item, index) => (
              <tr key={index} onClick={() => handleClick(item, index, true)}>
                <td className="px-4 py-2 border cursor-pointer">{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className="w-1/3 bg-white shadow"
        style={{ overflowY: "auto", height: "100%" }}
      >
        <h2 className="text-lg font-bold mb-4 bg-gray-200 p-2">Fruits</h2>
        <table className="w-[95%] mx-auto">
          <tbody className="p-2">
            {fruitTodos.map((item, index) => (
              <tr key={index} onClick={() => handleClick(item, index, false)}>
                <td className="px-4 py-2 border cursor-pointer">{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className="w-1/3 bg-white shadow"
        style={{ overflowY: "auto", height: "100%" }}
      >
        <h2 className="text-lg font-bold mb-4 bg-gray-200 p-2">Vegetables</h2>
        <table className="w-[95%] mx-auto">
          <tbody>
            {vegetableTodos.map((item, index) => (
              <tr key={index} onClick={() => handleClick(item, index, false)}>
                <td className="px-4 py-2 border cursor-pointer">{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
