import SavesPrompts from "@/features/saves/saves-prompts/SavesPrompts";
import SavesResponses from "@/features/saves/saves-responses/SavesResponses";
import Layout from "@/layout/Layout";
import Container from "@/layout/container/Container";

const Saves = () => {
  return (
    <Layout>
      <div data-testid="home">
        <Container
          className="px-3 lg:px-0 py-5 grid-cols-9 grid gap-5"
          width="max-w-3xl"
        >
          <section className="col-span-9 lg:col-span-9 flex flex-col gap-5">
            <SavesPrompts />
            <SavesResponses />
          </section>
          {/* <aside className="col-span-3 "></aside> */}
        </Container>
      </div>
    </Layout>
  );
};

export default Saves;
