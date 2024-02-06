import AdlibCard from "../../adlib/adlib-card/AdlibCard";
import { HiddenButtonTypes } from "../../adlib/adlib-card/AdlibHiddenButtonTypes";
import ErrorAlert from "../../errors/ErrorAlert";
import { useProfileAdlibs } from "./ProfileAdlibs.hooks";

type Props = {
  username: string;
};

const ProfileAdlibs = ({ username }: Props) => {
  const { adlibs, error } = useProfileAdlibs(username);
  return (
    <>
      {error ? <ErrorAlert error={error} /> : null}
      <ul className="flex flex-col gap-3">
        {adlibs.map((adlib) => (
          <li key={adlib.id}>
            <AdlibCard
              adlib={adlib}
              hideButtons={[HiddenButtonTypes.RESPONSE]}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProfileAdlibs;
