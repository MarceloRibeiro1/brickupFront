import { Trash, UploadSimple } from "phosphor-react";
import { useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { addPicture, removePicture, selectPicture } from "../../reducers/newTask";

export function ImageUploadBoxOnCreate() {
    const [pictureUploadedStatus, setPictureUploadStatus] = useState("")
    const dispatch = useDispatch()
    const picture = useSelector(selectPicture)

    

    function dropFile (acceptedFiles: Array<File>){
        const lastFile = acceptedFiles.pop()

        if (lastFile){
            dispatch(addPicture(lastFile))
            setPictureUploadStatus("succsess")
        }
    }
    function dropFileRejected(acceptedFiles: Array<FileRejection>){
        setPictureUploadStatus("img too big")
    }

    function removePictureFromMemory(){
        setPictureUploadStatus("")
        dispatch(removePicture())
    }
    const acc = {
        'image/png': [ '.png']
    }
    

    if (picture){
        return (
            <div className="flex flex-col p-2" >
                <span>Imagem:</span>
                <div className="w-32 h-32 bg-slate-200 rounded-xl p-8 hover:bg-slate-300">

                    <div  className={`w-fit h-fit flex flex-col items-center`}>

                        <img src={URL.createObjectURL(picture)} />
                        
                        <span className={`text-sm ${pictureUploadedStatus == "succsess" ? "text-green-500" : ""} ${pictureUploadedStatus == "img too big" ? "text-red-500" : ""} `}>{pictureUploadedStatus}</span>
                        <button className={`text-sm   `} onClick={removePictureFromMemory}><Trash className="hover:text-red-500"/></button>

                    </div>
                </div>
            </div>
        );
    }

    return (
      <div className="flex flex-col p-2">
        <span>Imagem:</span>
        <Dropzone accept={acc} maxSize={64000} onDropAccepted={dropFile} onDropRejected={dropFileRejected}>
        { ({getRootProps, getInputProps, isDragAccept}) => (
            <div {...getRootProps()} className={`cursor-pointer w-32 h-32 flex flex-col items-center`}>
                <UploadSimple className= {`cursor-pointer  w-28 h-28 bg-slate-200 rounded-xl p-8 hover:bg-slate-300 ${isDragAccept ? "border-gray-500 border-2 bg-slate-100 " : ""}  ${pictureUploadedStatus != "" ? "bg-[]" : ""}` } />
                <span className={`text-sm ${(pictureUploadedStatus == "succsess" )? "text-green-500" : ""} ${pictureUploadedStatus == "img too big" ? "text-red-500" : ""} `}>{pictureUploadedStatus}</span>
                <input {...getInputProps()} />
            </div>
            )
        }
        </Dropzone>
      </div>
  );
}