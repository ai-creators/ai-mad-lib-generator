import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Props = {
  title: string;
  description?: string;
};

const LoaderAlert = ({ title, description }: Props) => {
  return (
    <Alert className="fixed top-10 left-1/2 -translate-x-1/2">
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default LoaderAlert;
