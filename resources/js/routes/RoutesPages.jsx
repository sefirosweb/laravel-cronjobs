import { Switch, Route } from "react-router-dom";

/* Pages */
import NotFound from "@/pages/NotFound";
import Cronjob from "@/pages/Cronjob";
import Queue from "@/pages/Queue";

function RoutesPages() {
    return (
        <Switch>
            <Route exact={true} path={`/${APP_PREFIX}`} component={Cronjob} />
            <Route exact={true} path={`/${APP_PREFIX}/queue`} component={Queue} />
            <Route component={NotFound} />
        </Switch>
    );
}

export default RoutesPages;
