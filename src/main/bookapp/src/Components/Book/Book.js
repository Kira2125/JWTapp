import {Component} from "react";
import {Button, Card, Form, Image, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import {fetchBook, saveBook, updateBook} from "../../Store/Book/bookActions";
import {connect} from "react-redux";

class Book extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            genres: [{value: "adv", display: "Adventury"}, {value: "rmc", display: "Romance"},{value: "hsr", display: "History"},
                {value: "snc", display: "Science"},{value: "bgp", display: "Biography"},],
            languages : [{value: "en", display: 'English'}, {value: "nen", display: 'Not-English'}],
            show : false
        };
        this.bookChange = this.bookChange.bind(this);
        this.submitBook = this.submitBook.bind(this);
    }

    initialState = {
        id:'', title:'', author:'', coverPhotoURL:'', isbnNumber:'', price:'', language:'', genre:''
    };

    componentDidMount() {
        const bookId = +this.props.match.params.id;
        if(bookId) {
            this.findBookById(bookId);
        }
    }



    findBookById = (bookId) => {
        this.props.fetchBook(bookId);
        setTimeout(() => {
            let book = this.props.bookObject.book;
            if(book != null) {
                this.setState({
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    coverPhotoURL: book.coverPhotoURL,
                    isbnNumber: book.isbnNumber,
                    price: book.price,
                    language: book.language,
                    genre: book.genre
                });
            }
        }, 1000);
    };

    resetBook = () => {
        this.setState(() => this.initialState);
    };

    submitBook = event => {
        event.preventDefault();

        const book = {
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language,
            genre: this.state.genre
        };

        this.props.saveBook(book);
        setTimeout(() => {
            if(this.props.bookObject.book != null) {
                this.setState({"show":true, "method":"post"});
                setTimeout(() => this.setState({"show":false}), 3000);
            } else {
                this.setState({"show":false});
            }
        }, 2000);
        this.setState(this.initialState);
    };

    updateBook = event => {
        event.preventDefault();

        const book = {
            id: this.state.id,
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language,
            genre: this.state.genre
        };
        this.props.updateBook(book);
        setTimeout(() => {
            if(this.props.bookObject.book != null) {
                this.setState({"show":true, "method":"put"});
                setTimeout(() => this.setState({"show":false}), 3000);
            } else {
                this.setState({"show":false});
            }
        }, 2000);
        this.setState(this.initialState);
    };

    bookChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    bookList = () => {
        setTimeout(() => {
            return this.props.history.push("/books");
        }, 2000)
    };

    render() {
        const {title, author, coverPhotoURL, isbnNumber, price, language, genre} = this.state;

        return (
            <div>

                <Card className={"border"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Book" : "Add New Book"}
                    </Card.Header>
                    <Form onReset={this.resetBook} onSubmit={this.state.id ? this.updateBook : this.submitBook} id="bookFormId">
                        <Card.Body style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Form.Row>
                                <Form.Group controlId="formGridTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="test" name="title"
                                                  value={title} onChange={this.bookChange}
                                                  placeholder="Enter Book Title" />
                                </Form.Group>
                                <Form.Group controlId="formGridAuthor">
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="test" name="author"
                                                  value={author} onChange={this.bookChange}
                                                  placeholder="Enter Book Author" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group controlId="formGridCoverPhotoURL">
                                    <Form.Label>Cover Photo URL</Form.Label>
                                    <InputGroup>
                                        <Form.Control required autoComplete="off"
                                                      type="test" name="coverPhotoURL"
                                                      value={coverPhotoURL} onChange={this.bookChange}
                                                      placeholder="Enter Book Cover Photo URL" />
                                        <InputGroup.Append>
                                            {this.state.coverPhotoURL !== '' && <Image src={this.state.coverPhotoURL} roundedRight width="40" height="38"/>}
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group  controlId="formGridISBNNumber">
                                    <Form.Label>ISBN Number</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="test" name="isbnNumber"
                                                  value={isbnNumber} onChange={this.bookChange}
                                                  placeholder="Enter Book ISBN Number" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group  controlId="formGridPrice">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="test" name="price"
                                                  value={price} onChange={this.bookChange}
                                                  placeholder="Enter Book Price" />
                                </Form.Group>
                                <Form.Group  controlId="formGridLanguage">
                                    <Form.Label>Language</Form.Label>
                                    <Form.Control required as="select"
                                                  custom onChange={this.bookChange}
                                                  name="language" value={language}>
                                        {this.state.languages.map(language =>
                                            <option key={language.value} value={language.value}>
                                                {language.display}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formGridGenre">
                                    <Form.Label>Genre</Form.Label>
                                    <Form.Control required as="select"
                                                  custom onChange={this.bookChange}
                                                  name="genre" value={genre}>
                                        {this.state.genres.map(genre =>
                                            <option key={genre.value} value={genre.value}>
                                                {genre.display}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit" onClick={this.bookList.bind()}>
                                <FontAwesomeIcon icon={faSave} /> {this.state.id ? "Update" : "Save"}
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.bookList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Book List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        bookObject: state.book
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveBook: (book) => dispatch(saveBook(book)),
        fetchBook: (bookId) => dispatch(fetchBook(bookId)),
        updateBook: (book) => dispatch(updateBook(book)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Book);