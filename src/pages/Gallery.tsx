import { useState, useMemo } from "react";
import { X } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { language } = useLanguage();
  const { t } = useTranslation();

  const { data: galleryImages, isLoading } = useQuery({
    queryKey: ['gallery'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const categories = useMemo(() => {
    if (!galleryImages) return [{ key: "all", label: t('gallery.all') }];
    const uniqueCategories = [...new Set(galleryImages.map(img => img.category))];
    return [
      { key: "all", label: t('gallery.all') },
      ...uniqueCategories.map(cat => ({ key: cat, label: cat }))
    ];
  }, [galleryImages, t]);

  const filteredImages = useMemo(() => {
    if (!galleryImages) return [];
    if (selectedCategory === "all") return galleryImages;
    return galleryImages.filter((img) => img.category === selectedCategory);
  }, [galleryImages, selectedCategory]);

  const getLocalizedField = (item: any, field: string): string => {
    const localizedField = `${field}_${language}`;
    return item[localizedField] || item[`${field}_uz`] || '';
  };

  const selectedImageData = galleryImages?.find(img => img.id === selectedImage);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-secondary rounded-full text-sm font-medium text-primary mb-4">
              {t('gallery.badge')}
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              {t('gallery.title')} <span className="text-gradient-nature">{t('gallery.titleHighlight')}</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('gallery.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Skeleton key={i} className="aspect-square rounded-xl" />
              ))}
            </div>
          ) : filteredImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  onClick={() => setSelectedImage(image.id)}
                  className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative shadow-card hover:shadow-elevated transition-all duration-300"
                >
                  <img 
                    src={image.image_url} 
                    alt={getLocalizedField(image, 'title')}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent">
                    <span className="text-background text-sm font-medium">{image.category}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <span className="text-6xl mb-4 block">📷</span>
              <p className="text-muted-foreground">{t('common.noData')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && selectedImageData && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-5 w-5 text-foreground" />
          </button>
          <div className="w-full max-w-4xl">
            <img 
              src={selectedImageData.image_url} 
              alt={getLocalizedField(selectedImageData, 'title')}
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
            />
            <p className="text-center text-background mt-4 text-lg font-medium">
              {getLocalizedField(selectedImageData, 'title')}
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
