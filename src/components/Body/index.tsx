import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../lib/api";
import { addList, selectTaskList } from "../../reducers/taskList";

import { Task } from "../Task";

export function Body() {
  const dispatch = useDispatch();
  const taskList = useSelector(selectTaskList)

  useEffect(() => {
    async function findAll(){
      try{
        const response = await api.get("/findAll")

        dispatch(addList(response.data))
  
      } catch (e){
        console.error(e)
      }
    }

    findAll();
  },[])
  
  return (
    <div className="flex flex-col h-full p-2 w-full">
        <div className="flex bg-slate-300 w-full p-2">
            <span className="w-1/3">Tarefa</span>
            <span className="w-1/3">Status</span>
        </div>
        <div className="overflow-y-auto flex h-5/6 flex-col gap-1 py-1">
          {
            taskList.map((task) => (
              <div key={task.id}>
                <Task task={task}/>
              </div>
            ))
          }
        </div>
    </div>
  );
}