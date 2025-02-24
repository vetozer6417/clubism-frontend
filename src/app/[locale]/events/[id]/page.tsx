'use client'
import Back from "@/components/layouts/Back";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ReactMarkdown from "react-markdown"

const markdownDesc = `
4amproject.bkk presents
"Polycat" concert\n\nOn Thursday, 27th March 2025\n\n🎟️ TICKET:\nEarly bird 550 THB, Regular 650 THB,\nWalk in 750 THB\n\n📲 For more information:\nLine: **@4amproject.bkk** (with@)\n\nแล้วเจอกันในค่ำคืนที่เต็มไปด้วยรอยยิ้ม! 😁💜🎤
`

export default async function EventIdPage({ params }: { params: { id: string } }) {
    const t = useTranslations('EventId')
    
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
                <div className="flex flex-row items-center gap-2 text-zinc-400 ">
                    {/* {format.dateTime(new Date(event.date), {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                    })} */}
                    <Calendar size={22}/>
                    <p>วันพุธที่ 6 พฤศจิกายน 2567</p>
                </div>
                <div className="flex flex-row items-center gap-2 text-zinc-400 ">
                    <MapPin size={22}/>
                    <p>Philter Room</p>
                </div>
            </div>
            <div className="my-5 text-zinc-400 whitespace-pre-line">
                <ReactMarkdown children={markdownDesc}/>
            </div>
            <Button variant='default'>
                {t('button')}
            </Button>
        </div>
    );
}