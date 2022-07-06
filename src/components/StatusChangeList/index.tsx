import { Listbox } from "@headlessui/react";
import { CaretDown } from "phosphor-react";


type status = "Pendente" | "Finalizada"

interface StatusChangeListProps{
    state: status,
    onChange: (newState: status) => void
}

const statusOptions: status[] = ["Pendente", "Finalizada"];

export function StatusChangeList({state, onChange}: StatusChangeListProps) {


  return (
    <Listbox value={state} onChange={onChange}>
        {({open}) =>(
            <div className="relative w-40">
                <Listbox.Button className={`${open ? "bg-slate-100": "hover:bg-slate-100"} w-full flex items-center justify-between px-2`}>{state} <CaretDown /> </Listbox.Button>
                <Listbox.Options className="fixed flex flex-col gap-1 w-40 bg-slate-100 py-1 rounded-b-md">
                    {
                        statusOptions.map((op,i) => 
                            <Listbox.Option key={i} value={op} className=" hover:bg-slate-200 p-1 cursor-default">
                                {op}
                            </Listbox.Option>
                        )
                    }
                </Listbox.Options>
            </div>
        )}
    </Listbox>
  );
}