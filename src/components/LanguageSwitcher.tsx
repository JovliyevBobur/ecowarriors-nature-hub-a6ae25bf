import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import uzFlag from '@/assets/flags/uz.png';
import ruFlag from '@/assets/flags/ru.png';
import enFlag from '@/assets/flags/en.png';

const flagImages: Record<string, string> = {
  uz: uzFlag,
  ru: ruFlag,
  en: enFlag,
};

export const LanguageSwitcher = () => {
  const { language, setLanguage, languages } = useLanguage();
  const currentLang = languages.find((l) => l.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 hover:scale-105 transition-transform">
          <motion.img 
            src={flagImages[language]} 
            alt={currentLang?.name} 
            className="h-5 w-5 rounded-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          />
          <span className="hidden sm:inline text-sm font-medium">{currentLang?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover border-border z-50">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer gap-3 ${language === lang.code ? 'bg-primary/10' : ''}`}
          >
            <img 
              src={flagImages[lang.code]} 
              alt={lang.name} 
              className="h-5 w-5 rounded-full object-cover"
            />
            <span className="font-medium">{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
