import { Calendar, MapPin, Clock, CheckCircle, Circle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Events = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("published", true)
        .order("event_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const getLocalizedField = (item: any, field: string): string => {
    const langField = `${field}_${language}`;
    return item[langField] || item[`${field}_uz`] || "";
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === "uz" ? "uz-UZ" : language === "ru" ? "ru-RU" : "en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString(language === "uz" ? "uz-UZ" : language === "ru" ? "ru-RU" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const completedEvents = events?.filter((e) => e.completed) || [];
  const upcomingEvents = events?.filter((e) => !e.completed) || [];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 bg-secondary rounded-full text-sm font-medium text-primary mb-4">
              {t("events.badge")}
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              {t("events.title")} <span className="text-gradient-nature">{t("events.titleHighlight")}</span>
            </h1>
            <p className="text-lg text-muted-foreground font-sans">{t("events.subtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* Events Tabs */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="upcoming" className="gap-2">
                <Circle className="h-4 w-4" />
                {t("events.upcoming")} ({upcomingEvents.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="gap-2">
                <CheckCircle className="h-4 w-4" />
                {t("events.past")} ({completedEvents.length})
              </TabsTrigger>
            </TabsList>

            {isLoading ? (
              <div className="space-y-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-8">
                    <Skeleton className="w-5/12 h-40 rounded-2xl" />
                    <Skeleton className="w-4 h-4 rounded-full" />
                    <Skeleton className="w-5/12 h-8" />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <TabsContent value="upcoming">
                  <EventsList events={upcomingEvents} getLocalizedField={getLocalizedField} formatDate={formatDate} formatTime={formatTime} t={t} isCompleted={false} />
                </TabsContent>
                <TabsContent value="completed">
                  <EventsList events={completedEvents} getLocalizedField={getLocalizedField} formatDate={formatDate} formatTime={formatTime} t={t} isCompleted={true} />
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

interface EventsListProps {
  events: any[];
  getLocalizedField: (item: any, field: string) => string;
  formatDate: (dateStr: string) => string;
  formatTime: (dateStr: string) => string;
  t: (key: string) => string;
  isCompleted: boolean;
}

const EventsList = ({ events, getLocalizedField, formatDate, formatTime, t, isCompleted }: EventsListProps) => {
  if (events.length === 0) {
    return <p className="text-muted-foreground text-center py-12">{t("common.noData")}</p>;
  }

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

      <div className="space-y-12">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Event Card */}
            <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
              <motion.div
                className={`rounded-2xl p-6 shadow-card border transition-all duration-300 group ${
                  isCompleted
                    ? "bg-primary/5 border-primary/30"
                    : "bg-card border-border hover:shadow-elevated"
                }`}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {event.image_url && (
                  <img
                    src={event.image_url}
                    alt={getLocalizedField(event, "title")}
                    className="w-full h-40 object-cover rounded-xl mb-4"
                  />
                )}
                <div className="flex items-center gap-2 mb-3">
                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                      <CheckCircle className="h-3 w-3" />
                      {t("events.completed")}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-eco-sun/20 text-eco-sun">
                      <Circle className="h-3 w-3" />
                      {t("events.inProgress")}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {getLocalizedField(event, "title")}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 font-sans">
                  {getLocalizedField(event, "description")}
                </p>
                <div
                  className={`flex flex-wrap gap-4 text-sm text-muted-foreground ${
                    index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-mono">{formatTime(event.event_date)}</span>
                  </span>
                  {event.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-sans">{event.location}</span>
                    </span>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Timeline Dot */}
            <div className="relative z-10 hidden md:flex items-center justify-center">
              <motion.div
                className={`w-4 h-4 rounded-full shadow-lg ${
                  isCompleted ? "bg-primary shadow-primary/50" : "bg-eco-sun shadow-eco-sun/50"
                }`}
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* Date */}
            <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
              <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                <Calendar className="h-5 w-5 text-primary" />
                <p className="text-primary font-display font-semibold text-lg">{formatDate(event.event_date)}</p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Events;