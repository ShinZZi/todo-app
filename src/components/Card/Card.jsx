import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "../Task/Task";
import "./Card.css";
import { CircularProgress, Box } from "@mui/material";

function Card(props) {
  const { data } = props;
  const [card, setCard] = useState([]);

  useEffect(() => {
    var intervalID = setInterval(() => {
      if (data.items !== undefined) {
        setCard(data);
        clearInterval(intervalID);
      }
    }, 1000);
    // eslint-disable-next-line
  }, [data]);

  return (
    <>
      <div className="card-title">
        <h2>{card.title}</h2>
      </div>
      {card.items !== undefined ? (
        <Droppable droppableId={data.id}>
          {(provided) => {
            return (
              <div
                className="card-body"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {card.items.map((item, index) => (
                  <div key={index} className="card-task">
                    <Task item={item} index={index} />
                  </div>
                ))}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      ) : (
        <Box sx={{ display: "flex", margin: "auto" }}>
          <CircularProgress color="#2c3e50" />
        </Box>
      )}
    </>
  );
}

export default Card;
