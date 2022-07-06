import { Disclosure } from "@headlessui/react";
import { TaskModel } from "../../models/TaskModel";

interface TaskDescriptionProps{
    task: TaskModel
}
export function TaskDescription({task}: TaskDescriptionProps) {
  return (
    <Disclosure.Panel className="px-2" static>
        <div className="bg-slate-50 p-2 flex flex-col">
            <div className="font-bold">
                Descrição:
            </div>
            <div className="flex items-end content-between w-full">
                <div className="w-11/12">
                    {task.description}
                </div>

            </div>
        </div>
    </Disclosure.Panel>
  );
}