type Props = {
  size?: string;
  border?: string;
};

const Loader = ({ size = "h-8 w-8", border = "border-4" }: Props) => {
  return (
    <div
      className={`inline-block ${size} animate-spin rounded-full ${border} border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default Loader;
