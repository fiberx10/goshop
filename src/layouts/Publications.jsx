import React, { useEffect, useState } from "react";

import Header from "../components/Header";

import ClearAllIcon from "@mui/icons-material/ClearAll";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import BlenderIcon from "@mui/icons-material/Blender";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AssistantIcon from "@mui/icons-material/Assistant";
import Htext from "../components/subComponents/Htext";
import Product from "../components/Product";

import testimg from "..//assets/tests/product.jpg";

//
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";

import SearchIcon from "@mui/icons-material/Search";
import hero from "..//assets/hero.png";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";

import { getAuth } from "firebase/auth";

import { database, ref, onValue } from "../firebase";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Catagories = [
  {
    title: "All",
    icon: <ClearAllIcon />,
  },
  {
    title: "Cloths",
    icon: <CheckroomIcon />,
  },
  {
    title: "Sport",
    icon: <SportsFootballIcon />,
  },
  {
    title: "School subjects",
    icon: <HistoryEduIcon />,
  },
  {
    title: "Electrics",
    icon: <ElectricalServicesIcon />,
  },
  {
    title: "Food",
    icon: <FastfoodIcon />,
  },
  {
    title: "Home Devices",
    icon: <BlenderIcon />,
  },
];

const Publications = () => {
  const [catagory, setCatagory] = useState("All");
  const [search, setSearch] = useState("");

  const [products, setProducts] = useState([]);
  const [carte, setCarte] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;
  useEffect(() => {
    const starCountRef = ref(database, "products");

    if (user) {
      const carteRef = ref(database, "carte" + "/" + user.uid);

      onValue(carteRef, (snapshot) => {
        setCarte(Object.values(snapshot.val()));
        console.log("the cards are :: " + Object.values(snapshot.val()));
      });
    }

    onValue(starCountRef, async (snapshot) => {
      // setProducts([]) ;
      // console.log("the data is : " + JSON.stringify(Object.values(Object.values(snapshot.val())[0])[0]));
      var res = [];

      for (var i = 0; i < Object.values(snapshot.val()).length; i++) {
        for (
          var j = 0;
          j < Object.values(Object.values(snapshot.val())[i]).length;
          j++
        ) {
          res = [...res, Object.values(Object.values(snapshot.val())[i])[j]];
        }
      }

      res = res.filter((r) => {
        return r;
      });

      // filter by catagory
      res = res.filter((f) => {
        if (catagory !== "All") {
          return f.catagory === catagory;
        } else {
          return f;
        }
      });

      // filter by search

      res = res.filter((f) => {
        return f.name.toUpperCase().search(search.toUpperCase()) !== -1;
      });

      console.log("the res after : ", res);
      setProducts(res);
    });
  }, [user, catagory, search]);

  function handleChangeCatagory(name) {
    console.log("the name : " + name);
    setCatagory(name);
  }

  return (
    <div>
      <Header />

      <div className="h-screen  w-sreen flex pt-[50px] bg-slate-100">
        <div className="h-[95%] mt-[1%] rounded-lg bg-white shadow-lg w-[200px]  ml-2  ">
          <h1 className="w-full grid place-items-center text-md py-3 text-white rounded-t-md border-b-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
            Catagories
          </h1>
          <div className="w-full px-2  h-60">
            {Catagories.map((c) => {
              return (
                <div
                  className={
                    catagory == c.title
                      ? "w-full text-indigo-500 space-x-2 cursor-pointer"
                      : "cursor-pointer w-full text-slate-500 space-x-2"
                  }
                  onClick={() => {
                    handleChangeCatagory(c.title);
                  }}
                >
                  <div className="w-[90%] flex py-2 pl-1">
                    {c.icon} <div className="pl-2">{c.title} </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 p-5 pt-4 overflow-x-hidden relative">
          <header
            className={
              "w-full mb-8 flex animate-movecolor place-items-center bg-[length:400%_400%]  h-[50vh] overflow-hidden bg-gradient-to-r from-purple-500 via-purple-500 to-pink-500 "
            }
          >
            <h1 className="h-full text-center grid place-items-center flex-1 px-20 leading-20 ">
              <div>
                <h1 className="text-white font-bungee text-3xl">
                  Welcome to GOSHOP
                </h1>

                <p className="text-md text-slate-200 py-2">
                  the first online shop in morocco
                </p>
              </div>
            </h1>
            <div className="h-full grid place-items-start w-[40%]">
              <img src={hero} className="w-[200px] pt-10 z-[0]	animate-wiggle" />
            </div>
          </header>

          <div className="w-[350px] fixed top-[70px] z-[9] pl-1">
            <div className="h-[40px] sticky w-full static  z-[9] flex  bg-white shadow-lg shadow-pink-600/5 rounded-md">
              <div className="h-full w-[40px] grid place-items-center ">
                <SearchIcon className="text-purple-500"> </SearchIcon>
              </div>
              <div className="flex-1 h-[40px]  grid place-items-start  ">
                <input
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  className="w-[80%] h-full outline-none placeholder:text-sm placeholder:text-pink-400 text-slate-600 "
                  placeholder="Where is my publication ?"
                />
              </div>
            </div>
          </div>

          <div >
            <Htext
              icon={<LocalFireDepartmentIcon></LocalFireDepartmentIcon>}
              title="Most Viewed"
            ></Htext>
            <div className="flex">
              {products.map((p) => {
                return (
                  <Product
                    data={() => p}
                    name={p.name}
                    img={p.cover}
                    price={p.price}
                  />
                );
              })}
            </div>

          
          </div>
        </div>
        <div className="h-[95%] mt-[1%] rounded-lg bg-white shadow-lg w-[200px]  mr-2  ">
          <h1 className="w-full flex place-content-center place-items-center text-md py-3 text-white rounded-t-md border-b-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
            <ShoppingCartIcon className="mx-2" /> My Card
          </h1>
          <div className="w-full px-2  h-[calc(100%-60px)] py-2 overflow-y-scroll">
            {carte.map((c) => {
              return (
                <div className="w-full h-[60px]  py-1">
                  <div className="w-[90%] h-[90%] bg-white flex ">
                    <img
                      src={c.data.cover}
                      className="w-[50%] max-w-[50px] h-full border-2 border-slate-200 rounded-md"
                    ></img>
                    <div className="grid place-items-start pl-2 text-purple-600 h-full w-full">
                      <p className=" p-0 w-full grid text-sm place-items-start text-slate-600 line-clamp-1">
                        {c.data.name}
                      </p>
                      <div className="text-lime-600 text-bold">
                        {c.data.price}$
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publications;
