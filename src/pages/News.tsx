import { Calendar, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton";

const News = () => {
  const { language } = useLanguage();
  const { t } = useTranslation();

  const { data: newsItems, isLoading } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const getLocalizedField = (item: any, field: string): string => {
    const localizedField = `${field}_${language}`;
    return item[localizedField] || item[`${field}_uz`] || '';
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-secondary rounded-full text-sm font-medium text-primary mb-4">
              {t('news.badge')}
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              {t('news.title')} <span className="text-gradient-nature">{t('news.titleHighlight')}</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('news.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-card border border-border">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6">
                    <Skeleton className="h-4 w-24 mb-3" />
                    <Skeleton className="h-6 w-full mb-3" />
                    <Skeleton className="h-16 w-full mb-4" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              ))}
            </div>
          ) : newsItems && newsItems.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsItems.map((item) => (
                <article
                  key={item.id}
                  className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border hover:shadow-elevated transition-all duration-300"
                >
                  <div className="h-48 bg-gradient-nature relative overflow-hidden">
                    {item.image_url ? (
                      <img 
                        src={item.image_url} 
                        alt={getLocalizedField(item, 'title')}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl opacity-30">🌿</span>
                      </div>
                    )}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-card/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <time>{new Date(item.created_at).toLocaleDateString("uz-UZ")}</time>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {getLocalizedField(item, 'title')}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                      {getLocalizedField(item, 'content')}
                    </p>
                    <Button variant="ghost" size="sm" className="gap-2 p-0 h-auto text-primary hover:bg-transparent">
                      {t('news.readMore')}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <span className="text-6xl mb-4 block">📰</span>
              <p className="text-muted-foreground">{t('common.noData')}</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default News;
