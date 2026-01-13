import { Calendar, MapPin, Clock, Users } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const upcomingEvents = [
  {
    id: 1,
    title: "Bahorgi daraxt ekish festivali",
    date: "2026-03-21",
    time: "09:00 - 14:00",
    location: "Markaziy bog'",
    participants: "200+",
    description: "Yilning eng katta daraxt ekish tadbiriga qo'shiling! Har bir ishtirokchi kamida 3 ta daraxt ekadi.",
  },
  {
    id: 2,
    title: "Ekologik veloyuruш",
    date: "2026-02-15",
    time: "08:00 - 12:00",
    location: "Shahar markazi",
    participants: "150+",
    description: "Toza transport va sog'lom turmush tarzi targ'ibotiga bag'ishlangan veloyurish.",
  },
  {
    id: 3,
    title: "Suv havzalarini tozalash aksiyasi",
    date: "2026-02-28",
    time: "10:00 - 16:00",
    location: "Shahar ko'li",
    participants: "100+",
    description: "Mahalliy ko'l va uning atrofini tozalash bo'yicha ko'ngilli aksiya.",
  },
];

const pastEvents = [
  {
    id: 4,
    title: "Yil yakuni yig'ilishi",
    date: "2025-12-25",
    participants: "80+",
  },
  {
    id: 5,
    title: "Qishki ekologik forum",
    date: "2025-12-15",
    participants: "120+",
  },
  {
    id: 6,
    title: "Plastik yig'ish marafoni",
    date: "2025-11-20",
    participants: "300+",
  },
];

const Events = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-secondary rounded-full text-sm font-medium text-primary mb-4">
              Tadbirlar
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Kelgusi <span className="text-gradient-nature">tadbirlar</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Bizning tadbirlarimizga qo'shiling va tabiatni muhofaza qilish harakatining bir qismi bo'ling
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8">
            Kelgusi tadbirlar
          </h2>
          
          <div className="space-y-6">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border hover:shadow-elevated transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-nature flex flex-col items-center justify-center text-primary-foreground">
                      <span className="text-2xl font-bold">
                        {new Date(event.date).getDate()}
                      </span>
                      <span className="text-xs uppercase">
                        {new Date(event.date).toLocaleDateString("uz-UZ", { month: "short" })}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        {event.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        {event.participants} ishtirokchi
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <Button>Ro'yxatdan o'tish</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8">
            O'tgan tadbirlar
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="bg-card rounded-xl p-6 shadow-soft border border-border"
              >
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4" />
                  {new Date(event.date).toLocaleDateString("uz-UZ")}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{event.title}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {event.participants} ishtirokchi
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Events;
