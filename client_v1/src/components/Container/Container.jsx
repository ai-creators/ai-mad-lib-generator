const Container = ({ children, className = "" }) => {
  return (
    <div className={`${className && className + " "}container mx-auto`}>
      {children}
    </div>
  );
};

export default Container;
