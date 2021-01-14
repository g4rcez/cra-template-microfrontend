import { Component, ReactNode } from "react";
import { AppContainer } from "../../app-container/app-container";
import { Container, SubTitle, Paragraph, Card } from "@arcanishq/styleguide";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export default class RouteErrorBoundary extends Component<Props, State> {
  constructor(props: never) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: never) {
    return { hasError: true };
  }

  componentDidCatch(error: never, errorInfo: never) {}

  render() {
    if (this.state.hasError) {
      return (
        <AppContainer title="Ops...Error">
          <Container verticalAlign horizontalAlign>
            <Card className="w-full">
              <SubTitle className="font-bold">Ops...</SubTitle>
              <Paragraph>Something wrong is not right</Paragraph>
            </Card>
          </Container>
        </AppContainer>
      );
    }
    return this.props.children;
  }
}
