import { useEffect } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Newspaper, Calendar, Image, Users, LogOut, Home } from "lucide-react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { useTranslation } from "react-i18next";
import ecoLogo from "@/assets/eco-logo.png";
import AdminNews from "./AdminNews";
import AdminEvents from "./AdminEvents";
import AdminGallery from "./AdminGallery";
import AdminTeachers from "./AdminTeachers";
import DashboardHome from "./DashboardHome";

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/login");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background">{t("common.loading")}</div>;
  }

  if (!user || !isAdmin) {
    return null;
  }

  const menuItems = [
    { path: "/admin", icon: LayoutDashboard, label: t("admin.dashboard") },
    { path: "/admin/news", icon: Newspaper, label: t("admin.news") },
    { path: "/admin/events", icon: Calendar, label: t("admin.events") },
    { path: "/admin/gallery", icon: Image, label: t("admin.gallery") },
    { path: "/admin/teachers", icon: Users, label: t("admin.teachers") },
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
              {t("admin.backToSite")}
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
      <main className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="teachers" element={<AdminTeachers />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;