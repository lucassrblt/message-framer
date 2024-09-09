import { CircleUserRound, Phone, MessagesSquare, Settings, Ellipsis   } from 'lucide-react';
import React, { useState } from 'react';
import { color, motion } from 'framer-motion';
import { NavbarContextProvider, useNavbarContext } from './context/NavbarContext';
import tif from "./assets/images/tif.jpg"

function App() {
  return (
    <NavbarContextProvider>
      <Screen />    
    </NavbarContextProvider>
  )
}


function Screen(){

  return (
    <div className="w-96 h-[720px] bg-black border-4 border-gray-400 rounded-[56px] p-1 flex flex-col justify-between relative">
      <Topbar/>
      <Navbar/>
      <BlurScreen />
    </div>
  )
}


function BlurScreen(){
  const { clickedElement } = useNavbarContext(); 

  const variants = {
    show : {width: "calc(100% - 8px)"},
    hide : {width: "0px"}
  }
  return (
    <motion.div 
    animate={clickedElement ? "show" : "hide"}
    variants={variants}
    className='absolute backdrop-blur-lg h-[calc(100%-8px)] rounded-[48px]'
    >
    </motion.div>
  )
}

function Navbar(){
  const { clickedElement, setClickedElement } = useNavbarContext();
  const navList = [
    {
      icon : CircleUserRound,
      name: "Contact"
    },
    {
      icon : Phone,
      name : "Calls"
    },
    {
      icon : MessagesSquare,
      name: "Chats"
    },
    {
      icon : Settings,
      name : "Settings"
    }
  ];

  const variants = {
    selected : {y: -10, color: "white", z: 200},
    unselected : { color: "gray"}
  }
  return (
    <div className="px-4 py-4 w-full bg-zinc-900 rounded-b-[48px] flex flex-col items-center justify-between gap-6">
      <ul className="w-full flex justify-between">
        {navList.map((el) => (
          <motion.li 
          animate={clickedElement === el.name ? "selected" : "unselected"}
          variants={variants}
          className='flex items-center flex-col gap-1 cursor-pointer' 
          onClick={() => setClickedElement(el.name)}>
            <el.icon className='gray'/>
            <p className="text-xs">{el.name}</p>
          </motion.li>
        ))}
      </ul>
      <div className="bg-slate-100 w-52 h-1 rounded"></div>
    </div>
  )
}

function Topbar(){
  return (
    <div className="h-32 w-full bg-zinc-900 rounded-t-[50px] flex flex-col items-center pt-3">
      <DynamicIsland />
    </div>
  )
}

function DynamicIsland(){
  const { clickedElement } = useNavbarContext() 

  const variants = {
    full : {},
    half : {width : "120px"}
  }

  return (
    <motion.div 
    animate={clickedElement ? "half" : "full"}
    variants={variants}
    className="h-8 w-40 bg-black border-[1px] border-gray-200/30 rounded-full cursor-pointer z-50 flex justify-between items-center px-2">
      <div className='h-4 w-4 rounded-md' style={clickedElement ? {opacity : 0} : {opacity : 1}}>
        <img src={tif} className='rounded-sm'></img>
      </div>
      <Ellipsis className="stroke-white" size={16} style={clickedElement ? {opacity: 0} : {opacity : 1}}/>
    </motion.div>
  )
}

export default App
