import { NavLink } from "react-router-dom";

interface NavItemProps {
  to: string;
  icon: React.ComponentType<{ filled?: boolean; size?: number; className?: string }>;
  label: string;
  unreadCount?: number;
}

export function NavItem({ to, icon: Icon, label, unreadCount }: NavItemProps) {
  const hasUnread = unreadCount !== undefined && unreadCount > 0;

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex cursor-pointer items-center gap-4 p-3 rounded-full transition-colors hover:bg-neutral-900 relative ${
          isActive ? "font-bold" : ""
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div className="relative">
            <Icon filled={isActive} size={30} className="text-white" />
            {hasUnread && (
              <div className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                {unreadCount > 99 ? '99+' : unreadCount}
              </div>
            )}
          </div>
          <span className="text-xl max-sm:hidden text-white">{label}</span>
        </>
      )}
    </NavLink>
  );
}