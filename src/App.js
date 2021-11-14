import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import "./App.css";
import Header from "./components/Header/Header";
import Card from "./components/Card/Card";
import { getCard, addTaskToCard } from "./services/taskService";

function App() {
  const [card, setCard] = useState([]);
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [itemCopy, setItemCopy] = useState({});
  const [checkCopy, setCheckCopy] = useState(false);

  // FETCH CARD DATA WHEN RENDER VIEW
  useEffect(() => {
    getCard().then((response) => {
      setCard(response.map((el) => el));
    });
  }, []);

  // GET COPY ITEM FOR DELETING AND ADDING
  useEffect(() => {
    if (checkCopy === true) {
      addTaskToCard(itemCopy, destination);
    }
    // eslint-disable-next-line
  }, [checkCopy]);

  const onDragEnd = async ({ destination, source }) => {
    if (!destination) return;
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return;

    console.log("from ", source);
    setSource(source);
    console.log("to ", destination);
    setDestination(destination);

    // setCard((prev) => {
    //   // Remove Item when user drag away
    //   prev.forEach(async (el) => {
    //     if (el.id === source.droppableId) {
    //       el.items.splice(source.index, 1);
    //     }
    //   });

    //   // Add Item into droppable column
    //   prev.forEach((el) => {
    //     if (el.id === destination.droppableId) {
    //       el.items.splice(destination.index, 0, itemCopy);
    //     }
    //   });
    //   return prev;
    // });
  };

  return (
    <div className="App">
      <Header />
      <div className="content">
        <DragDropContext onDragEnd={onDragEnd}>
          {/* {console.log("card: ", card)} */}
          {card.map((data, index) => (
            <div key={index} className="card">
              <Card
                getItemCopy={(item) => setItemCopy(item)}
                card={data}
                source={source}
                destination={destination}
                setCheckCopy={(item) => setCheckCopy(item)}
              />
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
