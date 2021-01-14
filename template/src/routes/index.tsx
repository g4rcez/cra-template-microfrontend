import { lazy, useMemo, Suspense } from "react";
import { LoadingRoute } from "./loading-route";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RouteErrorBoundary from "../app-container/error-boundary/route-error-boundary";
import { Links } from "./links";
import Authenticator from "../app-container/authentication/authenticator";

const Main = lazy(() => import("../app-main"));
const NotFound = lazy(() => import("./404"));
const Logout = lazy(() => import("../app-container/authentication/logout-page"));

export const Path = [
  { path: Links.Root, component: Main }
];

export const Routes = () => {
  const routes = useMemo(() => Path.map((x) => <Route key={x.path} exact path={x.path} component={x.component} />), []);

  return (
    <BrowserRouter>
      <RouteErrorBoundary>
        <Authenticator>
          <Suspense fallback={<LoadingRoute />}>
            <Switch>
              <Route key="logout" exact path={Links.Logout} component={Logout} />
              {routes}
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Authenticator>
      </RouteErrorBoundary>
    </BrowserRouter>
  );
};
