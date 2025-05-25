import React, { useEffect, useState } from 'react'

const ToDo = (props) => {
  const [checked, setChecked] = useState(props.Completed);
  const [taskDesc, setTaskDesc] = useState("")

  useEffect(() => {
    if (checked) {
      setTaskDesc("Task Completed");
    }
    else {
      setTaskDesc("Due Task");
    }
  }, [checked])



  const handleCompleted = () => {
    setChecked(!checked)
    props.onToggleCompleted(props.ID);
  }
  const handleDelete = ()=>{
    props.onDelete(props.ID);
  };


  return (
    <div className="to-do bg-[#F9F9F9] border-1 border-black/25 shadow shadow-black/25   rounded-2xl p-2 px-5 w-full flex items-center justify-between">
      <div className="info">
        <div className={`text-4xl max-sm:text-xl font-semibold ${checked ? "line-through" : ""}`}>{props.task}</div>
        <div className='text-[#C1C2CB]'>{taskDesc}</div>
      </div>
      <div>
        <div className="buttons flex items-center justify-center gap-2">
          <label htmlFor={`${props.ID}-complete`} className='flex select-none group items-center justify-center'>
            <input id={`${props.ID}-complete`} defaultChecked={checked} onChange={handleCompleted} className='appearance-none sr-only peer' type="checkbox" name="show-completed" />
            <div className="rounded-full peer flex items-center justify-center size-8 max-sm:size-7 border-2 hover:bg-[#f0f0f0] hover:cursor-pointer
            stroke-transparent peer-checked:bg-[#4D42B3] hover:peer-checked:bg-[#4D42B3]">
              <svg className={`group-hover:stroke-[#d0d0d0] ${checked ? "stroke-[#ffffff]" : ""} `} width="90%" height="90%" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30.8333 9.25L13.875 26.2083L6.16666 18.5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </label>
          <button type="button" onClick={()=>{props.onDelete(props.ID)}} className='size-8 max-sm:size-7 flex rounded-md  justify-center items-center border-2 hover:bg-[#f0f0f0] hover:cursor-pointer'>
            <svg width="80%" height="80%" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.625 7.24984H6.04167M6.04167 7.24984H25.375M6.04167 7.24984V24.1665C6.04167 24.8074 6.29628 25.4221 6.74949 25.8753C7.2027 26.3286 7.81739 26.5832 8.45833 26.5832H20.5417C21.1826 26.5832 21.7973 26.3286 22.2505 25.8753C22.7037 25.4221 22.9583 24.8074 22.9583 24.1665V7.24984M9.66667 7.24984V4.83317C9.66667 4.19223 9.92128 3.57754 10.3745 3.12433C10.8277 2.67112 11.4424 2.4165 12.0833 2.4165H16.9167C17.5576 2.4165 18.1723 2.67112 18.6255 3.12433C19.0787 3.57754 19.3333 4.19223 19.3333 4.83317V7.24984M12.0833 13.2915V20.5415M16.9167 13.2915V20.5415" stroke="#FF0100" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ToDo