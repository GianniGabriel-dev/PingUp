type Props = {
  size?: number;            // opcional, en px
  className?: string;
};

export const MoreOptionsIcon = ({ size = 24, className = "" }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5} // make dots thicker
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      className={className}
    >
      <circle cx="4.5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19.5" cy="12" r="1.5" />
    </svg>
  );
};