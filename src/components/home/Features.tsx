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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1 bg-secondary rounded-full text-sm font-medium text-primary mb-4">
            {t("features.title")}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Har sohada <span className="text-gradient-nature">mukammallik</span>
          </h2>
          <p className="text-muted-foreground font-sans">
            {t("features.subtitle")}
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group p-6 bg-card rounded-2xl shadow-card hover:shadow-elevated transition-all duration-300 border border-border hover:border-primary/30"
            >
              <motion.div 
                className="w-14 h-14 rounded-xl bg-gradient-nature flex items-center justify-center mb-5"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className="h-7 w-7 text-primary-foreground" />
              </motion.div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed font-sans">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
