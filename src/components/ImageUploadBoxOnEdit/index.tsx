import { Plus, Trash, UploadSimple } from "phosphor-react";
import { useEffect, useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { TaskModel } from "../../models/TaskModel";
import { addPicture, removePicture, selectPicture } from "../../reducers/newTask";
import { selectTaskPictureEditList, setPicture } from "../../reducers/taskList";

interface ImageUploadBoxOnEditProps{
    task: TaskModel;
}

export function ImageUploadBoxOnEdit({task}: ImageUploadBoxOnEditProps) {
    const [pictureUploadedStatus, setPictureUploadStatus] = useState("")
    const dispatch = useDispatch()
    const pictureList = useSelector(selectTaskPictureEditList)
    const [picture, setPictureState] = useState<File | undefined>(undefined)

    useEffect(() =>{
        pictureList.map((taskPicture) => {
          if (taskPicture.id == task.id) setPictureState(taskPicture.file)
        });
      },[pictureList])

    function dropFile (acceptedFiles: Array<File>){
        const lastFile = acceptedFiles.pop()

        if (lastFile){
            dispatch(setPicture({file: lastFile, id: task.id, picture: task.id.toString()} as {
				file?: File;
				id: number;
				picture: string | null;
			}))
            setPictureUploadStatus("succsess")
        }
    }
    function dropFileRejected(acceptedFiles: Array<FileRejection>){
        setPictureUploadStatus("img too big")
    }

    function removePictureFromMemory(){
        setPictureUploadStatus("")
        dispatch(setPicture({file: undefined, id: task.id, picture: null} as {
            file?: File;
            id: number;
            picture: string | null;
        }))
    }
    const acc = {
        'image/png': [ '.png']
    }
    

    if (picture){
        return (
            <div className="flex flex-row w-fit h-5 items-center" >
                <div className="bg-slate-200 rounded-sm w-10 hover:bg-slate-300">
                        <img src={URL.createObjectURL(picture)} />
                </div>
                <button className={`text-sm   `} onClick={removePictureFromMemory}><Trash className="hover:text-red-500"/></button>
            </div>
        );
    }

    return (
      <div className="flex flex-row w-5 h-5 overflow-hidden">
        <Dropzone accept={acc} maxSize={100000} onDropAccepted={dropFile} onDropRejected={dropFileRejected}>
        { ({getRootProps, getInputProps, isDragAccept}) => (
            <div {...getRootProps()} className={`cursor-pointer flex flex-col items-center`}>
                <Plus className= {`font-bold cursor-pointer bg-slate-200 rounded-full hover:bg-slate-300 ${isDragAccept ? "border-gray-500 border-2 bg-slate-100 " : ""} ` } />
                <input {...getInputProps()} />
            </div>
            )
        }
        </Dropzone>
      </div>
  );
}