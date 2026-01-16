import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, User } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import type { Tables } from "@/integrations/supabase/types";
import { ImageUpload } from "@/components/admin/ImageUpload";

type TeacherItem = Tables<"teachers">;

const AdminTeachers = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TeacherItem | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data: teachers, isLoading } = useQuery({
    queryKey: ["admin-teachers"],
    queryFn: async () => {
      const { data, error } = await supabase.from("teachers").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `teachers/${Date.now()}.${fileExt}`;
    const { error } = await supabase.storage.from("images").upload(fileName, file);
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage.from("images").getPublicUrl(fileName);
    return publicUrl;
  };

  const createMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      const { error } = await supabase.from("teachers").insert({
        name: formData.get("name") as string,
        position_uz: formData.get("position_uz") as string,
        position_ru: formData.get("position_ru") as string || null,
        position_en: formData.get("position_en") as string || null,
        bio_uz: formData.get("bio_uz") as string || null,
        bio_ru: formData.get("bio_ru") as string || null,
        bio_en: formData.get("bio_en") as string || null,
        email: formData.get("email") as string || null,
        phone: formData.get("phone") as string || null,
        image_url: imageUrl || null,
        published: formData.get("published") === "true",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-teachers"] });
      setIsOpen(false);
      setImageFile(null);
      toast.success(t("common.save") + " ✓");
    },
    onError: () => toast.error(t("common.error")),
  });

  const updateMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      let imageUrl = editingItem?.image_url || "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      const { error } = await supabase.from("teachers").update({
        name: formData.get("name") as string,
        position_uz: formData.get("position_uz") as string,
        position_ru: formData.get("position_ru") as string || null,
        position_en: formData.get("position_en") as string || null,
        bio_uz: formData.get("bio_uz") as string || null,
        bio_ru: formData.get("bio_ru") as string || null,
        bio_en: formData.get("bio_en") as string || null,
        email: formData.get("email") as string || null,
        phone: formData.get("phone") as string || null,
        image_url: imageUrl || null,
        published: formData.get("published") === "true",
      }).eq("id", editingItem!.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-teachers"] });
      setIsOpen(false);
      setEditingItem(null);
      setImageFile(null);
      toast.success(t("common.save") + " ✓");
    },
    onError: () => toast.error(t("common.error")),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("teachers").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-teachers"] });
      toast.success(t("common.delete") + " ✓");
    },
    onError: () => toast.error(t("common.error")),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (editingItem) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const openEdit = (item: TeacherItem) => {
    setEditingItem(item);
    setIsOpen(true);
  };

  const openCreate = () => {
    setEditingItem(null);
    setImageFile(null);
    setIsOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-display font-bold text-foreground">{t("admin.teachers")}</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate} className="gap-2">
              <Plus className="h-4 w-4" />
              {t("admin.addNew")}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? t("admin.editItem") : t("admin.addNew")}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">{t("admin.name")} *</Label>
                <Input id="name" name="name" defaultValue={editingItem?.name || ""} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="position_uz">{t("admin.position")} (UZ) *</Label>
                  <Input id="position_uz" name="position_uz" defaultValue={editingItem?.position_uz || ""} required />
                </div>
                <div>
                  <Label htmlFor="position_ru">{t("admin.position")} (RU)</Label>
                  <Input id="position_ru" name="position_ru" defaultValue={editingItem?.position_ru || ""} />
                </div>
                <div>
                  <Label htmlFor="position_en">{t("admin.position")} (EN)</Label>
                  <Input id="position_en" name="position_en" defaultValue={editingItem?.position_en || ""} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="bio_uz">{t("admin.bio")} (UZ)</Label>
                  <Textarea id="bio_uz" name="bio_uz" defaultValue={editingItem?.bio_uz || ""} rows={3} />
                </div>
                <div>
                  <Label htmlFor="bio_ru">{t("admin.bio")} (RU)</Label>
                  <Textarea id="bio_ru" name="bio_ru" defaultValue={editingItem?.bio_ru || ""} rows={3} />
                </div>
                <div>
                  <Label htmlFor="bio_en">{t("admin.bio")} (EN)</Label>
                  <Textarea id="bio_en" name="bio_en" defaultValue={editingItem?.bio_en || ""} rows={3} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">{t("admin.email")}</Label>
                  <Input id="email" name="email" type="email" defaultValue={editingItem?.email || ""} />
                </div>
                <div>
                  <Label htmlFor="phone">{t("admin.phone")}</Label>
                  <Input id="phone" name="phone" defaultValue={editingItem?.phone || ""} />
                </div>
              </div>

              <div>
                <Label>{t("admin.image")}</Label>
                <ImageUpload
                  value={editingItem?.image_url || undefined}
                  onChange={() => {}}
                  onFileSelect={setImageFile}
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch id="published" name="published" defaultChecked={editingItem?.published ?? true} value="true" />
                <Label htmlFor="published">{t("common.published")}</Label>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  {t("common.cancel")}
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {t("common.save")}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-muted-foreground">{t("common.loading")}</div>
      ) : (
        <div className="grid gap-4">
          {teachers?.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-card rounded-lg p-4 border border-border flex items-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {item.image_url ? (
                <img src={item.image_url} alt={item.name} className="h-14 w-14 object-cover rounded-full" />
              ) : (
                <div className="h-14 w-14 bg-secondary rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.position_uz}</p>
                <span className={`text-xs px-2 py-0.5 rounded ${item.published ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"}`}>
                  {item.published ? t("common.published") : t("common.draft")}
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(item.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </motion.div>
          ))}
          {(!teachers || teachers.length === 0) && (
            <p className="text-muted-foreground text-center py-8">{t("common.noData")}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminTeachers;