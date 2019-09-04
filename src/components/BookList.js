import React, { Component } from 'react';
import { graphql } from '@apollo/react-hoc';
import { gql } from "apollo-boost";

const getBooksQuery = gql`{
  books {
    name,
    id
  }
}`
class BookList extends Component {
  displayBooks = () =>{
    const {data} = this.props;
    if(data.loading) {
      return (
        <div>loading books.......</div>
      )
    } else {
      return data.books.map(book => {
        return (
          <li key={book.id}>{book.name}</li>
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

      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
