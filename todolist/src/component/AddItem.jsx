import React from "react";
import classes from "./AddItem.module.css";

const BlockItem = props => {
  return (
    <li className={classes.toDoItem}>
      <div className={props.ifChecked === true ?
                      classes.checkedText
                      :classes.toDoItemText}>
          {props.text}
      </div>
      <div className={props.ifChecked === true ?
                       classes.checked
                       :classes.toDoItemCheck}
            onClick={() => props.check(props)}>
      </div>
      <div className={classes.toDoItemDelete}
           onClick={() => props.delete(props)}
      ></div>
    </li>
  );
};
export default BlockItem;
