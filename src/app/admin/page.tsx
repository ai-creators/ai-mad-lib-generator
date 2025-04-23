/* eslint-disable @typescript-eslint/no-misused-promises */
import { redirect } from "next/navigation";
import { checkRole } from "~/utils/roles";
import { SearchUsers } from "../_features/admin/search-users";
import Layout from "../_components/layouts/layout";
import Container from "../_components/containers/container";

export default async function AdminDashboard(params: {
  searchParams: Promise<{ search?: string }>;
}) {
  if (!checkRole("admin")) {
    redirect("/");
  }

  //   const users = query ? (await client.users.getUserList({ query })).data : [];

  return (
    <Layout>
      <Container>
        <section>
          <SearchUsers />
        </section>
      </Container>
    </Layout>
  );
}
