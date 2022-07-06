import { Disclosure } from "@headlessui/react";
import { CaretRight, PencilSimple } from "phosphor-react";
import { useDispatch } from "react-redux";
import { api } from "../../lib/api";
import { TaskModel } from "../../models/TaskModel";
import { saveEdits, setStatus } from "../../reducers/taskList";
import { GetImgButton } from "../GetImgButton";

interface TaskPanelProps{
    open: boolean;
    setEdit: () => void;
    task: TaskModel;
}
export function TaskPannel({open, setEdit, task}: TaskPanelProps) {
    const dispatch = useDispatch()
    async function submitChange(){
        try {
            dispatch(setStatus({
                oldTask: task,
                newTask: {...task, status: "Finalizada"} as TaskModel
            }))

            const response = await api.post("/edit",{
              id: task.id,
              task: task.task,
              description: task.description,
              status: "Finalizada",
              picture: task.picture,
            })
            dispatch(saveEdits({
              description: response.data.description,
              id: response.data.id,
              status: response.data.status,
              task: response.data.task,
              picture: response.data.picture
            }as TaskModel))

        } catch (e){
          console.error(e)
        }
    
      }
  return (
    <>
        <Disclosure.Button as="div" className="flex items-center justify-between flex-grow">
            <div className="w-1/3 flex items-center"><CaretRight className={`${open  ? "transform rotate-90" : ""}`} />{task.task}</div>
            <div className="w-1/3  ">{task.status}</div>
            <div className="w-1/3 flex justify-between">
                <div className="">
                    {
                        task.picture != null ? <GetImgButton task={task}/> : <></>
                    }
                
                </div>
                <div className="flex gap-3 px-1">
                    <button className="" onClick={setEdit}>
                        <PencilSimple  className="w-5 h-5"/>
                    </button>
                </div>
            </div>
        </Disclosure.Button>
        <button className="bg-purple-400 rounded-md p-2 w-32 hover:bg-purple-500 disabled:bg-purple-200" disabled={task.status == "Finalizada" ? true : false } onClick={submitChange}>
            Concluir
        </button>
    
    </>
  );
}