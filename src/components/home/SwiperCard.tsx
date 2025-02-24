import { Link } from "@/i18n/routing";

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
                <p className="font-semibold">{title}</p>
                <p className="text-sm">{date}</p>
            </div>
        </Link>
    );
}

export default SwiperCard;