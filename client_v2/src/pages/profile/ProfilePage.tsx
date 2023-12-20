import { useState } from "react";
import { AccountModel } from "../../models/AccountModel";
import Layout from "../../layout/Layout";
import Container from "../../components/container/Container";
import Card from "../../components/card/Card";
import Avatar from "../../components/avatar/Avatar";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import AccountService from "../../services/AccountService";
import { useParams } from "react-router-dom";
import PageLoader from "../../components/loader/page-loader/PageLoader";
import dayjs from "dayjs";

const ProfilePage = () => {
  const { username } = useParams();
  const { user } = useAuth0();

  const fetchAccount = async () => {
    if (username) {
      const { data, error } = await AccountService.getAccountByUsername(
        username
      );
      if (data) {
        return data;
      }
      if (error) {
        throw new Error(error.message ?? "Error getting profile information");
      }
    }
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchAccount,
  });
  const account = data;
  return (
    <Layout mainClassName="relative">
      {isLoading ? <PageLoader /> : null}
      <div className="h-36 bg-black-700"></div>
      <Container className="absolute w-full top-10">
        <Card borderRadius="" className="relative">
          <div className="flex flex-col items-center justify-start">
            <Avatar
              className="absolute -top-14 border-4 border-black-700"
              width="w-24"
              height="w-24"
            />
            <h2 className="text-xl font-semibold capitalize text-center">
              {account?.username}
            </h2>
            {account?.createdAt ? (
              <p className="text-zinc-400">
                Joined on {dayjs(account?.createdAt).format("MMM D, YYYY")}
              </p>
            ) : null}
          </div>
        </Card>
      </Container>
    </Layout>
  );
};

export default ProfilePage;
