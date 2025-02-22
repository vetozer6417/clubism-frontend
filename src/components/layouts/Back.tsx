'use client'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

function Back() {
    const t = useTranslations('Back')
    const router = useRouter()
    return (
        <Button 
            variant='outline' 
            className='h-fit rounded-full'
            onClick={() => router.back()}
        >
                <ChevronLeft size={30} />
                {t('back')}
        </Button>
    );
}

export default Back;