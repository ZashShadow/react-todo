"use client"
import Image from "next/image";
import ToDo from "./components/ToDo";
import { useState, useEffect } from "react";

export default function Home() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleTyping = (e) => {
    setInputText(e.target.value)
  }


  const onToggleCompleted = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.ID === id) {
        return { ...todo, Completed: !todo.Completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  const handleDelete = (currentID) => {
    // console.log("Delete Triggered");
    const updatedTodos = todos.filter(currentToDo => currentToDo.ID !== currentID);
    setTodos(updatedTodos);
  }



  const handleAdd = () => {
    if (inputText == "") {
      return
    }
    else {
      setTodos([...todos, {
        "task": inputText,
        "ID": Date.now(),
        "Completed": false
      }])
      setInputText("")
    }


  }

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  }

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    setTodos(savedTodos ? JSON.parse(savedTodos) : []);
  }, [])


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    // console.log(`Saved Todo's`, todos);
  }, [todos])


  useEffect(() => {

    const timeInterval = setInterval(() => {
      const timeNow = new Date();
      const localTime = timeNow.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      const localDate = timeNow.toLocaleDateString([], {
        weekday: "long",
        month: "long",
        day: "numeric"
      });
      setTime(localTime);
      setDate(localDate);
    }, 1000)


    return () => {
      clearInterval(timeInterval)
    }
  }, [])


  return (
    <div className="canvas  flex justify-center w-screen h-screen px-10 py-10 max-md:px-5 max-sm:p-0 ">
      <div className="main-frame  flex justify-center  bg-[#FAFAFA] h-full w-[80%] max-md:w-full rounded-2xl px-3 py-8 max-sm:p-0 ">
        <div className="app-wrapper  flex flex-col items-center gap-5 px-7 max-sm:px-2 pt-8   w-[90%] max-sm:w-full h-full text-black">
          <div className="header min-w-full flex max-sm:flex-col justify-between max-sm:justify-center max-sm:items-center">
            <div className="left-part max-sm:flex max-sm:flex-col max-sm:items-center">
              <h1 className="text-6xl max-md:text-5xl font-bold">React TODO</h1>
              <h3 className="text-[#C1C2CB] text-md">{date}</h3>
            </div>
            <div className="right-part flex flex-col gap-15 ">
              <span className="time text-4xl font-semibold ml-auto max-sm:hidden">{time}</span>
              <div className="buttons flex gap-2">
                <span className="text-[#4d42b3b0]  border-1 border-black/25 shadow bg-[#F9F9F9] p-1 px-3 flex justify-center items-center gap-2 rounded-xl">Show Completed

                  <label htmlFor="showCompleted" className='flex select-none group items-center justify-center'>
                    <input id="showCompleted" onChange={() => setShowCompleted(!showCompleted)} className='appearance-none sr-only peer' type="checkbox" name="show-completed" />
                    <div className="rounded-full peer flex items-center justify-center size-4 border-2 hover:bg-[#f0f0f0] hover:cursor-pointer stroke-transparent peer-checked:bg-[#4D42B3] hover:peer-checked:bg-[#4D42B3]">
                      <svg className={`group-hover:stroke-[#d0d0d0] ${showCompleted ? "stroke-[#ffffff]" : ""} `} width="100%" height="100%" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30.8333 9.25L13.875 26.2083L6.16666 18.5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                  </label>

                </span>
              </div>
            </div>
          </div>
          <div className="tasks-wrapper overflow-auto flex flex-col gap-5  rounded-[20px]  p-2 w-full ">
            {todos.length === 0 ? <p className="text-md text-[#C1C2CB] mx-auto mt-40">No Tasks Yet, Add one Below</p>:null }
            {todos.map((todo) => {
              if (todo.Completed && showCompleted == false) {
                return null
              }
              else {
                return (
                  <ToDo key={todo.ID} task={todo.task} ID={todo.ID} Completed={todo.Completed} onToggleCompleted={onToggleCompleted} onDelete={handleDelete} />
                );
              }
            })
            }
          </div>
          <div className="task-input h-11 flex gap-2 w-full mt-auto">
            <div className="new-task  bg-[#4d42b351] border-1 border-black/25 shadow shadow-black/25 rounded-md flex items-center flex-grow"> <input value={inputText} className="px-5 w-full focus:outline-none" onChange={handleTyping} onKeyDown={handleEnter} type="text" placeholder="Write a new task here" /></div>
            <button className="text-[#4D42B3] font-bold  border-1 border-black/25 shadow bg-[#F9F9F9] p-1 px-3 flex justify-center items-center gap-2 rounded-xl hover:cursor-pointer hover:scale-105 transition-all" type="button" onClick={handleAdd}>Add Task +</button>
          </div>
          <div className="text-[#C1C2CB] max-sm:text-xs max-sm:text-center text-md max-sm: flex justify-center items-center gap-1">
            <span className="max-sm:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="18"
                height="18"
                viewBox="0 0 256 256"
              >
                <g
                  fill="#c1c2cb"
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray=""
                  strokeDashoffset="0"
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  textAnchor="none"
                  style={{ mixBlendMode: "normal" }}
                >
                  <g transform="scale(5.12,5.12)">
                    <path d="M25,2c-12.703,0 -23,10.297 -23,23c0,12.703 10.297,23 23,23c12.703,0 23,-10.297 23,-23c0,-12.703 -10.297,-23 -23,-23zM25,11c1.657,0 3,1.343 3,3c0,1.657 -1.343,3 -3,3c-1.657,0 -3,-1.343 -3,-3c0,-1.657 1.343,-3 3,-3zM29,38h-2h-4h-2v-2h2v-13h-2v-2h2h4v2v13h2z" />
                  </g>
                </g>
              </svg>
            </span>
            The tasks presist across browser sessions unless site data is Cleared
          </div>
        </div>
      </div>
    </div>
  )
};
