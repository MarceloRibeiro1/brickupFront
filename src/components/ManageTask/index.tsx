import { Dialog } from "@headlessui/react";
import Dropzone, { DropEvent, FileRejection } from "react-dropzone";
import {  UploadSimple, X } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../lib/api";
import { TaskModel } from "../../models/TaskModel";
import { addPicture, removePicture, selectisNewTaskOpen, selectPicture, selectTask, toggleOpen } from "../../reducers/newTask";
import { add } from "../../reducers/taskList";
import { StatusChangeList } from "../StatusChangeList";
import { ImageUploadBoxOnCreate } from "../ImageUploadBoxOnCreate";

type status = "Pendente" | "Finalizada"

export function ManageTask() {
  const taskStore = useSelector(selectTask)
  const open = useSelector(selectisNewTaskOpen)
  const [task, setTask] = useState(taskStore?.task || "")
  const [description, setDescription] = useState(taskStore?.description || "")
  const [status, setStatus] = useState<status>("Pendente")
  const picture = useSelector(selectPicture)

  const dispatch = useDispatch()

  function setNewStatus(newState: status){
    setStatus(newState);
  }

  async function submitTask(event: FormEvent){
    event.preventDefault();
    try{
      if (picture){
        const formData = new FormData()
        formData.append("file",picture)
        formData.append("description",description)
        formData.append("task",task)
        formData.append("status",status)
        const response = await api.post("/createImg",formData,{headers: {
          "Content-Type": "multipart/form-data",
        },})
  
        dispatch(add({
          description: response.data.description,
          id: response.data.id,
          status: response.data.status,
          task: response.data.task,
          picture: response.data.picture
        }as TaskModel))
        dispatch(toggleOpen())
        setTask("")
        setDescription("")
        dispatch(removePicture())
      } else {
        const response = await api.post("/create",{
          description,
          task,
          status,
        })
  
        dispatch(add({
          description: response.data.description,
          id: response.data.id,
          status: response.data.status,
          task: response.data.task,
          picture: response.data.picture
        }as TaskModel))
        dispatch(toggleOpen())
        setTask("")
        setDescription("")        
      }

    }catch (e){
      console.error(e)
    }
  }
  useEffect(() =>{
    setStatus("Pendente")
  }, [open])


  return (
    <Dialog
        open = {open}
        onClose={() => {dispatch(toggleOpen())}}
        className="fixed inset-0 flex items-center justify-center bg-opacity-70 bg-slate-200"
    >
        <Dialog.Panel as="div" className="text-lg relative flex flex-col content-center bg-white md:rounded-lg p-5 md:w-7/12 md:max-w-3xl md:h-5/6 w-full h-full rounded-none">
            <Dialog.Title className="text-4xl px-10 flex justify-between items-center">
                <span>
                    Nova tarefa:
                </span>
                <button onClick={() => {dispatch(toggleOpen())}}>
                    <X />
                </button>
            </Dialog.Title>
            <form className="flex flex-col h-full justify-between items-center" onSubmit={(event) => submitTask(event)}>
                <div className="flex flex-col h-full gap-2 pt-10 px-2 w-9/12">
                    <div className="flex p-2 gap-1">
                        <span>Nome:</span>
                        <input className="bg-slate-100 rounded-sm w-full px-1" value={task} onChange={(event) => {setTask(event.target.value)}}/>
                    </div>
                    <div className="flex p-2 gap-1">
                        <span>Descrição:</span>
                        <textarea className="bg-slate-100 rounded-sm w-full h-28 resize-none p-2" value={description} onChange={(event) => {setDescription(event.target.value)}}/>
                    </div>
                    <div className="flex p-2 gap-1">
                        <span>Status:</span>
                        <StatusChangeList onChange={setNewStatus} state={status} />

                    </div>
                    <ImageUploadBoxOnCreate />
                </div>
                
                <button 
                  className="w-28 h-10 items-center flex bg-slate-200 rounded-xl p-8 hover:bg-slate-300 disabled:bg-slate-100" 
                  disabled={(task.length == 0 || description.length == 0) ? true : false } 
                >
                    Salvar
                </button>
            </form>
        </Dialog.Panel>
    </Dialog>
  );
}