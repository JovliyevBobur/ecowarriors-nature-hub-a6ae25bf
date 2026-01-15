import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";
import { Newspaper, Calendar, Image, Users } from "lucide-react";
import { motion } from "framer-motion";

const DashboardHome = () => {
  const { t } = useTranslation();

  const { data: newsCount } = useQuery({
    queryKey: ["admin-news-count"],
    queryFn: async () => {
      const { count } = await supabase.from("news").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: eventsCount } = useQuery({
    queryKey: ["admin-events-count"],
    queryFn: async () => {
      const { count } = await supabase.from("events").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: galleryCount } = useQuery({
    queryKey: ["admin-gallery-count"],
    queryFn: async () => {
      const { count } = await supabase.from("gallery").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: teachersCount } = useQuery({
    queryKey: ["admin-teachers-count"],
    queryFn: async () => {
      const { count } = await supabase.from("teachers").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const stats = [
    { label: t("admin.totalNews"), count: newsCount ?? 0, icon: Newspaper, color: "bg-primary" },
    { label: t("admin.totalEvents"), count: eventsCount ?? 0, icon: Calendar, color: "bg-eco-sky" },
    { label: t("admin.totalGallery"), count: galleryCount ?? 0, icon: Image, color: "bg-eco-sun" },
    { label: t("admin.totalTeachers"), count: teachersCount ?? 0, icon: Users, color: "bg-eco-moss" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-foreground mb-6">{t("admin.dashboard")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-card rounded-xl p-6 shadow-card border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
              <stat.icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-3xl font-display font-bold text-foreground">{stat.count}</h3>
            <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;