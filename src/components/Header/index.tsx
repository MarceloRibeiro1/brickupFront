import { useDispatch } from "react-redux";
import { toggleOpen } from "../../reducers/newTask";

export function Header() {
  const dispatch = useDispatch()

  return (
    <header className="flex w-full justify-between px-4 items-center py-1">
        <div>Brick Up Tasks:</div>
        <div>
            <button 
              onClick={() => dispatch(toggleOpen())}
              className="bg-purple-400 rounded-md p-1 w-32 hover:bg-purple-500 transition-transform"
            >
              Nova
              </button>
        </div>
    </header>
  );
}