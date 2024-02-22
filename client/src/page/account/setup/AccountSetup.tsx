import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/layout/Layout";
import Container from "@/layout/container/Container";

const AccountSetup = () => {
  return (
    <Layout>
      <Container className="flex justify-center items-center">
        <Card className="p-5 w-[20rem] flex flex-col gap-5">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Setup Your Account</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Finish setting up your account
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input placeholder="Username" type="text" id="username" />
          </div>
          <div>
            <Button className="w-full">Finish</Button>
          </div>
        </Card>
      </Container>
    </Layout>
  );
};

export default AccountSetup;
