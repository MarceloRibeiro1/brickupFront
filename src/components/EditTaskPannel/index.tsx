import { Disclosure } from "@headlessui/react";
import { CaretRight, Image, PencilSimple } from "phosphor-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { TaskModel } from "../../models/TaskModel";
import { setStatus, setTask } from "../../reducers/taskList";
import { ImageUploadBoxOnEdit } from "../ImageUploadBoxOnEdit";
import { StatusChangeList } from "../StatusChangeList";

type status = "Pendente" | "Finalizada"
interface EditTaskPanelProps{
    setEdit: () => void;
    task: TaskModel;
}
export function EditTaskPannel({setEdit, task}: EditTaskPanelProps) {
  const [statusState, setStatusState] = useState<status>(task.status)
  const [taskName, setTaskName] = useState(task.task)
  const dispatch = useDispatch()

  function updateTaskName(taskName: string){
    setTaskName(taskName)
    dispatch(setTask({
        oldTask: task,
        newTask: {...task, task: taskName} as TaskModel
    }))
  }

  function updateTaskStatus(newStatus: status){
    setStatusState(newStatus)
    dispatch(setStatus({
        oldTask: task,
        newTask: {...task, status: newStatus} as TaskModel
    }))
  }

  return (
    <>
        <Disclosure.Button as="div" className="flex items-center justify-between flex-grow">
            <div className="w-1/3 flex items-center">
                <CaretRight className="transform rotate-90" />
                <input placeholder="Nome da tarefa" value={taskName} onChange={(event) => {updateTaskName(event.target.value)}}/> 
            </div>
            <div className="w-1/3  ">
                <StatusChangeList state={statusState} onChange={updateTaskStatus} />
            </div>
            <div className="w-1/3 flex justify-between">
                <ImageUploadBoxOnEdit task={task}/>

                <div className="flex gap-3 px-1">
                    <button className="" onClick={setEdit}>
                        <PencilSimple  className="w-5 h-5"/>
                    </button>
                </div>
            </div>
        </Disclosure.Button>
        <button className="bg-purple-400 rounded-md p-2 w-32 hover:bg-purple-500 disabled:bg-purple-200" disabled={true} onClick={() => {}}>
            Concluir
        </button>
    
    </>
  );
}