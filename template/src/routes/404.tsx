import { useHistory } from "react-router";
import { AppContainer } from "../app-container/app-container";
import { Container, Paragraph, SubTitle, Button } from "@arcanishq/styleguide";

const NotFound = () => {
  const history = useHistory();
  return (
    <AppContainer title="Not Found">
      <Container className="flex-col pt-2 p-4 flex-auto">
        <SubTitle className="mb-4 font-bold">Ops...Not found</SubTitle>
        <Paragraph className="mb-6">
          {window.location.pathname} doesn't exist
        </Paragraph>
        <Button className="w-fit" onClick={history.goBack}>
          Go Back
        </Button>
      </Container>
    </AppContainer>
  );
};

export default NotFound;
