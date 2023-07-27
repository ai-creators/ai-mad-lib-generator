import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";
import Layout from "../../layout/Layout";

const NotFound = () => {
  return (
    <Layout>
      <Container className="h-[90vh]">
        <div className="flex flex-col justify-center items-center pt-11 gap-5">
          <div className="text-center">
            <h2 className="text-7xl font-bold">404</h2>
            <p>The page you are looking for cannout be found.</p>
          </div>
          <Link
            to="/"
            className="block px-3 rounded py-3 hover:bg-zinc-900 active:bg-zinc-800 ease-out duration-200 border-zinc-600 border-r-rounded border"
          >
            Go Back to Home
          </Link>
        </div>
      </Container>
    </Layout>
  );
};

export default NotFound;
