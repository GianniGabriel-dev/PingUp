import { NavLink } from "react-router-dom";

interface NavItemProps {
  to: string;
  icon: React.ComponentType<{ filled?: boolean; size?: number; className?: string }>;
  label: string;
}

export function NavItem({ to, icon: Icon, label }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-4 px-5 max-md:px-4 py-3 rounded-full transition-colors hover:bg-zinc-800 ${
          isActive ? "font-bold" : ""
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon filled={isActive} size={30} className="text-white" />
          <span className="text-xl max-sm:hidden text-white">{label}</span>
        </>
      )}
    </NavLink>
  );
}