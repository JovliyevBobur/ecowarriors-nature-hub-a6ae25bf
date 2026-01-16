-- Site settings table for Hero and CTA content
CREATE TABLE public.site_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    key text UNIQUE NOT NULL,
    value jsonb NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view site settings" 
ON public.site_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can insert site settings" 
ON public.site_settings 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update site settings" 
ON public.site_settings 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete site settings" 
ON public.site_settings 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Site features table
CREATE TABLE public.site_features (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    icon text NOT NULL,
    title_uz text NOT NULL,
    title_ru text,
    title_en text,
    description_uz text NOT NULL,
    description_ru text,
    description_en text,
    sort_order integer NOT NULL DEFAULT 0,
    published boolean NOT NULL DEFAULT true,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_features ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view published features" 
ON public.site_features 
FOR SELECT 
USING (published = true);

CREATE POLICY "Admins can view all features" 
ON public.site_features 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert features" 
ON public.site_features 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update features" 
ON public.site_features 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete features" 
ON public.site_features 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_features_updated_at
BEFORE UPDATE ON public.site_features
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default site settings
INSERT INTO public.site_settings (key, value) VALUES 
('hero', '{
    "title_uz": "Yashil Kelajak Uchun Birga",
    "title_ru": "Вместе за зелёное будущее",
    "title_en": "Together for a Green Future",
    "subtitle_uz": "Biz tabiatni muhofaza qilish va atrof-muhitni yaxshilash uchun birgalikda harakat qilamiz",
    "subtitle_ru": "Мы действуем вместе для защиты природы и улучшения окружающей среды",
    "subtitle_en": "We act together to protect nature and improve the environment",
    "stats": {
        "members": 500,
        "projects": 50,
        "years": 5,
        "awards": 15
    }
}'::jsonb),
('cta', '{
    "title_uz": "Bizga Qo''shiling",
    "title_ru": "Присоединяйтесь к нам",
    "title_en": "Join Us",
    "subtitle_uz": "Tabiatni muhofaza qilish harakatiga hoziroq qo''shiling",
    "subtitle_ru": "Присоединяйтесь к движению защиты природы прямо сейчас",
    "subtitle_en": "Join the nature conservation movement right now"
}'::jsonb);

-- Insert default features
INSERT INTO public.site_features (icon, title_uz, title_ru, title_en, description_uz, description_ru, description_en, sort_order) VALUES
('Leaf', 'Ekologik Ta''lim', 'Экологическое образование', 'Ecological Education', 'Yoshlarga ekologik bilim va ko''nikmalarni o''rgatamiz', 'Обучаем молодежь экологическим знаниям и навыкам', 'We teach ecological knowledge and skills to young people', 1),
('Recycle', 'Qayta Ishlash', 'Переработка', 'Recycling', 'Chiqindilarni qayta ishlash va saralash loyihalari', 'Проекты по переработке и сортировке отходов', 'Waste recycling and sorting projects', 2),
('TreePine', 'Daraxt Ekish', 'Посадка деревьев', 'Tree Planting', 'Har yili minglab daraxtlar ekamiz', 'Каждый год сажаем тысячи деревьев', 'We plant thousands of trees every year', 3),
('Users', 'Jamoa Ishi', 'Командная работа', 'Teamwork', 'Birgalikda katta maqsadlarga erishamiz', 'Вместе достигаем больших целей', 'Together we achieve great goals', 4),
('Award', 'Mukofotlar', 'Награды', 'Awards', 'Xalqaro va mahalliy tanlovlarda g''olib bo''lamiz', 'Побеждаем в международных и местных конкурсах', 'We win international and local competitions', 5),
('Globe', 'Global Tarmoq', 'Глобальная сеть', 'Global Network', 'Dunyo bo''ylab ekologik tashkilotlar bilan hamkorlik', 'Сотрудничество с экологическими организациями по всему миру', 'Cooperation with environmental organizations around the world', 6);