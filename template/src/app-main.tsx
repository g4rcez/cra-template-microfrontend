import { SubTitle, Card } from "@arcanishq/styleguide";
import "./config";
import { AppContainer } from "./app-container/app-container";

const AppMain = () => (
  <AppContainer title="Hack the planet">
    <Card className="w-full">
      <SubTitle>Hack the Planet</SubTitle>
    </Card>
  </AppContainer>
);

export default AppMain;
