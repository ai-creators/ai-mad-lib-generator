import Container from "../Container/Container";
import ButtonClear from "../Button/ButtonClear/ButtonClear";
import ButtonPink from "../Button/ButtonPink/ButtonPink";

const Hero = () => {
  return (
    <section className="h-[60vh] flex flex-col justify-center">
      <Container className="flex gap-3">
        <div className="w-[50%] flex flex-col gap-7">
          <h1 className="text-5xl font-bold">
            Create Custom Ad Libs Based
            <br /> on Your Prompt
          </h1>
          <p>
            Browse, Create, and share your favorite ad libs with friends and
            families.
          </p>
          <div className="flex gap-3">
            <ButtonPink
              className="w-44 text-center"
              padding="py-2.5"
              link="libs"
            >
              Start Creating
            </ButtonPink>
            <ButtonClear
              className="w-44 text-center"
              padding="py-2.5"
              link="/libs/browse"
            >
              Browse
            </ButtonClear>
          </div>
        </div>
        <div className="w-[50%]"></div>
      </Container>
    </section>
  );
};

export default Hero;
