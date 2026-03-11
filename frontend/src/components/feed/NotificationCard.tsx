import { formatDate } from "@/utils/formatDate.js";
import { Bell, Heart, MessageCircle, Repeat, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

interface Sender {
  id: number;
  username: string;
  avatar_url: string;
}

interface Post {
  id: number;
  content: string | null;
  media_url: string | null;
}

interface Notification {
  id: number;
  notification_type: string;
  is_read: boolean;
  created_at: string;
  sender_id: number;
  receiver_id: number;
  post_id: number | null;
  sender: Sender;
  post: Post | null;
}

interface NotificationCardProps {
  notification: Notification;
}

const getNotificationMessage = (
  type: string,
  username: string,
): { title: string; icon: React.ReactNode } => {
  switch (type) {
    case "like":
      return {
        title: `A ${username} le gustó tu post`,
        icon: <Heart color="red" fill="#E60076" />,
      };
    case "reply":
      return {
        title: `${username} respondió a tu post`,
        icon: <MessageCircle color="#2B7FFF" />,
      };
    case "retweet":
      return {
        title: `${username} hizo retweet a tu post`,
        icon: <Repeat />,
      };
    case "follow":
      return {
        title: `${username} te ha empezado a seguir`,
        icon: <UserPlus color="#2B7FFF" />,
      };
    default:
      return {
        title: `${username} envió una notificación`,
        icon: <Bell />,
      };
  }
};

export function NotificationCard({ notification }: NotificationCardProps) {
  const { title, icon } = getNotificationMessage(
    notification.notification_type,
    notification.sender.username,
  );
  const timeAgo = formatDate(notification.created_at);

  return (
    //si no hay post_id, se redirige al perfil del usuario que envió la notificación, si lo hay, se redirige al post relacionado con la notificación
    <Link
      to={
        notification.post_id
          ? `/post/${notification.post_id}`
          : `/${notification.sender.username}`
      }
      className={`block border-b border-gray-600 p-4 hover:bg-zinc-900/50 transition-colors duration-200 cursor-pointer ${
        !notification.is_read ? "bg-zinc-900/30" : ""
      }`}
    >
      <div className="flex gap-3">
        {/* Avatar */}
        <Link
          to={`/${notification.sender.username}`}
          className="shrink-0 hover:opacity-80 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={notification.sender.avatar_url}
            alt={notification.sender.username}
            className="w-12 h-12 rounded-full"
          />
        </Link>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            <span className="text-2xl shrink-0">{icon}</span>
            <div className="flex-1">
              <p className="text-white font-semibold">
                <Link
                  to={`/${notification.sender.username}`}
                  className="hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {notification.sender.username}
                </Link>
              </p>
              <p className="text-gray-400 text-sm">{title}</p>

              {/* Post Preview */}
              {notification.post && (
                <div className="mt-2 p-3 bg-zinc-800/50 rounded-lg border border-gray-700">
                  <p className="text-gray-300 text-sm">
                    {notification.post.content}
                  </p>
                  {notification.post.media_url &&(
                  <img
                    className="mt-2 w-20 h-20 object-cover rounded-md border border-gray-600"
                    src={notification.post.media_url}
                    alt="Media of post"
                  />
                  )}
                </div>
              )}

              {/* Time */}
              <p className="text-gray-500 text-xs mt-2">{timeAgo}</p>
            </div>

            {/* Unread Indicator */}
            {!notification.is_read && (
              <div className="w-3 h-3 bg-rose-400 rounded-full shrink-0 mt-2"></div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
