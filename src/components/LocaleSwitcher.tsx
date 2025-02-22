'use client'
import {useLocale, useTranslations} from 'next-intl';
import {routing} from '@/i18n/routing';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import {Locale, usePathname, useRouter} from '@/i18n/routing';
import { useTransition } from 'react';
import {useParams} from 'next/navigation';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  
  const params = useParams();

  function onSelectChange(value: string) {
      const nextLocale = value as Locale;
      startTransition(() => {
        router.replace(
          // @ts-expect-error -- TypeScript will validate that only known `params`
          // are used in combination with a given `pathname`. Since the two will
          // always match for the current route, we can skip runtime checks.
          {pathname, params},
          {locale: nextLocale}
        );
      });
    }

  return (
    <Select 
        defaultValue={locale} 
        onValueChange={onSelectChange}
    >
        <SelectTrigger className='w-[100px]'>
            {t('label')}
        </SelectTrigger>
        <SelectContent>
            {routing.locales.map((cur) => (
            <SelectItem key={cur} value={cur}>
                {t('locale', { locale: cur })}
            </SelectItem>
            ))}
        </SelectContent>
    </Select>
  );
}