'use client'
import { format } from 'date-fns'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Back from "@/components/layouts/Back";
import * as z from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"  
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useFormatter, useTranslations } from 'next-intl';
import { useState } from 'react';
import formatPhoneNumber from '@/lib/format';

function ReservePage() {
    const t = useTranslations('Reserve')
    const localeFormat = useFormatter()

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState<FormValues | null>(null);

    const formSchema = z.object({
        name: z.string().min(2, t('name.error1')).max(50, t('name.error2')),
        amount: z.number({
            required_error: t('amount.error1'),
            invalid_type_error: t('amount.error2')
        }).min(1, t('amount.error3')).max(15, t('amount.error4')),
        date: z.date({
            required_error: t('date.error')
        }),
        phoneNumber: z.string()
            .min(9, t('phoneNumber.error'))
            .max(10, t('phoneNumber.error'))
            .regex(/^0\d{8,9}$/, t('phoneNumber.error')),
        note: z.string().max(100, t('note.error')).optional(),
    })

    type FormValues = z.infer<typeof formSchema>

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            amount: 1, // or 0, depending on your needs
            date: undefined,
            phoneNumber: '',
            note: ''
        }
    })

    function onSubmit(data: FormValues) {
        setFormData(data);
        setIsDialogOpen(true);
    }

    function handleDialogSubmit() {
        console.log(formData);
        setIsDialogOpen(false);
        form.reset()
    }
    
    return (
        <div className="flex flex-col p-5 gap-5 w-full items-center">
            <nav className="flex flex-row items-center justify-between w-full">
                <Back/>
                <h1 className="text-2xl font-semibold">
                    {t('title')}
                </h1>
            </nav>
            <div className="flex flex-col w-full">
            <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name Field */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('name.label')}</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder={t('name.placeholder')} 
                                            {...field} 
                                            className='bg-secondary/30'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='grid grid-cols-2 gap-5'>
                            {/* Amount Field */}
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('amount.label')}</FormLabel>
                                        <FormControl>
                                            <div className="flex flex-row items-center gap-2">
                                                <Button
                                                    type="button"
                                                    onClick={() => field.onChange(Math.max(0, (field.value || 0) - 1))} // Decrement, ensure >= 0
                                                    disabled={(field.value || 0) <= 0} // Disable if value is 0
                                                    variant='outline'
                                                    className="bg-secondary/30"
                                                >
                                                    -
                                                </Button>
                                                <Input 
                                                    type="number" 
                                                    placeholder={t('amount.placeholder')} 
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                    min={1}
                                                    max={15}
                                                    className='bg-secondary/30'
                                                />
                                                <Button
                                                    type="button"
                                                    onClick={() => field.onChange(Math.min(15, (field.value || 0) + 1))} // Increment, ensure <= 15
                                                    disabled={(field.value || 0) >= 15} // Disable if value is 15
                                                    variant='outline'
                                                    className="bg-secondary/30 hover:bg-secondary/50"
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Date Field */}
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('date.label')}</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full justify-start text-left font-normal bg-secondary/30",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-1 h-4 w-4" />
                                                        {field.value ? (
                                                            format(field.value, "dd/MM/yyyy")
                                                        ) : (
                                                            <span>{t('date.placeholder')}</span>
                                                        )}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date(new Date().setHours(0, 0, 0, 0))
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Phone Number Field */}
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('phoneNumber.label')}</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="tel" 
                                            pattern='[0-9]*'
                                            maxLength={10}
                                            placeholder={t('phoneNumber.placeholder')} {...field} 
                                            className='bg-secondary/30'
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        {t('phoneNumber.description')}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Note Field */}
                        <FormField
                            control={form.control}
                            name="note"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('note.label')}</FormLabel>
                                    <FormControl>
                                        <Textarea 
                                            className='bg-secondary/30'
                                            placeholder={t('note.placeholder')} 
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">
                            {t('submit')}
                        </Button>
                    </form>
                </Form>
            </div>
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger asChild>
                    <Button className="hidden">Open</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className='text-2xl'>{t('alert.title')}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {t('alert.description1')}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className='grid grid-cols-[1fr_1.5fr] w-full gap-x-4 gap-y-2 break-words mt-2'>
                        <div className='px-2 bg-zinc-800 text-white font-medium w-fit h-fit rounded justify-self-end'>
                            {t('name.label')}
                        </div>
                        <div className='text-left text-zinc-400'>
                            {formData?.name}
                        </div>
                        <div className='px-2 bg-zinc-800 text-white font-medium w-fit h-fit rounded justify-self-end'>
                            {t('amount.label')}
                        </div>
                        <div className='text-left text-zinc-400'>
                            {formData?.amount} {t('alert.amount_unit')}
                        </div>
                        <div className='px-2 bg-zinc-800 text-white font-medium w-fit h-fit rounded justify-self-end'>
                            {t('date.label')}
                        </div>
                        <div className='text-left text-zinc-400'>
                            {formData?.date ? localeFormat.dateTime(formData.date, {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            }) : ''}
                        </div>
                        <div className='px-2 bg-zinc-800 text-white font-medium w-fit h-fit rounded justify-self-end'>
                            {t('alert.phoneNumber')}
                        </div>
                        <div className='text-left text-zinc-400'>
                            {formatPhoneNumber(formData?.phoneNumber || 'N/A')}
                        </div>
                        <div className='px-2 bg-zinc-800 text-white font-medium w-fit h-fit rounded justify-self-end'>
                            {t('note.label')}
                        </div>
                        <div className='text-left text-zinc-400'>
                            {formData?.note ? formData?.note : '-'}
                        </div>
                    </div>
                    <div className='w-full flex justify-center'>
                        <span className='px-2 rounded text-red-200 bg-red-900 w-fit font-medium'>
                            {t('alert.description2', { time: "20:30"})}
                        </span>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>{t('alert.cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDialogSubmit}>{t('alert.continue')}</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default ReservePage;