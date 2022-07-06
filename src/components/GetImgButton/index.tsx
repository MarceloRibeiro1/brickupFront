import { Image } from "phosphor-react";
import { useState } from "react";
import { api } from "../../lib/api";
import { TaskModel } from "../../models/TaskModel";
import { useNavigate } from "react-router-dom";

interface GetImgButtonProps{
    task: TaskModel;
}

export function GetImgButton({task}: GetImgButtonProps) {
    const [imgUrl, setImgUrl] = useState<string>();
  const navigate = useNavigate()
  
  async function getImg() {
    try{
        const response = await api.get("/getImg",{
            params: {
                picture: task.id
            },
            responseType: 'arraybuffer'
        })

        var arrayBufferView = new Uint8Array( response.data );
        var blob = new Blob( [ arrayBufferView ], { type: "image/png" } );
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL( blob );
        window.open(imageUrl, "_blank")
    } catch(e){
        console.error(e)
    }
  }
  return (
    <div>
        {imgUrl ? <img src={imgUrl} alt="" className="w-10 h-10 border" /> : <button onClick={getImg}><Image  className="w-6 h-6"/></button>}
    </div>
    
    
  );
}