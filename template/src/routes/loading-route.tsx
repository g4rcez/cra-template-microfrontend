import { Card, SubTitle } from "@arcanishq/styleguide";
import { AppContainer } from "../app-container/app-container";

export const LoadingRoute = () => {
  return (
    <AppContainer title="Loading...">
      <Card className="w-full" loading>
        <SubTitle>Loading...</SubTitle>
      </Card>
    </AppContainer>
  );
};
