import React, { useState } from "react";
import axios from "axios";
// import { useParams } from 'react-router-dom';

import EditMenu from './EditMenu'; // double check to make sure this needed to be done
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  // const params = useParams();

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // const index = () => {
    //   colors.map(id =>{
    //     console.log(id.id);
    //     return id.id;
    //   })
    // }
    console.log(colors[1]);
    axiosWithAuth()
    .put(`/colors/${colorToEdit.id}`, colorToEdit)
    .then(res=>{
      const colorMap = colors.map(color => {
        if (color.id === res.data.id){
          return res.data
        }
        else{
          return color
        }
      })
      updateColors(colorMap);
      console.log(res.data);
      // window.location.href='/bubble'
    })
    .catch(err=>{
      console.log(err);
    })
  };

  const deleteColor = color => {
    console.log(color);
    axiosWithAuth()
    .delete(`/colors/${color.id}`)
    .then(res=>{
      console.log(res.data);
      const RemainingColors = parseInt (res.data, 10)
      const deleteColors = colors.filter((color) => {
        return color.id !==RemainingColors;
      })
      updateColors(deleteColors);
    })
    .catch(err=>{
      console.log(err);
    })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/> }

    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.