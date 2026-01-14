import { ArrowRight, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-nature.jpg";

const CTA = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 lg:py-28 bg-gradient-primary relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-background/60 backdrop-blur-md" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0px)', 
            backgroundSize: '32px 32px' 
          }}
        />
      </div>
      
      {/* Floating elements */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t("cta.title")}
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {t("cta.subtitle")}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg h-12 rounded-lg px-8 btn-hover">
              <Link to="/contact">
                {t("cta.joinButton")}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-foreground text-background border-2 border-foreground hover:bg-foreground/90 shadow-lg h-12 rounded-lg px-8 btn-hover">
              <Link to="/about">{t("hero.learnMore")}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
