export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      events: {
        Row: {
          completed: boolean
          created_at: string
          description_en: string | null
          description_ru: string | null
          description_uz: string
          event_date: string
          id: string
          image_url: string | null
          location: string | null
          published: boolean
          title_en: string | null
          title_ru: string | null
          title_uz: string
          updated_at: string
        }
        Insert: {
          completed?: boolean
          created_at?: string
          description_en?: string | null
          description_ru?: string | null
          description_uz: string
          event_date: string
          id?: string
          image_url?: string | null
          location?: string | null
          published?: boolean
          title_en?: string | null
          title_ru?: string | null
          title_uz: string
          updated_at?: string
        }
        Update: {
          completed?: boolean
          created_at?: string
          description_en?: string | null
          description_ru?: string | null
          description_uz?: string
          event_date?: string
          id?: string
          image_url?: string | null
          location?: string | null
          published?: boolean
          title_en?: string | null
          title_ru?: string | null
          title_uz?: string
          updated_at?: string
        }
        Relationships: []
      }
      gallery: {
        Row: {
          category: string
          created_at: string
          id: string
          image_url: string
          published: boolean
          title_en: string | null
          title_ru: string | null
          title_uz: string
        }
        Insert: {
          category?: string
          created_at?: string
          id?: string
          image_url: string
          published?: boolean
          title_en?: string | null
          title_ru?: string | null
          title_uz: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          image_url?: string
          published?: boolean
          title_en?: string | null
          title_ru?: string | null
          title_uz?: string
        }
        Relationships: []
      }
      news: {
        Row: {
          category: string
          content_en: string | null
          content_ru: string | null
          content_uz: string
          created_at: string
          id: string
          image_url: string | null
          published: boolean
          title_en: string | null
          title_ru: string | null
          title_uz: string
          updated_at: string
        }
        Insert: {
          category?: string
          content_en?: string | null
          content_ru?: string | null
          content_uz: string
          created_at?: string
          id?: string
          image_url?: string | null
          published?: boolean
          title_en?: string | null
          title_ru?: string | null
          title_uz: string
          updated_at?: string
        }
        Update: {
          category?: string
          content_en?: string | null
          content_ru?: string | null
          content_uz?: string
          created_at?: string
          id?: string
          image_url?: string | null
          published?: boolean
          title_en?: string | null
          title_ru?: string | null
          title_uz?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      site_features: {
        Row: {
          created_at: string
          description_en: string | null
          description_ru: string | null
          description_uz: string
          icon: string
          id: string
          published: boolean
          sort_order: number
          title_en: string | null
          title_ru: string | null
          title_uz: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description_en?: string | null
          description_ru?: string | null
          description_uz: string
          icon: string
          id?: string
          published?: boolean
          sort_order?: number
          title_en?: string | null
          title_ru?: string | null
          title_uz: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description_en?: string | null
          description_ru?: string | null
          description_uz?: string
          icon?: string
          id?: string
          published?: boolean
          sort_order?: number
          title_en?: string | null
          title_ru?: string | null
          title_uz?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      teachers: {
        Row: {
          bio_en: string | null
          bio_ru: string | null
          bio_uz: string | null
          created_at: string
          email: string | null
          id: string
          image_url: string | null
          name: string
          phone: string | null
          position_en: string | null
          position_ru: string | null
          position_uz: string
          published: boolean
          updated_at: string
        }
        Insert: {
          bio_en?: string | null
          bio_ru?: string | null
          bio_uz?: string | null
          created_at?: string
          email?: string | null
          id?: string
          image_url?: string | null
          name: string
          phone?: string | null
          position_en?: string | null
          position_ru?: string | null
          position_uz: string
          published?: boolean
          updated_at?: string
        }
        Update: {
          bio_en?: string | null
          bio_ru?: string | null
          bio_uz?: string | null
          created_at?: string
          email?: string | null
          id?: string
          image_url?: string | null
          name?: string
          phone?: string | null
          position_en?: string | null
          position_ru?: string | null
          position_uz?: string
          published?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
