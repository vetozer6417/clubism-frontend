import { Button } from "@/components/ui/button";
import { Armchair, Beer, Utensils } from "lucide-react";
import { useTranslations } from "next-intl";

function Reservation() {
    const t = useTranslations('HomePage.reservation');
    return (
        <div className="grid grid-rows-3 gap-4">
            <Button className="flex flex-row h-[90px] gap-4 [&_svg]:pointer-events-none [&_svg]:size-8 [&_svg]:shrink-0 bg-secondary/30" variant="outline">
                <Armchair/>
                <div className="flex flex-col items-start">
                    <p className="text-lg font-medium">{t('button1.title')}</p>
                    <p className="font-light text-zinc-400">{t('button1.description')}</p>
                </div>
            </Button>
            <Button className="flex flex-row h-[90px] gap-4 [&_svg]:pointer-events-none [&_svg]:size-8 [&_svg]:shrink-0 bg-secondary/30" variant="outline">
                <Beer />
                <div className="flex flex-col items-start">
                    <p className="text-lg font-medium">{t('button2.title')}</p>
                    <p className="font-light text-zinc-400">{t('button2.description')}</p>
                </div>
            </Button>
            <Button className="flex flex-row h-[90px] gap-4 [&_svg]:pointer-events-none [&_svg]:size-8 [&_svg]:shrink-0 bg-secondary/30" variant="outline">
                <Utensils />
                <div className="flex flex-col items-start">
                    <p className="text-lg font-medium">{t('button3.title')}</p>
                    <p className="font-light text-zinc-400">{t('button3.description')}</p>
                </div>
            </Button>
        </div>
    );
}

export default Reservation;