import React, { Fragment } from "react";
// import "./Button.css";

interface Props {
  id: string;
  matType: string;
  matClass: string;
  handleClick: () => void;
}
const MatButton: React.FC<Props> = (props) => {
  return (
    <Fragment>
      <span id={props.id} className={props.matClass} onClick={props.handleClick}>
        {props.matType}
      </span>
    </Fragment>
  );
};

export default MatButton;
