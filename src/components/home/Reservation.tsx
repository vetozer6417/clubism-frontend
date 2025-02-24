import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { Armchair, MapPin, TicketCheck } from "lucide-react";
import { useTranslations } from "next-intl";

function Reservation() {
    const t = useTranslations('HomePage.reservation');

    return (
        <div className="grid grid-rows-3 gap-4">
            <Link href="/reserve" prefetch>
                <Button className="flex flex-row h-[90px] gap-4 [&_svg]:pointer-events-none [&_svg]:size-8 [&_svg]:shrink-0 bg-secondary/30 w-full" variant="outline">
                    <Armchair/>
                    <div className="flex flex-col items-start">
                        <p className="text-xl font-medium">{t('button1.title')}</p>
                        <p className="font-base text-zinc-400">{t('button1.description')}</p>
                    </div>
                </Button>
            </Link>
            <Link href="/users/reservation" prefetch>
                <Button className="flex flex-row h-[90px] gap-4 [&_svg]:pointer-events-none [&_svg]:size-8 [&_svg]:shrink-0 bg-secondary/30 w-full" variant="outline">
                    <TicketCheck/>
                    <div className="flex flex-col items-start">
                        <p className="text-xl font-medium">{t('button2.title')}</p>
                        <p className="font-base text-zinc-400">{t('button2.description')}</p>
                    </div>
                </Button>
            </Link>
            <Button className="flex flex-row h-[90px] gap-4 [&_svg]:pointer-events-none [&_svg]:size-8 [&_svg]:shrink-0 bg-secondary/30 w-full" variant="outline">
                <MapPin/>
                <div className="flex flex-col items-start">
                    <p className="text-xl font-medium">{t('button3.title')}</p>
                    <p className="font-base text-zinc-400">{t('button3.description')}</p>
                </div>
            </Button>
        </div>
    );
}

export default Reservation;