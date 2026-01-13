import { CheckCircle, Target, Eye, Users } from "lucide-react";
import Layout from "@/components/layout/Layout";

const values = [
  {
    icon: Target,
    title: "Maqsadimiz",
    description: "Tabiatni muhofaza qilish va ekologik barqarorlikni ta'minlash, kelajak avlodlar uchun yashil muhit yaratish.",
  },
  {
    icon: Eye,
    title: "Vazifamiz",
    description: "Jamiyatda ekologik madaniyatni shakllantirish, amaliy loyihalar orqali tabiatni asrash.",
  },
  {
    icon: Users,
    title: "Jamoamiz",
    description: "Fidoyi va g'ayratli yoshlardan tashkil topgan, tabiatni sevuvchi jamoamiz.",
  },
];

const achievements = [
  "1000+ daraxt ekildi",
  "50+ ekologik tadbir o'tkazildi",
  "500+ ko'ngilli jalb qilindi",
  "10+ maktabda ta'lim berildi",
  "5 ton plastik qayta ishlashga topshirildi",
  "3 ta suv havzasi tozalandi",
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-secondary rounded-full text-sm font-medium text-primary mb-4">
              Biz haqimizda
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Tabiatni muhofaza qilish <span className="text-gradient-nature">yo'lida</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              EcoWarriors - bu tabiatni muhofaza qilish va ekologik madaniyatni targ'ib qilish
              maqsadida tashkil etilgan ko'ngilli harakatdir. Biz har bir insonning tabiatga
              bo'lgan munosabatini o'zgartirish orqali yashil kelajakni yaratmoqchimiz.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-8 bg-card rounded-2xl shadow-card border border-border"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-nature flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Bizning yutuqlarimiz
            </h2>
            <p className="text-muted-foreground">
              Faoliyatimiz davomida erishgan muhim natijalarimiz
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-card rounded-xl shadow-soft"
              >
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground font-medium">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
