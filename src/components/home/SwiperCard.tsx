import { Link } from "@/i18n/routing";
import { useFormatter } from "next-intl";

function SwiperCard({ 
    imageUrl,
    date,
    title,
    link 
} : { 
    imageUrl : string,
    date: string,
    title: string,
    link: string 
}) {
    const localeFormat = useFormatter()

    return (
        <Link
            href={link} 
            className="w-[200px] h-[200px] 
            text-white
            flex items-end justify-end
            rounded-lg 
            overflow-hidden
            bg-cover"
            style={{ backgroundImage: `url(${imageUrl})`}}
        >
            <div className="
                flex flex-col 
                text-zinc-200
                w-full items-end justify-end
                z-10 px-3 pb-1 h-[80px]
                bg-gradient-to-t from-black to-transparent"
            >
                <p className="font-semibold text-sm truncate">{title}</p>
                <p className="text-xs">
                    {localeFormat.dateTime(new Date(date), {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}
                </p>
            </div>
        </Link>
    );
}

export default SwiperCard;