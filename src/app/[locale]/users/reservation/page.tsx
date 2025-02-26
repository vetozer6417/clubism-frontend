'use client'
import Back from "@/components/layouts/Back";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link } from "@/i18n/routing";
import { Calendar, ChevronRight, Phone, Users } from "lucide-react";
import { useFormatter } from 'next-intl'
import { useTranslations } from "next-intl";

import { formatDate } from "@/lib/formatDate";
import { formatPhoneNumber } from "@/lib/format";
import Empty from "@/components/layouts/Empty";
import { useState } from "react";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

interface Reservation {
    _id: string;
    nightclubId: string;
    lineUserId: string;
    tableId: string | null;
    name: string;
    person: number;
    date: string;
    phoneNumber: string;
    note: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
}

const mockReservation = [
    {
        _id: "1",
        nightclubId: "nightclub123",
        lineUserId: "lineUser789", //reference to Line Uer
        tableId: null, //reference to table
        name: "Que",
        person: 6,
        date: "2025-02-25T00:00:00.000Z", // February 26, 2025
        phoneNumber: "091-111-5100",
        note: "ขอโต๊ะข้างหน้าดีเจ ถ้าไม่ได้ไม่เป็นไรค่ะ ขอบคุณค่ะ",
        status: "PROCESSING",
        createdAt: "2025-02-25T00:11:38.081Z",
        updatedAt: "2025-02-25T00:11:38.081Z",
    },
    {
        _id: "4",
        nightclubId: "nightclub123", 
        lineUserId: "lineUser789", //reference to Line Uer
        tableId: "81235718-85b7-4cc9-9704-f9cb541b9742", //reference to table
        name: "Que",
        person: 14,
        date: "2025-02-26T00:00:00.000Z",
        phoneNumber: "088-998-5100",
        note: null,
        status: "CONFIRMED",
        createdAt: "2025-02-26T16:00:00.000Z",
        updatedAt: "2025-02-26T16:30:00.000Z",
    },
    {
        _id: "5",
        nightclubId: "nightclub222", 
        lineUserId: "lineUser789", //reference to Line Uer
        tableId: "ac715402-12b1-4e55-af9e-5076faf069ce", //reference to table
        name: "Jinny",
        person: 3,
        date: "2025-02-29T00:00:00.000Z",
        phoneNumber: "088-998-2221",
        note: null,
        status: "CANCELLED",
        createdAt: "2025-02-22T16:00:00.000Z",
        updatedAt: "2025-02-23T16:30:00.000Z",
    },
    {
        _id: "6",
        nightclubId: "nightclub222", 
        lineUserId: "lineUser789", //reference to Line Uer
        tableId: "ac715412-12b1-4e55-af8e-5076faf069ce", //reference to table
        name: "Thompson",
        person: 4,
        date: "2025-02-24T00:00:00.000Z",
        phoneNumber: "088-998-2231",
        note: null,
        status: "RELEASED",
        createdAt: "2025-02-22T16:00:00.000Z",
        updatedAt: "2025-02-23T16:30:00.000Z",
    }
]

function ReservationPage() {
    const t = useTranslations('Users.Reservation')

    const localeFormat = useFormatter()

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)

    const handleReservationClick = (reservation: Reservation) => {
        setSelectedReservation(reservation)
        setIsDrawerOpen(true)
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // Filter reservations for Usable and Expired tabs
    const usableReservations = mockReservation.filter(res => {
        const resDate = new Date(res.date)
        resDate.setHours(0, 0, 0, 0)
        return resDate >= today
    })
    
    const expiredReservations = mockReservation.filter(res => {
        const resDate = new Date(res.date)
        resDate.setHours(0, 0, 0, 0)
        return resDate < today
    })

    return (
        <div className="flex flex-col p-5 gap-5 w-full items-center">
            <nav className="flex flex-row items-center justify-between w-full">
                <Back/>
                <h1 className="text-2xl font-semibold">
                    {t('title')}
                </h1>
            </nav>
            <Tabs defaultValue="usable" className="w-full">
                <TabsList className="w-full mb-0">
                    <TabsTrigger value="usable" className="w-full">{t('tab_usable')}</TabsTrigger>
                    <TabsTrigger value="expired" className="w-full">{t('tab_expired')}</TabsTrigger>
                </TabsList>
                <TabsContent value="usable" className="mt-5 flex flex-col gap-y-4 data-[state=inactive]:mt-0">
                    {usableReservations.length === 0 ? (
                        <Empty/>
                    ) : (
                        usableReservations.map((reservation) => (
                            <div className={`flex flex-col 
                                bg-secondary
                                px-1 pb-1 rounded-lg
                                ${selectedReservation?._id === reservation._id ? 'bg-zinc-600' : 'bg-secondary'}
                                `} 
                                key={reservation._id}
                                onClick={() => handleReservationClick(reservation)}
                            >
                            <div className="flex flex-row justify-between px-3 pt-2 pb-1">
                                <h2 className="text-sm font-medium">
                                    {(() => {
                                        switch (reservation.status) {
                                            case "PROCESSING":
                                                return t('status.processing');
                                            case "CONFIRMED":
                                                return t('status.confirmed');
                                            case "CANCELLED":
                                                return t('status.cancelled');
                                            case "RELEASED":
                                                return t('status.released');
                                            default:
                                                return reservation.status; // Fallback for unexpected statuses
                                        }
                                    })()}
                                </h2>
                                    <div className="flex flex-row text-sm items-center leading-none">
                                        {t('view')}
                                        <ChevronRight size={18}/>
                                    </div>
                                </div>
                                <div className="flex flex-col px-2 py-2 gap-2 bg-background rounded-lg">
                                    <div className="flex flex-row justify-between items-center text-zinc-400 text-sm">
                                        <div className="flex flex-col gap-1">
                                            <p>{t('name')} <span className="font-medium text-white">{reservation.name}</span></p>
                                            <p>{t('person')} <span className="font-medium text-white">{reservation.person} {t('person_unit', { count: selectedReservation?.person })}</span></p>
                                        </div>
                                        <p>{t('table')}
                                            <span className="font-medium text-white ml-1">VIP1</span>
                                        </p>
                                    </div>
                                    <Separator orientation="horizontal"/>
                                    <div className="grid grid-cols-[35%_50%_15%] text-sm text-zinc-400">
                                        <div className="flex flex-row gap-2 items-center">
                                            <Calendar size={16}/>
                                            <p>
                                                {(() => {
                                                    const dateResult = formatDate(reservation.date);
                                                    switch (dateResult) {
                                                        case "today":
                                                            return t('date.today');
                                                        case "tomorrow":
                                                            return t('date.tomorrow');
                                                        default:
                                                        return dateResult;
                                                    }
                                                })()}
                                            </p>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <Phone size={16}/>
                                            <p>
                                                {formatPhoneNumber(reservation.phoneNumber)}
                                            </p>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center ">
                                            <Users size={16}/>
                                            <p>
                                                {reservation.person}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )))}
                </TabsContent>
                <TabsContent value="expired" className="mt-5 flex flex-col gap-y-4 data-[state=inactive]:mt-0">
                    {expiredReservations.length === 0 ? (
                        <Empty/>
                    ) : (
                        expiredReservations.map((reservation) => (
                            <div className={`flex flex-col 
                                bg-secondary px-1 pb-1 rounded-lg
                                ${selectedReservation?._id === reservation._id ? 'bg-zinc-600' : 'bg-secondary'}
                                `} 
                                key={reservation._id}
                                onClick={() => handleReservationClick(reservation)}
                            >
                            <div className="flex flex-row justify-between px-3 pt-2 pb-1">
                                <h2 className="text-sm font-medium">
                                    {(() => {
                                        switch (reservation.status) {
                                            case "PROCESSING":
                                                return t('status.processing');
                                            case "CONFIRMED":
                                                return t('status.confirmed');
                                            case "CANCELLED":
                                                return t('status.cancelled');
                                            case "RELEASED":
                                                return t('status.released');
                                            default:
                                                return reservation.status; // Fallback for unexpected statuses
                                        }
                                    })()}
                                </h2>
                                    <div className="flex flex-row text-sm items-center leading-none">
                                        {t('view')}
                                        <ChevronRight size={18}/>
                                    </div>
                                </div>
                                <div className="flex flex-col px-2 py-2 gap-2 bg-background rounded-lg">
                                    <div className="flex flex-row justify-between items-center text-zinc-400 text-sm">
                                        <div className="flex flex-col gap-1">
                                            <p>{t('name')} <span className="font-medium text-white">{reservation.name}</span></p>
                                            <p>{t('person')} <span className="font-medium text-white">{reservation.person} {t('person_unit', { count: selectedReservation?.person })}</span></p>
                                        </div>
                                        <p>{t('table')}
                                            <span className="font-medium text-white ml-1">VIP1</span>
                                        </p>
                                    </div>
                                    <Separator orientation="horizontal"/>
                                    <div className="grid grid-cols-[35%_50%_15%] text-sm text-zinc-400">
                                        <div className="flex flex-row gap-2 items-center">
                                            <Calendar size={16}/>
                                            <p>
                                                {(() => {
                                                    const dateResult = formatDate(reservation.date);
                                                    switch (dateResult) {
                                                        case "today":
                                                            return t('date.today');
                                                        case "tomorrow":
                                                            return t('date.tomorrow');
                                                        default:
                                                        return dateResult;
                                                    }
                                                })()}
                                            </p>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <Phone size={16}/>
                                            <p>
                                                {formatPhoneNumber(reservation.phoneNumber)}
                                            </p>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center ">
                                            <Users size={16}/>
                                            <p>
                                                {reservation.person}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )))}
                </TabsContent>
            </Tabs>
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} onClose={() => setSelectedReservation(null)}>
            <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle className="text-2xl">
                            {t('drawerTitle')}
                        </DrawerTitle>
                        <DrawerDescription>
                            {t('reservationId', { id: selectedReservation?._id })}
                        </DrawerDescription>
                    </DrawerHeader>
                    {selectedReservation && (
                        <div className="p-4">
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center">
                                    <h3 className={`text-lg font-medium
                                        px-2 py-1 rounded-lg ${(() => {
                                            switch (selectedReservation.status) {
                                            case "PROCESSING":
                                                return "bg-yellow-500 text-white";
                                            case "CONFIRMED":
                                                return "bg-green-500 text-white";
                                            case "CANCELLED":
                                                return "bg-red-500 text-white";
                                            case "RELEASED":
                                                return "bg-gray-500 text-white";
                                            default:
                                                return "bg-zinc-500 text-white"; // Default fallback color
                                            }
                                        })()}`}>
                                        {(() => {
                                            switch (selectedReservation.status) {
                                                case "PROCESSING":
                                                    return t('status.processing');
                                                case "CONFIRMED":
                                                    return t('status.confirmed');
                                                case "CANCELLED":
                                                    return t('status.cancelled');
                                                case "RELEASED":
                                                    return t('status.released');
                                                default:
                                                    return selectedReservation.status;
                                            }
                                        })()}
                                    </h3>
                                    <div className="flex flex-row font-semibold gap-2">
                                        <span className="px-2 py-1 bg-primary text-background rounded-lg">VIP1</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">{t('name')}</span>
                                        <span className="font-medium">{selectedReservation.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">{t('person')}</span>
                                        <span className="font-medium">{selectedReservation.person} {t('person_unit', { count: selectedReservation?.person })}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">{t('bookedDate')}</span>
                                        <span className="font-medium">
                                        {localeFormat.dateTime(new Date(selectedReservation.date), {
                                            weekday: 'long',
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">{t('phoneNumber')}</span>
                                        <span className="font-medium">{formatPhoneNumber(selectedReservation.phoneNumber)}</span>
                                    </div>
                                    <div className="flex justify-between gap-3">
                                        <span className="text-muted-foreground">{t('note')}</span>
                                        <span className="font-medium text-end">{selectedReservation.note ? selectedReservation.note : '-'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </DrawerContent>
            </Drawer>
        </div>
    );
}

export default ReservationPage;