import Back from "@/components/layouts/Back";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslations } from "next-intl";

function ReservationPage() {
    const t = useTranslations('Users.Reservation')
    return (
        <div className="flex flex-col p-5 gap-5 w-full items-center">
            <nav className="flex flex-row items-center justify-between w-full">
                <Back/>
                <h1 className="text-2xl font-semibold">
                    การจองของฉัน
                </h1>
            </nav>
            <Tabs defaultValue="usable" className="w-full">
                <TabsList className="w-full">
                    <TabsTrigger value="usable" className="w-full">Usable</TabsTrigger>
                    <TabsTrigger value="expired" className="w-full">Expired</TabsTrigger>
                </TabsList>
                <TabsContent value="usable">
                    Usable
                </TabsContent>
                <TabsContent value="expired">
                    Expired
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default ReservationPage;