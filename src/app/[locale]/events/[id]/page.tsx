import Back from "@/components/layouts/Back";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";

export default async function EventIdPage({ params }: { params: { id: string } }) {
    
    return (
        <div className="flex flex-col p-5 w-full">
            <nav className="flex items-center pb-5 w-full">
                <Back/>
            </nav>  
            <div className="w-full aspect-square overflow-hidden rounded-lg relative">
                <Image 
                    src={`/slider-1.jpg`} 
                    alt='Lazyloxy Samblack' 
                    fill 
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className="mt-5 flex flex-col gap-2 font-medium">
                <h1 className="text-2xl font-semibold text-white">
                    Samblack Lazyloxy
                </h1>
                <div className="flex flex-row items-center gap-2 text-zinc-500 ">
                    {/* {format.dateTime(new Date(event.date), {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                    })} */}
                    <Calendar size={22}/>
                    <p>วันพุธที่ 6 พฤศจิกายน 2567</p>
                </div>
                <div className="flex flex-row items-center gap-2 text-zinc-500 ">
                    <MapPin size={22}/>
                    <p>Philter Room</p>
                </div>
            </div>
        </div>
    );
}