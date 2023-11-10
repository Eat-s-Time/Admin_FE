import { BrowserRouter, Route, Switch } from "react-router-dom";
import RestaurantJoin from "./components/restaurant/RestaurantJoin";
import Adminlogin from "./components/restaurant/Adminlogin";
import WaitingList from "./components/restaurant/waiting/WaitingList";                                                        
import Menu from "./components/restaurant/menu/Menu";
import Store from "./components/restaurant/store/store";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Adminlogin}/>

        {/* 로그인 후에만 들어갈 수 있음 */}
        <Route path='/admin/waitinglist' component={WaitingList}/>
        <Route path='/admin/join' component={RestaurantJoin}/>
        <Route path='/admin/menu' component={Menu}/>
        <Route path='/admin/store' component={Store}/>
      </Switch>
    </BrowserRouter>
  );
} 

export default Router;
