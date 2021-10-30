import Login from "./pages/Guest/Login";

import Contacts from "./pages/Contacts";
import NewContact from "./pages/Contacts/new";
import EditContact from "./pages/Contacts/edit";

import Meetings from "./pages/Meetings";
import NewMeeting from "./pages/Meetings/new";
import EditMeeting from "./pages/Meetings/edit";

import { AuthContextProvider } from "./contexts/AuthContext";
import { ContactContextProvider } from "./contexts/ContactContext";
import { MeetingContextProvider } from "./contexts/MeetingContext";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function Home(){
  return <div>Home</div>
}

function App() {
  return (
    <Router>
      <AuthContextProvider>
      <ContactContextProvider>
        <MeetingContextProvider>
          <Switch>

            <Route exact path="/contacts" component={Contacts}/>
            <Route exact path="/contacts/new/" component={NewContact}/>
            <Route exact path="/contacts/edit/:id" component={EditContact}/>

            <Route exact path="/meetings" component={Meetings}/>
            <Route exact path="/meetings/new/" component={NewMeeting}/>
            <Route exact path="/meetings/edit/:id" component={EditMeeting}/>

            <Route exact path="/login" component={Login}/>
          </Switch>
        </MeetingContextProvider>
      </ContactContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
