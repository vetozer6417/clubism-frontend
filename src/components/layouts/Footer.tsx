import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";

function Footer() {
    return (
        <footer className="w-full h-14 px-5 bg-secondary text-zinc-400 flex flex-row justify-between items-center">
            <div className="flex flex-row gap-4">
                {/* liff.openWindow({
                url: "https://line.me",
                external: true,
                }); */}
                <Instagram size={26}/>
                <Facebook size={26}/>
            </div>
            <div className="flex flex-col gap-[2px] justify-between text-sm items-end">
                <Link href='/terms-condition'>Terms & Condition</Link>
                <p>
                    © 2025 <span className="font-medium">888developer</span>
                </p>
            </div>
        </footer>
    );
}

export default Footer;