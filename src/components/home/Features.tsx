import { TreePine, Recycle, Droplets, Sun, Wind, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: TreePine,
      title: t("features.treePlanting"),
      description: t("features.treePlantingDesc"),
    },
    {
      icon: Recycle,
      title: t("features.recycling"),
      description: t("features.recyclingDesc"),
    },
    {
      icon: Droplets,
      title: "Suv resurslari",
      description: "Suv havzalarini tozalash va suv resurslarini tejash loyihalari.",
    },
    {
      icon: Sun,
      title: "Quyosh energiyasi",
      description: "Yangilanadigan energiya manbalarini targ'ib qilish va joriy etish.",
    },
    {
      icon: Wind,
      title: t("features.cleanup"),
      description: t("features.cleanupDesc"),
    },
    {
      icon: Heart,
      title: t("features.education"),
      description: t("features.educationDesc"),
    },
  ];

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
            Nega bizni tanlash kerak
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
          {features.map((feature, index) => (
            <motion.div
              key={index}
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
                <feature.icon className="h-6 w-6 text-primary-foreground" />
              </motion.div>
              
              <h3 className="font-display font-semibold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              
              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary/5 rotate-45 group-hover:bg-primary/10 transition-colors" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
