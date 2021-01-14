import { Component, ReactNode } from "react";
import { Card, Paragraph, SubTitle } from "@arcanishq/styleguide";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class AppErrorBoundary extends Component<Props, State> {
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
        <Card className="w-full">
          <SubTitle>Ops...</SubTitle>
          <Paragraph>Something wrong is not right</Paragraph>
        </Card>
      );
    }
    return this.props.children;
  }
}
