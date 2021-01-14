import { FC } from "react";
import { Card, View, Container, SubTitle } from "@arcanishq/styleguide";

const Logout: FC = () => (
  <Card className="w-full m-2 border-base-dark">
    <View width="1/3">
      <Container>
        <SubTitle>You are not logged in</SubTitle>
      </Container>
      <Container wrap={false} className="w-full mt-4">
        <div>
          Please, Click{" "}
          <a href="/" className="light-blue text-info">
            here
          </a>{" "}
          to login
        </div>
      </Container>
    </View>
  </Card>
);

export default Logout;