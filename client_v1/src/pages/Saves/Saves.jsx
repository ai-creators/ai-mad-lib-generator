import Card from "../../components/Card/Card";
import Container from "../../components/Container/Container";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { removeAll } from "../../slices/savesSlice";

const Saves = () => {
  const { saves } = useSelector((state) => state.saves);
  const dispatch = useDispatch();
  const removeAllLibs = () => {
    dispatch(removeAll());
  };
  return (
    <Container className="grid-aside py-12 gap-12">
      <Card useForSmall>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-start gap-3">
            <div>
              <h3 className="text-2xl font-semibold cpaitalize">
                Saved Ad-Libs
              </h3>
              <p className="text-zinc-600">View your saved ad-libs</p>
            </div>
            <button
              className="py-3 px-3 hover:bg-zinc-900 w-fit text-red-400 disabled:text-red-300 active:bg-zinc-800 ease-out duration-200 border-r-rounded border rounded border-zinc-600 disabled:cursor-not-allowed disabled:bg-zinc-800"
              type="button"
              onClick={removeAllLibs}
              disabled={saves.length === 0}
            >
              Remove All
            </button>
          </div>
          {saves.length === 0 ? (
            <p className="font-semibold">You don not have any saved Ad-Libs</p>
          ) : (
            <ul>
              {saves.map((save) => {
                return (
                  <li key={save._id}>
                    <div className="border border-zinc-600 text-white p-5 rounded-lg">
                      <div className="flex justify-between items-start">
                        <h6 className="text-xl font-semibold whitespace-wrap max-w-[75%]">
                          {save.prompt}
                        </h6>
                        <p className="text-zinc-400">
                          {dayjs(save.createdAt).format("MMM, D")}
                        </p>
                      </div>

                      <Link
                        to="/libs/play"
                        className="p-3 rounded border border-zinc-600 text-white inline-block mt-6 hover:bg-zinc-900 active:bg-zinc-800 duration-200 ease-out"
                        state={{ lib: save }}
                      >
                        Go To Ad-Lib
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </Card>
    </Container>
  );
};

export default Saves;
