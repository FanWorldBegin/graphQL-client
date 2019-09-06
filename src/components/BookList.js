import React, { Component } from 'react';
import { graphql } from '@apollo/react-hoc';
import { gql } from "apollo-boost";
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

class BookList extends Component {
  state = {
    selected: null,
  }
  displayBooks = () =>{
    const {data} = this.props;
    if(data.loading) {
      return (
        <div>loading books.......</div>
      )
    } else {
      return data.books.map(book => {
        return (
          <li key={book.id} onClick={e=>this.setState({selected: book.id})}>{book.name}</li>
        )
      })
    }
  }
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <ul>
          {
            this.displayBooks()
          }
        </ul>
        <BookDetails bookID={this.state.selected}/>

      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
