const Card = ({
  children,
  padding = "p-5",
  borderColor = "border-zinc-600",
  border = "border",
  borderRadius = "rounded-lg",
  className = "",
  useForSmall = false,
}) => {
  const formattedBorder = useForSmall ? "border-0 lg:border" : border;
  return (
    <article
      className={`${padding} ${formattedBorder} ${borderColor} ${borderRadius} ${
        className && " " + className
      }`}
    >
      {children}
    </article>
  );
};

export default Card;
896;
