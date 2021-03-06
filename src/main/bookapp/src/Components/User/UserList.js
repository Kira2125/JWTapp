import {Component} from "react";
import {connect} from "react-redux";
import {fetchUsers} from "../../Store/User/userActions";
import {Alert, Card, Table} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUsers} from '@fortawesome/free-solid-svg-icons'

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users : [],
            currentPage : 1,
            usersPerPage : 5
        };
    }

    componentDidMount() {
        this.props.fetchUsers();
    }


    render() {
        const {currentPage, usersPerPage} = this.state;
        const lastIndex = currentPage * usersPerPage;
        const firstIndex = lastIndex - usersPerPage;

        const userData = this.props.userData;
        const users = userData.users;
        const currentUsers = users.slice(firstIndex, lastIndex);
        const totalPages = users.length / usersPerPage;

        return (
            <div>
                {userData.error ?
                    <Alert variant="danger">
                        {userData.error}
                    </Alert> :
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header><FontAwesomeIcon icon={faUsers} /> User List</Card.Header>
                        <Card.Body>
                            <Table bordered hover striped variant="dark">
                                <thead>
                                <tr>
                                    <td>First Name</td>
                                    <td>Last Email</td>
                                    <td>Email</td>
                                    <td>Role</td>
                                    <td>Status</td>
                                </tr>
                                </thead>
                                <tbody>
                                {users.length === 0 ?
                                    <tr align="center">
                                        <td colSpan="6">No Users Available</td>
                                    </tr> :
                                    currentUsers.map((user, index) => (
                                        <tr key={index}>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>{user.status}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </Table>
                        </Card.Body>

                    </Card>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userData: state.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUsers())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);