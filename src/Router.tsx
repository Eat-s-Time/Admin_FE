import { BrowserRouter, Route, Switch } from "react-router-dom";
import RestaurantJoin from "./components/restaurant/RestaurantJoin";
import Adminlogin from "./components/restaurant/Adminlogin";
import WaitingList from "./components/restaurant/waiting/WaitingList";
import Menu from "./components/restaurant/menu/Menu";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Adminlogin}/>
        <Route path='/admin/waitinglist' component={WaitingList}/>
        <Route path='/admin/join' component={RestaurantJoin}/>
        <Route path='/admin/menu' component={Menu}/>
      </Switch>
    </BrowserRouter>
  );
} 

export default Router;
