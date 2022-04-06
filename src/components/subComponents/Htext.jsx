import React from "react";

const Htext = (props) => {
  return (
    <div className="py-5 font-bold text-md text-blue-500 pb-5">
      <h1 className="flex space-x-3">
        {props.icon}
        <div className="text-slate-500">{props.title}</div>
      </h1>
    </div>
  );
};

export default Htext;
