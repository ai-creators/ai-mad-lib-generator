import Layout from "../../layout/Layout";
import Card from "../../components/card/Card";
import Avatar from "../../components/avatar/Avatar";
import { useParams } from "react-router-dom";
import PageLoader from "../../components/loader/page-loader/PageLoader";
import dayjs from "dayjs";
import ErrorAlert from "../../components/errors/ErrorAlert";
import ContainerSmall from "../../components/container/container-small/ContainerSmall";
import ProfileAdlibs from "../../components/profile/profile-adlibs/ProfileAdlibs";
import ButtonLight from "../../components/button/button-light/ButtonLight";
import { useProfilePage } from "./ProfilePage.hooks";

const ProfilePage = () => {
  const { username } = useParams();

  const {
    account,
    adlibTotal,
    isLoading,
    error,
    responseTotal,
    bookmarkTotal,
  } = useProfilePage(username);
  return (
    <Layout mainClassName="relative">
      {isLoading ? <PageLoader /> : null}

      <div className="h-40 bg-indigo-900 mb-12"></div>
      <ContainerSmall className="absolute w-full top-10 left-1/2 -translate-x-1/2 flex flex-col gap-5">
        {error ? <ErrorAlert error={error} /> : null}
        <Card className="relative">
          <div className="flex flex-col items-center justify-start">
            <Avatar
              className="absolute -top-14 border-4 border-black-700"
              width="w-24"
              height="w-24"
            />
            <h2 className="text-xl font-semibold capitalize text-center -mt-6">
              {account?.username}
            </h2>
            {account?.createdAt ? (
              <p className="text-zinc-400">
                Joined on {dayjs(account?.createdAt).format("MMM D, YYYY")}
              </p>
            ) : null}
          </div>
        </Card>
      </ContainerSmall>
      <ContainerSmall className="py-5">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-5">
            <Card padding="p-2">
              <ul className="flex flex-col gap-1">
                <li>
                  <ButtonLight
                    href={`/profile/${username}/adlibs`}
                    className="block"
                  >
                    <i className="fa-regular fa-square-plus mr-3 fa-lg"></i>
                    {adlibTotal} Adlibs Created
                  </ButtonLight>
                </li>
                <li>
                  <ButtonLight
                    href={`/profile/${username}/responses`}
                    className="block"
                  >
                    <i className="fa-regular fa-pen-to-square mr-3 fa-lg"></i>
                    {responseTotal} Adlibs Responses
                  </ButtonLight>
                </li>
                <li>
                  <ButtonLight
                    href={`/profile/${username}/bookmarks`}
                    className="block"
                  >
                    <i className="fa-regular fa-heart mr-3 fa-lg"></i>
                    {bookmarkTotal} Bookmarks
                  </ButtonLight>
                </li>
              </ul>
            </Card>
          </div>
          <div className="col-span-7">
            {username ? (
              <>
                <div className="flex flex-col gap-3">
                  <h4 className="text-lg capitalize font-semibold mx-1">
                    Recent Adlibs
                  </h4>
                  <ProfileAdlibs username={username} />
                  <div className="flex">
                    <ButtonLight
                      href={`/profile/${username}/adlibs`}
                      className="ml-auto"
                    >
                      View more <i className="fa-solid fa-arrow-right"></i>
                    </ButtonLight>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </ContainerSmall>
    </Layout>
  );
};

export default ProfilePage;
