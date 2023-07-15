import ButtonYellow from "../../components/Button/ButtonYellow/ButtonYellow";
import Container from "../../components/Container/Container";
import Hero from "../../components/Hero/Hero";
import LayoutLanding from "../../layout/LayoutLanding/LayoutLanding";

const Landing = () => {
  return (
    <LayoutLanding>
      <Hero />
      <section className="h-[40vh] bg-white text-black flex justify-center items-center">
        <Container className="flex flex-col items-center justify-center gap-5 max-w-lg text-center">
          <h3 className="text-4xl font-bold">Coming Soon</h3>
          <p>
            Enjoy the classic game of creating ad libs with your friends. In
            this mulitplayer mode, the judge will generate the random ad lib,
            and the res will fill out the ad lib. The favorite wins.
          </p>
        </Container>
      </section>
      <section className="h-[40vh] flex items-center">
        <Container className="flex flex-col gap-5">
          <h3 className="text-4xl font-bold">Support us on patreon</h3>
          <p>
            Too keep our services free, we need all the support we can get.
            Servers cost money and
          </p>
          <div>
            <ButtonYellow
              className="text-center"
              width="w-[20rem]"
              padding="py-2.5"
              link="/"
            >
              <i className="fa-brands fa-patreon"></i>Patreon
            </ButtonYellow>
          </div>
        </Container>
      </section>
    </LayoutLanding>
  );
};

export default Landing;
