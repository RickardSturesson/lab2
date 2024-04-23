import React from "react";
import ReactDOM from "react-dom";

function Welcome(props) {
  return (
    <div>
      <h1>Hello, {props.name}</h1>
      <p>Todays subject is: {props.subject}</p>
    </div>
  );
}

function ListItem({ text }) {
  return <li>{text}</li>;
}

function List() {
  const items = ["Item 1", "Item 2", "Item 3"];

  return (
    <div>
      <h2>Lista med React</h2>
      <ul>
        {items.map((item, index) => (
          <ListItem key={index} text={item} />
        ))}
      </ul>
    </div>
  );
}

const element = <Welcome name="Kenneth" subject="math" />;
ReactDOM.render(element, document.getElementById("index"));

ReactDOM.render(<List />, document.getElementById("list"));