import { ArrowRight, Leaf, Users, Calendar, Award, TreePine, Globe, Sparkles, Star, Sun, Moon, Cloud } from "lucide-react";
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

  // Floating space objects
  const floatingObjects = [
    { icon: TreePine, className: "top-[10%] left-[5%] w-8 h-8 text-primary/30", duration: 15, delay: 0 },
    { icon: Leaf, className: "top-[20%] right-[10%] w-6 h-6 text-eco-moss/40", duration: 12, delay: 1 },
    { icon: Globe, className: "top-[60%] left-[8%] w-10 h-10 text-eco-sky/30", duration: 18, delay: 2 },
    { icon: Sparkles, className: "top-[15%] left-[25%] w-5 h-5 text-eco-sun/50", duration: 10, delay: 0.5 },
    { icon: Star, className: "top-[40%] right-[5%] w-7 h-7 text-primary/25", duration: 14, delay: 3 },
    { icon: Sun, className: "bottom-[30%] left-[15%] w-12 h-12 text-eco-sun/20", duration: 20, delay: 1.5 },
    { icon: Cloud, className: "top-[5%] right-[25%] w-14 h-14 text-muted-foreground/15", duration: 25, delay: 4 },
    { icon: Leaf, className: "bottom-[20%] right-[15%] w-6 h-6 text-primary/35", duration: 11, delay: 2.5 },
    { icon: TreePine, className: "top-[50%] left-[3%] w-9 h-9 text-eco-moss/25", duration: 16, delay: 0.8 },
    { icon: Star, className: "bottom-[10%] left-[30%] w-4 h-4 text-eco-sun/40", duration: 13, delay: 3.5 },
    { icon: Globe, className: "top-[35%] right-[20%] w-8 h-8 text-eco-sky/20", duration: 17, delay: 1.2 },
    { icon: Sparkles, className: "bottom-[40%] right-[8%] w-5 h-5 text-primary/30", duration: 9, delay: 4.5 },
    { icon: Moon, className: "top-[70%] right-[30%] w-7 h-7 text-muted-foreground/20", duration: 22, delay: 2.8 },
    { icon: Cloud, className: "bottom-[50%] left-[20%] w-10 h-10 text-muted-foreground/10", duration: 28, delay: 5 },
    { icon: Leaf, className: "top-[80%] left-[10%] w-5 h-5 text-primary/40", duration: 14, delay: 1.8 },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentcolor 1px, transparent 0px)', 
            backgroundSize: '40px 40px' 
          }}
        />
      </div>
      
      {/* Floating Space Objects */}
      {floatingObjects.map((obj, index) => (
        <motion.div
          key={index}
          className={`absolute ${obj.className} pointer-events-none`}
          animate={{ 
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: obj.duration, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: obj.delay,
          }}
        >
          <obj.icon className="w-full h-full" />
        </motion.div>
      ))}

      {/* Floating Blobs */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        animate={{ y: [-20, 20, -20], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        animate={{ y: [20, -20, 20], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/2 right-1/3 w-48 h-48 bg-eco-sky/5 rounded-full blur-3xl"
        animate={{ x: [-20, 20, -20], y: [10, -10, 10] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 py-12 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div 
            className="space-y-6 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h1 
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span>Yashil </span>
              <span className="text-gradient">kelajak </span>
              <span>uchun birga</span>
            </motion.h1>

            <motion.p 
              className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button asChild size="lg" className="gap-2 bg-gradient-primary shadow-lg hover:shadow-xl btn-hover h-12 rounded-lg px-8">
                <Link to="/contact">
                  {t("hero.joinUs")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground h-12 rounded-lg px-8 btn-hover">
                <Link to="/about">{t("hero.learnMore")}</Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-4 rounded-xl bg-card shadow-sm border border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                  <div className="font-display font-bold text-2xl text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative z-10">
              <div className="absolute -inset-4 bg-gradient-primary rounded-3xl opacity-20 blur-2xl" />
              <motion.img
                src={heroImage}
                alt="EcoWarriors"
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            {/* Decorative Elements */}
            <motion.div 
              className="absolute -top-8 -right-8 w-24 h-24 border-4 border-primary/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/20 rounded-xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;