import { Image, PencilSimple } from "phosphor-react";
import { Body } from "./components/Body";
import { Header } from "./components/Header";
import { ManageTask } from "./components/ManageTask";

export function App() {
  return (
    <div className="bg-slate-300 py-10 px-5 w-screen h-screen">
        <div className="rounded-sm p-2 flex flex-col w-full h-full bg-white">
            <Header />
            <Body />
            <ManageTask />
        </div>
    </div>
  );
}