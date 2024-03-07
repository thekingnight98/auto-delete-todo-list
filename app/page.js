"use client"; // This is a client component 👈🏽

import { useState } from 'react';

const initialTodos =     [
  {
      type: 'Fruit',
      name: 'Apple',
  },
  {
      type: 'Vegetable',
      name: 'Broccoli',
  },
  {
      type: 'Vegetable',
      name: 'Mushroom',
  },
  {
      type: 'Fruit',
      name: 'Banana',
  },
  {
      type: 'Vegetable',
      name: 'Tomato',
  },
  {
      type: 'Fruit',
      name: 'Orange',
  },
  {
      type: 'Fruit',
      name: 'Mango',
  },
  {
      type: 'Fruit',
      name: 'Pineapple',
  },
  {
      type: 'Vegetable',
      name: 'Cucumber',
  },
  {
      type: 'Fruit',
      name: 'Watermelon',
  },
  {
      type: 'Vegetable',
      name: 'Carrot',
  },
]

export default function Home() {
    const [todos, setTodos] = useState(initialTodos);
    const [fruitTodos, setFruitTodos] = useState([]);
    const [vegetableTodos, setVegetableTodos] = useState([]);

    const handleClick = (item, index, isMainList) => {
      if (isMainList) {
          // ลบ item ออกจาก mainlist
          const newTodos = [...todos];
          newTodos.splice(index, 1);
          setTodos(newTodos);
    
          // กำหนดรายการเป้าหมายตามประเภทของ item
          const targetList = item.type === 'Fruit' ? fruitTodos : vegetableTodos;
          const setTargetList = item.type === 'Fruit' ? setFruitTodos : setVegetableTodos;
    
          // เพิ่ม item ลงในlist เป้าหมาย
          setTargetList([...targetList, item]);
    
          // ตั้งเวลาเพื่อย้าย item กลับไปยัง mainlist
          setTimeout(() => {
              setTargetList(current => {
                  const itemIndex = current.findIndex(i => i.name === item.name);
                  if (itemIndex > -1) {
                      // ลบ item ออกจากรายการเป้าหมาย
                      return current.filter((_, idx) => idx !== itemIndex);
                  }
                  return current;
              });
              // เพิ่ม item กลับเข้าไปใน mainlist
              setTodos(prevTodos => [...prevTodos, item]);
          }, 5000);
      } else {
          // สำหรับ item ที่คลิกในรายการผลไม้หรือผัก, ย้ายกลับไปยังรายการหลักทันที
          const setTargetList = item.type === 'Fruit' ? setFruitTodos : setVegetableTodos;
    
          setTargetList(current => current.filter((_, idx) => idx !== index));
          setTodos(prevTodos => [...prevTodos, item]);
      }
    };
    

    return (
      <div className="flex justify-center items-start space-x-4 p-4 bg-white text-gray-800" style={{ height: '100vh' }}>
          <div className="w-1/3 bg-white p-2 shadow" style={{ overflowY: 'auto' }}>
              {/* <h2 className="text-lg font-bold mb-4 bg-gray-200 p-2">All Items</h2> */}
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
          <div className="w-1/3 bg-white shadow" style={{ overflowY: 'auto', height: '100%' }}>
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
          <div className="w-1/3 bg-white shadow" style={{ overflowY: 'auto', height: '100%' }}>
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
