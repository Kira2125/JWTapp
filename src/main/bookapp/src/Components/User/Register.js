import {Component} from "react";
import {Button, Card, Col, InputGroup, Row, Form, FormControl} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHandPointRight, faEnvelope, faLock, faUndo, faUserPlus, faUser} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {authenticateUser} from "../../Store/User/Auth/authActions";
import {addUser} from "../../Store/User/userActions";


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        name:'', email:'', password:'', lastName:''
    };

    addNewUser = () => {
        this.props.addUser(this.state.name, this.state.lastName, this.state.email, this.state.password);
        setTimeout(() => {
            if(!this.props.user.error) {
                return this.props.history.push("/login");
            } else {
                this.resetLoginForm();
                this.setState({"error":"Invalid data"});
            }
        }, 500);
    };

    userChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    resetRegisterForm = () => {
        this.setState(() => this.initialState);
    };

    render() {
        const {name, email, password, lastName} = this.state;

        return (
            <Row className="justify-content-md-center">
                <Col xs={5}>
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header>
                            <FontAwesomeIcon icon={faUserPlus}/> Register
                        </Card.Header>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faUser}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl autoComplete="off" type="text" name="name" value={name} onChange={this.userChange}
                                                     className={"bg-dark text-white"} placeholder="Enter Name"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faHandPointRight}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl autoComplete="off" type="text" name="lastName" value={lastName} onChange={this.userChange}
                                                     className={"bg-dark text-white"} placeholder="Enter Last Name"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faEnvelope}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl required autoComplete="off" type="text" name="email" value={email} onChange={this.userChange}
                                                     className={"bg-dark text-white"} placeholder="Enter Email Address"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faLock}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl required autoComplete="off" type="password" name="password" value={password} onChange={this.userChange}
                                                     className={"bg-dark text-white"} placeholder="Enter Password"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>

                        </Card.Body>
                        <Card.Footer style={{"text-align":"right"}}>
                            <Button size="sm" type="button" variant="success" onClick={this.addNewUser}
                                    disabled={this.state.email.length === 0 || this.state.password.length === 0}>
                                <FontAwesomeIcon icon={faUserPlus}/> Register
                            </Button>{' '}
                            <Button size="sm" type="button" variant="info" onClick={this.resetRegisterForm}>
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => {
    return {
        user:state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (name, lastName, email, password) => dispatch(addUser(name, lastName, email, password))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);