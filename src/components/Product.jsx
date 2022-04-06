import React from "react";

import StarsIcon from "@mui/icons-material/Stars";
import LocalMallIcon from "@mui/icons-material/LocalMall";

import { getAuth } from "firebase/auth";

import { database, ref, set } from "../firebase";

const Product = (props) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const Buy = async () => {
    console.log("buy !!");
    const carteid =
      Date.now().toString(36) + Math.random().toString(36).substr(2);

    set(ref(database, "carte/" + user.uid + "/" + carteid + "/"), {
      uid: user.uid,
      carteid: carteid,
      data: {
        name: props.name,
        cover: props.img,
        price: props.price,
      },
    });
  };

  return (
    <div className="cursor-pointer my-2 mx-2 font-bold relative overflow-hidden text-md text-slate-700 rounded-lg w-[200px] h-[250px] min-w-[230px] bg-white ">
      <div className="absolute h-full w-full bg-white/0 z-[2] ">
        <div className="h-[150px] bg-trensparent ">
          <StarsIcon className="absolute right-2 top-2 text-white cursor-pointer" />
        </div>
        <div className="h-[100px]  absolute b-0 bg-blue-600/0 w-full ">
          <div className="w-full">
            <h6 className="text-sm font-normal text-slate-700 p-2 relative top-2">
              {props.name}
            </h6>
          </div>

          <div className="w-full flex absolute  bottom-0">
            <h4 className="font-bold text-lime-600 text-md font-bold relative left-2 bottom-2">
              {props.price} $
            </h4>
            <div className="absolute right-2 bottom-2" onClick={Buy}>
              <LocalMallIcon className="text-slate-200" />
            </div>
          </div>
        </div>
      </div>
      <img
        className="w-full h-[150px] relative z-[1] "
        alt="product"
        src={props.img}
      />
    </div>
  );
};

export default Product;
