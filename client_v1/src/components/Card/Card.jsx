const Card = ({
  children,
  padding = "p-5",
  border = "border border-zinc-600",
  borderRadius = "rounded-lg",
  className = "",
}) => {
  return (
    <article
      className={`${padding} ${border} ${borderRadius}${
        className && " " + className
      }`}
    >
      {children}
    </article>
  );
};

export default Card;
