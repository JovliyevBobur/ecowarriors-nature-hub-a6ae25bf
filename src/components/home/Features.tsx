import { TreePine, Recycle, Droplets, Sun, Wind, Heart } from "lucide-react";

const features = [
  {
    icon: TreePine,
    title: "Daraxt ekish",
    description: "Har yili minglab daraxtlar ekib, yashil muhitni kengaytiramiz.",
  },
  {
    icon: Recycle,
    title: "Chiqindilarni qayta ishlash",
    description: "Plastik va boshqa chiqindilarni to'plab, qayta ishlash jarayoniga topshiramiz.",
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
    title: "Toza havo",
    description: "Havo sifatini yaxshilash va ifloslanishni kamaytirish tadbirlari.",
  },
  {
    icon: Heart,
    title: "Ekologik ta'lim",
    description: "Yoshlar va jamiyatga ekologik madaniyatni o'rgatish dasturlari.",
  },
];

const Features = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 bg-secondary rounded-full text-sm font-medium text-primary mb-4">
            Bizning faoliyatimiz
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Har sohada <span className="text-gradient-nature">mukammallik</span>
          </h2>
          <p className="text-muted-foreground">
            Tabiatni muhofaza qilish yo'lida turli yo'nalishlarda faoliyat yuritamiz
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-card rounded-2xl shadow-card hover:shadow-elevated transition-all duration-300 border border-border hover:border-primary/30"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-nature flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
