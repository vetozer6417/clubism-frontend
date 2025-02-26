import { Inbox } from "lucide-react";

function Empty() {
    return (
        <div className="flex flex-col w-full h-full gap-2 items-center justify-center text-zinc-500">
            <Inbox size={60}/>
            <p className="text-xl">No data</p>
        </div>
    );
}

export default Empty;