import logo from './logo.svg';
import './App.css';
import {Container, Row, Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Footer from "./Components/Footer";
import Welcome from "./Components/Welcome";
import NavigationBar from "./Components/NavigationBar";
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";

export default function App() {

  const heading = "Welcome";
  const quote = "I Believe That Whatever Doesn’t Kill You Simply Makes You...Stranger";
  const footer = "Joker";

  return (
      <Router>
        <NavigationBar/>
        <Container className={"text-center"}>
          <Row>
            <Col lg={12} style={{marginTop: 20 + 'px'}}>
              <Switch>
                <Route path="/" exact component={() => <Welcome heading={heading} quote={quote} footer={footer}/>}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/logout" exact component={Login}/>
                <Route path="/register" exact component={Register}/>
              </Switch>
            </Col>
          </Row>
        </Container>
        <Footer/>
      </Router>
  );
}

