import {Component} from "react";
import axios from "axios";
import {connect} from "react-redux";
import {deleteBook, getAllBooks} from "../../Store/Book/bookActions";
import {Button, ButtonGroup, Card, FormControl, Image, InputGroup, Table} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList} from '@fortawesome/free-solid-svg-icons';

class BookList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books : [],
        };
    }



    componentDidMount() {
        axios.get("http://localhost:8080/books").then((response) => {
            this.setState({books: response.data})
        })
    }


    render() {
        const {books} = this.state;

        return (
            <div>

                <Card className={"border "}>
                    <Card.Header>
                        <div style={{"float":"left"}}>
                            <FontAwesomeIcon icon={faList} /> Book List
                        </div>

                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover >
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>ISBN Number</th>
                                <th onClick={this.sortData}>Price <div className={this.state.sortDir === "asc" ? "arrow arrow-up" : "arrow arrow-down"}> </div></th>
                                <th>Language</th>
                                <th>Genre</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                books.length === 0 ?
                                    <tr align="center">
                                        <td colSpan="7">No Books Available.</td>
                                    </tr> :
                                    books.map((book) => (
                                        <tr key={book.id}>
                                            <td>
                                                <Image src={book.coverPhotoURL} roundedCircle width="25" height="25"/> {book.title}
                                            </td>
                                            <td>{book.author}</td>
                                            <td>{book.isbnNumber}</td>
                                            <td>{book.price}</td>
                                            <td>{book.language}</td>
                                            <td>{book.genre}</td>

                                        </tr>
                                    ))
                            }
                            </tbody>
                        </Table>
                    </Card.Body>

                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        bookObject: state.book
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getBooks: () => dispatch(getAllBooks()),
        deleteBook: (bookId) => dispatch(deleteBook(bookId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);