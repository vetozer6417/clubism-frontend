import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

function MainBanner({ imageUrl } : { imageUrl : string }) {
    return (
        <AspectRatio ratio={16 / 9} className="rounded-lg overflow-hidden">
            <Image src={imageUrl} alt="main-banner" className="object-cover" layout="fill"/>
        </AspectRatio>
    );
}

export default MainBanner;