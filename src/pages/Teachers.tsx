import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const Teachers = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const { data: teachers, isLoading } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("teachers")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  const getLocalizedField = (item: any, field: string) => {
    const langField = `${field}_${language}`;
    return item[langField] || item[`${field}_uz`] || "";
  };

  return (
    <Layout>
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              {t("teachers.title")}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("teachers.subtitle")}
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-card">
                  <Skeleton className="h-64 w-full" />
                  <div className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : teachers && teachers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teachers.map((teacher, index) => (
                <motion.div
                  key={teacher.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-card border border-border hover:shadow-elevated transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={teacher.image_url || "/placeholder.svg"}
                      alt={teacher.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {teacher.name}
                    </h3>
                    <p className="text-primary font-medium mb-3">
                      {getLocalizedField(teacher, "position")}
                    </p>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {getLocalizedField(teacher, "bio")}
                    </p>
                    <div className="flex gap-2">
                      {teacher.email && (
                        <a href={`mailto:${teacher.email}`}>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Mail className="h-4 w-4" />
                            Email
                          </Button>
                        </a>
                      )}
                      {teacher.phone && (
                        <a href={`tel:${teacher.phone}`}>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Phone className="h-4 w-4" />
                            {t("teachers.contact")}
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t("common.noData")}</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Teachers;
