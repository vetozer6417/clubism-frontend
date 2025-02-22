'use client'
import {useTranslations} from 'next-intl';
import { Calendar1, ChevronRight, Clock8, MapPin, Ticket, TicketCheck, UserRound } from 'lucide-react';
import LocaleSwitcher from "@/components/LocaleSwitcher";
import MainBanner from '@/components/home/MainBanner';
import EventSlider from '@/components/home/EventSlider';
import Reservation from '@/components/home/Reservation';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/routing';

export default function Home() {
  const t = useTranslations('HomePage')
  const name = "philter room";
  const router = useRouter()

  return (
    <div className="flex flex-col items-center flex-grow w-full relative">
        <section 
          className="
          flex flex-col gap-2 w-full h-[270px] p-5 
          bg-gradient-to-t from-indigo-950 to-black"
        >
          <div className="grid grid-cols-3 justify-between items-center">
            <h1 className={`
              col-span-2 text-white text-3xl font-semibold truncate 
              ${name.length > 13 ? 'text-2xl' : 'text-3xl'}`
            }>
              {name}
            </h1>
            <div className='col-span-1 justify-self-end'>
              <LocaleSwitcher/>
            </div>
          </div>
          <div className='flex flex-col text-gray-400 text-sm gap-1'>
            <div className='flex flex-row items-center gap-1'>
              <MapPin size={20}/>
              <p>Banthat Thong, Bangkok</p>
            </div>
            <div className='flex flex-row items-center gap-1'>
              <Clock8 size={20}/>
              <p>Everyday 7:00 PM - 2:00 AM</p>
            </div>
          </div>
        </section>
        
        {/* Overlay Banner */}
        <div className='w-full aspect-video px-5 absolute z-10 top-[130px]'>
          <MainBanner imageUrl='/main-banner.jpg'/>
        </div>

        <section className='w-full flex flex-col gap-3 pb-5 pt-[calc(100vh/8.7)] md:pt-[calc(100vh/7)] text-white overflow-hidden'>
          <div className="flex flex-row items-center justify-between gap-2 px-5">
            <div className='flex flex-row gap-2'>
              <Calendar1 size={24}/>
              <h2 className='font-semibold text-lg'>{t('events.title')}</h2>
            </div>
            <button 
              className='flex flex-row gap-1 text-sm items-start text-zinc-300 hover:cursor-pointer'
              onClick={() => router.push('/events')}
            >
              <p>{t('events.button')}</p>
              <ChevronRight size={20}/>
            </button>
          </div>
          <EventSlider/>
        </section>

        <section className='w-full flex flex-col gap-3 px-5 pb-5 text-white overflow-hidden'>
          <div className='flex flex-row gap-2'>
            <Ticket size={26}/>
            <h2 className='font-semibold text-lg'>{t('reservation.title')}</h2>
          </div>
          <Reservation/>
        </section>

        <section className='w-full flex flex-col gap-3 px-5 pb-5 text-white overflow-hidden'>
          <div className='flex flex-row gap-2'>
            <UserRound size={26}/>
            <h2 className='font-semibold text-lg'>{t('profile.title')}</h2>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <Button 
              className='flex flex-row gap-3 h-[75px] text-lg text-left leading-none font-medium whitespace-normal [&_svg]:pointer-events-none [&_svg]:size-7 [&_svg]:shrink-0 bg-secondary/30' 
              variant='outline'>
              <TicketCheck/>
              {
                t.rich('profile.button1.title', {
                  br: () => <br />
                })
              }
            </Button>
            <Button 
              className='flex flex-row gap-2 h-[75px] text-lg font-medium whitespace-normal [&_svg]:pointer-events-none [&_svg]:size-7 [&_svg]:shrink-0 bg-secondary/30' 
              variant='outline'>
              <MapPin/>
              {t('profile.button2.title')}
            </Button>
          </div>
        </section>
    </div>
  );
}
