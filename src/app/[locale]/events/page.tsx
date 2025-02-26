import Back from "@/components/layouts/Back";
import Empty from "@/components/layouts/Empty";
import { Link } from "@/i18n/routing";
import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";

const mockEvents = [
    {
        id: '65e83206-f178-42d9-b54b-7b3f3b4c7294',
        title: 'MIRR',
        date: '2025-02-11',
        imageUrl: '/slider-1.jpg',
    },
    {
        id: '85ed4298-bdab-4013-9cf4-2d749e4dfaff',
        title: 'POLYCAT',
        date: '2025-03-03',
        imageUrl: '/slider-2.jpg',
    },
    {
        id: 'e79fdeb9-6379-42dc-9cf0-0598ecc316e8',
        title: 'CERTIFIED_V10',
        date: '2025-03-16',
        imageUrl: '/slider-3.jpg',
    },
    {
        id: '6a21a63a-75b2-4b06-b34b-966c30ae11e1',
        title: 'SAMBLACK LAZYLOXY',
        date: '2025-04-29',
        imageUrl: '/slider-4.jpg',
    },
    {
        id: 'd865b8d3-b4f3-4eba-8923-8827017440cd',
        title: 'Ladies Night',
        date: '2025-05-02',
        imageUrl: '/slider-5.jpg',
    },
]

function EventsPage() {
    const t = useTranslations('Events')
    const format = useFormatter()
    
    return (
        <div className="flex flex-col p-5 gap-5 w-full items-center">
            <nav className="flex flex-row items-center justify-between w-full">
                <Back/>
                <h1 className="text-2xl font-semibold">
                    {t('title')}
                </h1>
            </nav>
            {/* <Empty/> */}
            {mockEvents.map(event => (
                <Link
                    prefetch
                    href={`/events/${event.id}`} 
                    key={event.id} 
                    className="flex items-end relative w-full aspect-square rounded-lg overflow-hidden
                    border border-zinc-800
                    "
                >
                    <Image 
                        src={event.imageUrl}
                        alt={event.title} 
                        fill
                        style={{objectFit:"cover"}}
                        className="rounded-lg"
                    />
                    <div className="
                        flex flex-col justify-end
                        w-full
                        z-10 h-[150px] pb-4 px-4
                        bg-gradient-to-t from-black to-transparent"
                    >
                        <p className="text-lg truncate font-semibold">{event.title}</p>
                        <p className="text-sm">
                            {format.dateTime(new Date(event.date), {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default EventsPage;