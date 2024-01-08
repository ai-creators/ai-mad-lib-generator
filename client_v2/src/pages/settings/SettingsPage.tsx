import Layout from "../../layout/Layout";
import ContainerSmall from "../../components/container/container-small/ContainerSmall";
import Card from "../../components/card/Card";
import Tablist from "../../components/tablist/Tablist";
import { ContentRating } from "../../models/ContentRating";
import { useSettingsPage } from "./SettingsPage.hooks";
import ContentRatingConfirmationModal from "../../components/content-rating/content-rating-confirmation-modal/ContentRatingConfirmationModal";

const SettingsPage = () => {
  const {
    contentRating,
    setContentRating,
    changeContentRating,
    isRatingConfirmationOpen,
    closeRatingConfirmationModal,
  } = useSettingsPage();

  return (
    <>
      <Layout>
        <ContainerSmall className="flex flex-col gap-5 py-5">
          <Card>
            <h2 className="text-2xl font-semibold capitalize">
              Profile Settings
            </h2>
            <p className="text-zinc-500">Update your profile settings</p>
          </Card>
          <Card className="flex flex-col gap-5">
            <div>
              <h2 className="text-2xl font-semibold capitalize">
                Content Rating
              </h2>
              <p className="text-zinc-500">
                Choose the rating of your content being filtered
              </p>
            </div>
            <form className="flex flex-col gap-3">
              <div>
                <label className="font-semibold">Content Rating</label>
              </div>
              <Tablist<ContentRating>
                options={[ContentRating.PG, ContentRating.NSFW]}
                currentOption={contentRating}
                changeOption={changeContentRating}
              />
            </form>
          </Card>
        </ContainerSmall>
      </Layout>
      <ContentRatingConfirmationModal
        isOpen={isRatingConfirmationOpen}
        closeModal={closeRatingConfirmationModal}
        setContentRating={setContentRating}
      />
    </>
  );
};

export default SettingsPage;
