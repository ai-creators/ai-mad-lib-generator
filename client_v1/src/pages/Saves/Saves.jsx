import Card from "../../components/Card/Card";
import Container from "../../components/Container/Container";

const Saves = () => {
  return (
    <Container className="grid-aside py-12 gap-12">
      <Card>
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="text-2xl font-semibold cpaitalize">Saved Ad-Libs</h3>
            <p className="text-zinc-600">View your saved ad-libs</p>
          </div>
          <p className="font-semibold">You don not have any saved Ad-Libs</p>
        </div>
      </Card>
    </Container>
  );
};

export default Saves;
