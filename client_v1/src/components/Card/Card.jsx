const Card = ({
  children,
  padding = "p-5",
  border = "border border-zinc-600",
  borderRadius = "rounded-lg",
  className = "",
  useForSmall = false,
}) => {
  return (
    <article
      className={`${padding} ${useForSmall ? `lg:${border}` : border} ${
        useForSmall ? `lg:${borderRadius}` : borderRadius
      }${className && " " + className}`}
    >
      {children}
    </article>
  );
};

export default Card;
