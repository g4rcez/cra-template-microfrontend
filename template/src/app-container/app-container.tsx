import {
  Container,
  Sidebar,
  SidebarItemType,
  useTitle,
  View,
} from "@arcanishq/styleguide";
import { useMobile } from "hulks";
import {
  forwardRef,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./logged-user-context";
import { LogoutButton } from "./logout-button";

const linkClassName = "flex items-center cursor-pointer mx-3 text-dark-light";

type Props = {
  children: ReactNode;
  title: string;
};

export const AppContainer = forwardRef<HTMLDivElement, Props>(
  ({ children, ...props }, externalRef) => {
    const title = useMemo(() => `APP_NAME - ${props.title}`, [props.title]);

    useTitle(title);

    const isMobile = useMobile();
    const loggedUser = useContext(UserContext);
    const [collapsed, setCollapsed] = useState(isMobile);

    useEffect(() => {
      setCollapsed(isMobile);
    }, [isMobile]);

    const items: SidebarItemType[] = useMemo(
      () =>
        [
          {
            Link: Link,
            name: "Main",
            label: <span className="font-bold w-full">Main</span>,
            icon: null,
            expanded: true,
            items: [
              {
                Link: Link,
                name: "Test",
                label: <span className="w-full">Test</span>,
                icon: null,
                expanded: true,
              },
            ],
          },
        ] as SidebarItemType[],
      []
    );

    const collapsedWidth = collapsed ? 3 : 14.5;
    const contentClassName = collapsed
      ? "mt-16 pr-transition"
      : "mt-16 pr-transition pr-4";

    return (
      <main className="w-full">
        <header className="fixed top-0 z-10 items-center p-2 text-xl text-left bg-on-base text-dark-light w-full flex nav-shadow">
          <View verticalAlign width="1/3" mobileWidth="1/3">
            <img
              alt="COMPANY"
              src="/favicon.ico"
              className="flex items-center content-center justify-center w-8 text-center mr-1 md:mr-2"
            />
          </View>
          <View verticalAlign width="2/3" className="justify-end ">
            <Container verticalAlign className="justify-end">
              <span className="pr-4 text-sm text-success-light">
                {loggedUser?.name}
              </span>
              <LogoutButton linkClassName={linkClassName} />
            </Container>
          </View>
        </header>
        <div className="w-full pl-transition relative">
          <Sidebar
            footer
            onCollapse={setCollapsed}
            openMaxWidth={`${collapsedWidth}rem`}
            containerClassName="bg-base text-dark-light"
            items={items}
            header={null}
            collapsed={collapsed}
          />
          <Container
            ref={externalRef}
            style={{ paddingLeft: `${collapsedWidth + 0.05}rem` }}
            className={contentClassName}
          >
            <div className="mx-2 w-full">{children}</div>
          </Container>
        </div>
      </main>
    );
  }
);
