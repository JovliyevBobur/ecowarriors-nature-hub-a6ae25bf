import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import * as LucideIcons from "lucide-react";

interface FeatureItem {
  id: string;
  icon: string;
  title_uz: string;
  title_ru: string | null;
  title_en: string | null;
  description_uz: string;
  description_ru: string | null;
  description_en: string | null;
  sort_order: number;
  published: boolean;
}

const Features = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "uz" | "ru" | "en";

  const { data: features } = useQuery({
    queryKey: ["site-features"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_features")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as FeatureItem[];
    },
  });

  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
    return IconComponent || LucideIcons.Leaf;
  };

  const getTitle = (feature: FeatureItem) => {
    if (lang === "ru" && feature.title_ru) return feature.title_ru;
    if (lang === "en" && feature.title_en) return feature.title_en;
    return feature.title_uz;
  };

  const getDescription = (feature: FeatureItem) => {
    if (lang === "ru" && feature.description_ru) return feature.description_ru;
    if (lang === "en" && feature.description_en) return feature.description_en;
    return feature.description_uz;
  };

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            {t("features.title")}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Har sohada <span className="text-gradient">mukammallik</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("features.subtitle")}
          </p>
        </motion.div>

        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {features?.map((feature, index) => {
            const Icon = getIcon(feature.icon);
            return (
              <motion.div
                key={feature.id}
                className="group relative p-6 lg:p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ y: -5 }}
              >
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300" />
                
                <motion.div 
                  className="relative w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-5"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </motion.div>
                
                <h3 className="font-display font-semibold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                  {getTitle(feature)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{getDescription(feature)}</p>
                
                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary/5 rotate-45 group-hover:bg-primary/10 transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
