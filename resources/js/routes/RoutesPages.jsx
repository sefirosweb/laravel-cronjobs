import { Switch, Route } from "react-router-dom";

/* Pages */
import NotFound from "@/pages/NotFound";
import Cronjob from "@/pages/Cronjob";

function RoutesPages() {
    return (
        <Switch>
            <Route exact={true} path="/cronjobs" component={Cronjob} />
            <Route component={NotFound} />
        </Switch>
    );
}

export default RoutesPages;
