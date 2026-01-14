import { ArrowRight, Leaf, Users, Calendar, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-nature.jpg";

const Hero = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: Users, value: "500+", label: t("hero.stats.members") },
    { icon: Leaf, value: "50+", label: t("hero.stats.projects") },
    { icon: Calendar, value: "3+", label: t("hero.stats.years") },
    { icon: Award, value: "25+", label: t("hero.stats.awards") },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Leaf className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-foreground">Tabiatni asraymiz</span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {t("hero.title").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-gradient-nature">{t("hero.title").split(" ").slice(-1)}</span>
            </motion.h1>

            <motion.p 
              className="text-lg text-muted-foreground max-w-lg leading-relaxed font-sans"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button asChild size="lg" className="gap-2 hover:scale-105 transition-transform">
                <Link to="/contact">
                  {t("hero.joinUs")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="hover:scale-105 transition-transform">
                <Link to="/about">{t("hero.learnMore")}</Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-card rounded-xl p-4 shadow-card text-center hover:shadow-elevated transition-all duration-300 group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <stat.icon className="h-6 w-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl font-mono font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-sans">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div 
              className="relative rounded-3xl overflow-hidden shadow-elevated"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={heroImage}
                alt="Tabiat manzarasi"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-eco-forest/30 to-transparent" />
            </motion.div>
            {/* Decorative Elements */}
            <motion.div 
              className="absolute -top-4 -right-4 w-24 h-24 bg-eco-sun rounded-full opacity-20 blur-2xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div 
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary rounded-full opacity-20 blur-3xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-secondary/50 to-transparent -z-10" />
    </section>
  );
};

export default Hero;
