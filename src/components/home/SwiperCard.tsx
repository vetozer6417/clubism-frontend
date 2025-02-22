function SwiperCard({ 
    imageUrl,
    date,
    title 
} : { 
    imageUrl : string,
    date: string,
    title: string 
}) {
    return (
        <div 
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
                w-full
                z-10 px-2 py-1
                bg-white/20 border-t border-white/20
                backdrop-blur-sm"
            >
                <p className="font-medium">{title}</p>
                <p className="text-sm">{date}</p>
            </div>
        </div>
    );
}

export default SwiperCard;