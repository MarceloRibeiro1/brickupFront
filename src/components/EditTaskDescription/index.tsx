import { Disclosure } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../lib/api";
import { TaskModel } from "../../models/TaskModel";
import { saveEdits, selectTaskEditList, selectTaskPictureEditList, setDescription } from "../../reducers/taskList";

interface EditTaskDescriptionProps{
    task: TaskModel,
    finishEdit: () => void
}

export function EditTaskDescription({task, finishEdit}: EditTaskDescriptionProps) {
  const [taskDescription, setTaskDescription] = useState(task.description)
  const dispatch = useDispatch()
  const editedTaskList = useSelector(selectTaskEditList);
  const imageTaskList = useSelector(selectTaskPictureEditList);
  const [editedTask, setEditedTask] = useState<TaskModel>(task);
  const [picture, setPictureState] = useState<File | undefined>(undefined)

  useEffect(() =>{
    editedTaskList.map((taskEdit) => {
      if (taskEdit.id == task.id) {
        setEditedTask(taskEdit)
      }
    });
    imageTaskList.map((taskEdit) => {
      if (taskEdit.picture && taskEdit.id == task.id) {
        setPictureState(taskEdit.file)
      }
    });
  },[editedTaskList, imageTaskList])


  async function submitChange(){
    try {
      if (picture){

        const formData = new FormData()
        formData.append("file",picture)
        formData.append("id",editedTask.id.toString())
        formData.append("task",editedTask.task)
        formData.append("description",editedTask.description)
        formData.append("status",editedTask.status)
        formData.append("picture",editedTask.picture || "")
        const response = await api.post("/editImg",formData,{headers: {
          "Content-Type": "multipart/form-data",
        },})

        dispatch(saveEdits({
          description: response.data.description,
          id: response.data.id,
          status: response.data.status,
          task: response.data.task,
          picture: response.data.picture
        }as TaskModel))
      } else{
        const response = await api.post("/edit",{
          id: editedTask.id,
          task: editedTask.task,
          description: editedTask.description,
          status: editedTask.status,
          picture: editedTask.picture,
        })
        dispatch(saveEdits({
          description: response.data.description,
          id: response.data.id,
          status: response.data.status,
          task: response.data.task,
          picture: response.data.picture
        }as TaskModel))

      }
      finishEdit()
    } catch (e){
      console.error(e)
    }

  }

  function changeDescription(description: string){
    setTaskDescription(description)
    dispatch(setDescription({
      oldTask: task,
      newTask: {...task, description} as TaskModel
    }))
  }
  return (
    <Disclosure.Panel className="px-2" static>
        <div className="bg-slate-50 p-2 flex flex-col">
            <div className="font-bold">
                Descrição:
            </div>
            <div className="flex items-end content-between w-full">
                <textarea className="w-11/12 resize-none" value={taskDescription} placeholder="Insira a descirção da tarefa aqui:" onChange={(event) => {changeDescription(event.target.value)}} />
                <button 
                  className="bg-purple-400 hover:bg-purple-500 p-1 rounded-md border-1 disabled:bg-purple-200 mx-4" 
                  onClick={submitChange}
                  disabled={(editedTask.description.length == 0 || editedTask.task.length == 0) ? true : false}
                >
                  Salvar
                </button>
            </div>
        </div>
    </Disclosure.Panel>
  );
}