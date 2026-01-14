import { Calendar, MapPin, Clock, Users } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const upcomingEvents = [
  {
    id: 1,
    title: "Yangi yil tadbiri",
    category: "Cultural",
    date: "2025-12-26",
    time: "10:00 AM",
    location: "Main Hall",
    description: "Bayramona sahna ko'rinishlari va tantanali yangi yil dasturi.",
  },
  {
    id: 2,
    title: "Fizika fani tadbiri",
    category: "Academic",
    date: "2025-12-18",
    time: "10:00 AM",
    location: "Laboratory",
    description: "Fizika fanining amaliy ahamiyatiga bag'ishlangan tadbir.",
  },
  {
    id: 3,
    title: "Kimyo fani tadbiri",
    category: "Academic",
    date: "2025-12-20",
    time: "10:00 AM",
    location: "Laboratory",
    description: "Qiziqarli tajribalar va ilmiy ko'rgazmalar.",
  },
  {
    id: 4,
    title: "Matematika fani tadbiri",
    category: "Academic",
    date: "2025-12-16",
    time: "10:00 AM",
    location: "STEM Room",
    description: "Aniq fanlarga qiziqishni oshirishga qaratilgan bellashuvlar.",
  },
  {
    id: 5,
    title: '"Zakovat" intellektual o\'yini',
    category: "Academic",
    date: "2025-12-12",
    time: "14:00 PM",
    location: "Assembly Hall",
    description: "Bilim va mantiqiy fikrlashga asoslangan tanlov.",
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Cultural":
      return "bg-rose-500";
    case "Academic":
      return "bg-cyan-500";
    case "Sports":
      return "bg-emerald-500";
    default:
      return "bg-primary";
  }
};

const Events = () => {
  const { t } = useTranslation();

  // Sort events by date
  const sortedEvents = [...upcomingEvents].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
            <p className="text-lg text-muted-foreground font-sans">
              {t("events.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Events */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-cyan-500 to-primary hidden md:block" />

            {/* Events */}
            <div className="space-y-12">
              {sortedEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Event Card */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <motion.div
                      className="bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-elevated transition-all duration-300 group"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3 ${getCategoryColor(event.category)}`}>
                        {event.category}
                      </span>
                      <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 font-sans">{event.description}</p>
                      <div className={`flex flex-wrap gap-4 text-sm text-muted-foreground ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="font-mono">{event.time}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="font-sans">{event.location}</span>
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="relative z-10 hidden md:flex items-center justify-center">
                    <motion.div
                      className="w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50"
                      whileHover={{ scale: 1.5 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>

                  {/* Date */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                    <motion.p 
                      className="text-primary font-display font-semibold text-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      {formatDate(event.date)}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Events;
