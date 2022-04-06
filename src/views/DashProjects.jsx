import React, { useState, useRef, useEffect } from "react";

import Modal from "@mui/material/Modal";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DescriptionIcon from "@mui/icons-material/Description";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FileUpload from "react-material-file-upload";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ViewListIcon from "@mui/icons-material/ViewList";

import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";

import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";

import ClearAllIcon from "@mui/icons-material/ClearAll";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import BlenderIcon from "@mui/icons-material/Blender";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AssistantIcon from "@mui/icons-material/Assistant";
import Htext from "../components/subComponents/Htext";
import Product from "../components/Product";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { NewProduct } from "..//firebase";

import {
  signinwithgoogle,
  database,
  logoutwithgoogle,
  auth,
  writeUserData,
  getUserData,
  ref,
  set,
  get,
  onValue,
  uploadImage,
} from "../firebase";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const DashProjects = (props) => {
  const [products, setProducts] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;
  const [catagory, setCatagory] = React.useState("");
  const handleChange = (event) => {
    setCatagory(event.target.value);
  };

  const title = useRef(null);
  const disc = useRef(null);
  const price = useRef(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [files, setFiles] = React.useState([]);

  const handleCreatProduct = () => {
    console.log("the data is : " + JSON.stringify(files[0]));
    NewProduct(
      user.uid,
      title.current.value,
      disc.current.value,
      files[0],
      catagory,
      price.current.value
    );
  };

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

  useEffect(() => {
    const starCountRef = ref(database, "products/" + user.uid);
    onValue(starCountRef, async (snapshot) => {
      console.log("the data is : " + snapshot.val());
      setProducts(Object.values(snapshot.val()));
    });
  });

  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>
      <div className="w-full pl-[160px] pt-14 overflow-hidden bg-slate-100 h-screen">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="w-full h-full grid place-items-center z-[999999] ">
            <div className="w-[90%] relative max-w-[1000px] overflow-hidden bg-white h-[90%] max-h-[1000px] shadow-md flex-row  bg-slate-100 ">
              <CloseIcon
                onClick={handleClose}
                className="cursor-pointer absolute m-3 right-0 z-50 "
              ></CloseIcon>
              <div className="w-full h-[50px]  border-b-2 border-slate-200 relative flex bg-white">
                <h1 className="h-full place-content-center place-items-center w-[400px] text-slate-800 font-semibold relative flex ">
                  Create New Product
                  <div className="w-[100px] bg-purple-600 pl-5 ml-20 text-white py-1 font-bold rounded-md">
                    <button onClick={handleCreatProduct}>Create</button>
                  </div>
                </h1>
              </div>

              <main className="w-full  pt-2 max-h-full h-full overflow-y-scroll pb-[50px]">
                <section className="w-[98%] h-[50px] bg-white mx-auto rounded-md shadow-sm relative mb-2 flex">
                  <div className="h-full w-[50px] bg-indigo-600 grid place-items-center text-white">
                    <DriveFileRenameOutlineIcon />
                  </div>
                  <div className="flex-1 ">
                    <input
                      ref={title}
                      className="w-[90%] h-full pl-5 outline-none border-none "
                      placeholder="Enter a Title"
                    />
                  </div>
                </section>

                <section className="w-[98%] min-h-[100px] h-auto bg-white mx-auto rounded-md shadow-sm relative mb-2 flex">
                  <div className="min-h-full w-[50px] bg-indigo-600 grid place-items-center text-white">
                    <LightbulbIcon />
                  </div>
                  <div className="flex-1 ">
                    <textarea
                      ref={disc}
                      className="min-w-[99%] h-full pt-2 pl-5 outline-none border-none "
                      placeholder="Description"
                    />
                  </div>
                </section>

                <section className="w-[98%] min-h-[50px] h-auto bg-white mx-auto rounded-md shadow-sm relative mb-2 flex">
                  <div className="min-h-full w-[50px] bg-indigo-600 grid place-items-center text-white">
                    <MonetizationOnIcon />
                  </div>
                  <div className="flex-1 ">
                    <input
                      ref={price}
                      type="number"
                      className="min-w-[99%] h-full  pl-5  outline-none border-none "
                      placeholder="price"
                    />
                  </div>
                </section>

                <section className="w-[98%] min-h-[50px] h-auto bg-white mx-auto rounded-md shadow-sm relative mb-2 flex">
                  <div className="min-h-full w-[50px] bg-indigo-600 grid place-items-center text-white">
                    <ViewListIcon />
                  </div>
                  <div className="flex-1 ">
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <Select
                        value={catagory}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-full"
                      >
                        {Catagories.map((c) => {
                          return (
                            <MenuItem value={c.title}>
                              <div className="flex space-x-2 text-slate-500 text-sm">
                                {c.icon} <div className="px-2">{c.title}</div>
                              </div>
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                </section>

                <section className="w-[98%] min-h-[50px] h-auto bg-white mx-auto rounded-md shadow-sm relative mb-2 flex">
                  <div className="min-h-full w-[50px] bg-indigo-600 grid place-items-center text-white">
                    <DescriptionIcon />
                  </div>
                  <div className="flex-1 h-auto ">
                    <div className=" w-full h-full">
                      <div className="">
                        <FileUpload
                          buttonProps={{
                            class:
                              "text-white hover:shadow-md shadow-sm px-5 py-2 rounded-md  bg-pink-600",
                          }}
                          title="drag and drop a file , or click upload to select one "
                          value={files}
                          maxFiles={1}
                          accept={[".png", ".jpg", ".jpeg"]}
                          onChange={setFiles}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </main>
            </div>
          </div>
        </Modal>

        <div className="w-full h-[50px]  border-b-2 border-slate-200 relative flex bg-white">
          <h1 className="h-full grid place-items-center w-[100px] text-slate-800 font-semibold relative ">
            Products
          </h1>
          <div className="absolute right-2 h-full ">
            <h1 className="max-w-auto h-[90%] flex space-x-2 place-items-center text-indigo-600 pr-5 cursor-pointer pt-2">
              <AddCircleIcon />
              <div onClick={handleOpen} className="text-sm">
                New Product
              </div>
            </h1>
          </div>
        </div>

        <main className="w-full h-auto pt-2 bg-slate-100  max-h-full h-[calc(100%-90px)] overflow-y-scroll">
          {products.map((p) => {
            return (
              <section className="w-[98%] h-[150px] bg-white mx-auto rounded-md shadow-sm relative mb-2 flex">
                <div className="w-[250px] h-[150px] grid place-items-center ">
                  <div className="h-[130px]  w-[90%] rounded-md bg-indigo-600 ">
                    <img
                      src={p.cover}
                      className="w-full h-full max-h-full rounded-md"
                    />
                  </div>
                </div>
                <div className="flex-1 p-2 pt-4 px-4">
                  <h1 className="font-bold text-slate-700 mb-2 ma line-clamp-1">
                    {p.name}
                  </h1>
                  <h6 className="text-sm text-indigo-600 pb-1 line-clamp-1">
                    {p.catagory}
                  </h6>
                  <p className="text-slate-500 text-sm line-clamp-3 ">
                    {p.description}
                  </p>
                </div>
                <div className="w-[300px]  grid place-items-center">
                  <div className="h-[80%]  grid place-items-center w-full border-l-2">
                    <h1 className="font-bold text-indigo-600 text-4xl">
                      {p.price} $
                    </h1>
                  </div>
                </div>
              </section>
            );
          })}
        </main>
      </div>
    </>
  );
};

export default DashProjects;
