import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios.js";
import { useAuth } from "@/context/useAuth.js";
import { NotificationCard } from "@/components/feed/NotificationCard.js";
import { useNavigate } from "react-router-dom";
import { LoadingIcon } from "@/assets/icons/LoadingIcon.js";
import { Bell } from "lucide-react";

export interface Notification {
  id: number;
  notification_type: string;
  is_read: boolean;
  created_at: string;
  sender_id: number;
  receiver_id: number;
  post_id: number | null;
  sender: {
    id: number;
    username: string;
    avatar_url: string;
  };
  post: {
    id: number;
    content: string | null;
    media_url: string | null;
  } | null;
}

export function Notifications() {
  const navigate=useNavigate()
  const { token } = useAuth();
  if(!token) navigate("/")

  const { data: notifications = [], isLoading, isError } = useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await api.get("/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    enabled: !!token,
  });

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-gray-600 p-4 sticky top-0 bg-black/80 backdrop-blur z-10">
        <h2 className="text-2xl font-bold text-white">Notificaciones</h2>
      </div>

      {/* Content */}
      <div>
        {isLoading && (
          <LoadingIcon/>
        )}

        {isError && (
          <div className="p-6 text-center">
            <p className="text-red-500 font-semibold">
              Error al cargar las notificaciones
            </p>
          </div>
        )}

        {!isLoading && !isError && notifications.length === 0 && (
          <div className="flex flex-col gap-3 items-center justify-center py-12">
              <Bell color="white" size={50}/>
            <p className="text-gray-400 text-lg font-semibold">
              No tienes notificaciones
            </p>
            <p className="text-gray-500 text-sm">
              Aquí aparecerán cuando alguien interactúe con tus posts
            </p>
          </div>
        )}

        {!isLoading && !isError && notifications.length > 0 && (
          <div>
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}