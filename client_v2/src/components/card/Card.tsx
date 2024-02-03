type Props = {
  children?: React.ReactNode;
  padding?: string;
  border?: string;
  bgColor?: string;
  borderRadius?: string;
  className?: string;
};

const Card = ({
  children,
  padding = "p-5",
  border = "border border-zinc-200",
  borderRadius = "rounded",
  bgColor = "bg-white text-black",
  className = "",
}: Props) => {
  return (
    <article
      className={`${padding} ${border} ${bgColor} ${borderRadius}${
        className && ` ${className}`
      }`}
    >
      {children}
    </article>
  );
};

export default Card;
