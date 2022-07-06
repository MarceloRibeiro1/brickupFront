import { Disclosure } from "@headlessui/react";
import { useEffect, useState } from "react";
import { TaskModel } from "../../models/TaskModel";
import { EditTaskDescription } from "../EditTaskDescription";
import { EditTaskPannel } from "../EditTaskPannel";
import { TaskDescription } from "../TaskDescription";
import { TaskPannel } from "../TaskPannel";

interface TaskProps{
  task: TaskModel;
}

export function Task({task}: TaskProps) {
  const [testEdit, setTestEdit] = useState(false)
  useEffect(()=>{

  },[task])

  function toggleTestEdit(){
    if (testEdit){
        setTestEdit(false)
    } else setTestEdit(true)
  }


  return (
    <Disclosure >
        {({open, close}) => (<>
            <div className="flex items-center justify-between bg-slate-100 rounded-md py-1 hover:bg-slate-200">
                {
                    testEdit ? <EditTaskPannel task={task} setEdit={toggleTestEdit} /> : <TaskPannel task={task} open={open} setEdit={toggleTestEdit} />
                }
            </div>
            {((open || testEdit ) && (
                testEdit ? <EditTaskDescription task={task} finishEdit={toggleTestEdit} /> : <TaskDescription task={task} />
            ))}
        </>)}
    </Disclosure>
  );
}