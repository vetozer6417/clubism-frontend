import { Inbox } from "lucide-react";
import { useTranslations } from "next-intl";

function Empty() {
    const t = useTranslations()
    return (
        <div className="flex flex-col w-full h-full gap-2 items-center justify-center text-zinc-500">
            <Inbox size={60}/>
            <p className="text-xl">{t('NoData')}</p>
        </div>
    );
}

export default Empty;