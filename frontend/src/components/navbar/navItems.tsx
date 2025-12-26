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
        `flex cursor-pointer items-center gap-4 px-3 py-3  rounded-full transition-colors hover:bg-neutral-900 ${
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