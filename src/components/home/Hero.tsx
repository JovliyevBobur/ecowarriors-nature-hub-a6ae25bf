import { ArrowRight, Leaf, Users, Calendar, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-nature.jpg";

const stats = [
  { icon: Users, value: "500+", label: "A'zolar" },
  { icon: Leaf, value: "50+", label: "Loyihalar" },
  { icon: Calendar, value: "3+", label: "Yillik tajriba" },
  { icon: Award, value: "25+", label: "Mukofotlar" },
];

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-slide-in-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full">
              <Leaf className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Tabiatni asraymiz</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">
              Yashil <span className="text-gradient-nature">kelajak</span> uchun birga
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              EcoWarriors - tabiatni muhofaza qilish va ekologik madaniyatni targ'ib qilish
              yo'lida faoliyat yurituvchi ko'ngilli tashkilot. Keling, sayyoramizni birga
              asraymiz!
            </p>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link to="/contact">
                  Biz bilan bog'laning
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">Ko'proq o'rganish</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-4 shadow-card text-center"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-slide-in-right">
            <div className="relative rounded-3xl overflow-hidden shadow-elevated">
              <img
                src={heroImage}
                alt="Tabiat manzarasi"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-eco-forest/30 to-transparent" />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-eco-sun rounded-full opacity-20 blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary rounded-full opacity-20 blur-3xl" />
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-secondary/50 to-transparent -z-10" />
    </section>
  );
};

export default Hero;
