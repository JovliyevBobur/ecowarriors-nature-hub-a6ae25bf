import { useEffect } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Newspaper, Calendar, Image, Users, LogOut, Home } from "lucide-react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import ecoLogo from "@/assets/eco-logo.png";

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/login");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Yuklanmoqda...</div>;
  }

  if (!user || !isAdmin) {
    return null;
  }

  const menuItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/news", icon: Newspaper, label: "Yangiliklar" },
    { path: "/admin/events", icon: Calendar, label: "Tadbirlar" },
    { path: "/admin/gallery", icon: Image, label: "Galereya" },
    { path: "/admin/teachers", icon: Users, label: "O'qituvchilar" },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border p-4 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <img src={ecoLogo} alt="EcoWarriors" className="h-10 w-10" />
          <span className="font-bold text-foreground">Admin Panel</span>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="space-y-2 pt-4 border-t border-border">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Home className="h-5 w-5" />
              Saytga qaytish
            </Button>
          </Link>
          <div className="flex items-center justify-between px-4">
            <ThemeSwitcher />
            <Button variant="ghost" size="icon" onClick={signOut}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="news" element={<div className="text-foreground">Yangiliklar CRUD - tez orada</div>} />
          <Route path="events" element={<div className="text-foreground">Tadbirlar CRUD - tez orada</div>} />
          <Route path="gallery" element={<div className="text-foreground">Galereya CRUD - tez orada</div>} />
          <Route path="teachers" element={<div className="text-foreground">O'qituvchilar CRUD - tez orada</div>} />
        </Routes>
      </main>
    </div>
  );
};

const DashboardHome = () => (
  <div>
    <h1 className="text-3xl font-display font-bold text-foreground mb-6">Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { label: "Yangiliklar", count: 0, color: "bg-primary" },
        { label: "Tadbirlar", count: 0, color: "bg-eco-sky" },
        { label: "Galereya", count: 0, color: "bg-eco-sun" },
        { label: "O'qituvchilar", count: 0, color: "bg-eco-moss" },
      ].map((stat) => (
        <div key={stat.label} className="bg-card rounded-xl p-6 shadow-card border border-border">
          <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
            <span className="text-primary-foreground font-bold text-xl">{stat.count}</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground">{stat.label}</h3>
        </div>
      ))}
    </div>
  </div>
);

export default AdminDashboard;
