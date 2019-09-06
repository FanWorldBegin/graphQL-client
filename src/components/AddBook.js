import React, { Component } from 'react';
import { graphql } from '@apollo/react-hoc';
import { gql } from "apollo-boost";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';
import * as compose from "lodash.flowright";


class AddBook extends Component {
  state= {
    name: '',
    genre: '',
    authorID: '',
  }
  displayAuthors = () => {
    const data = this.props.getAuthorsQuery;
    console.log(this.props)
    if (data.loading) {
      return (<option disabled>Loading authors...</option>)
    } else {
      return (
        data.authors.map(author => {
          return (
            <option key={author.id} value={author.id}>{author.name}</option>
          )
        })
      )
    }
  }
  //点击button后到submit 
  submitForm = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={ e=> this.setState({name: e.target.value})} />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={(e) => this.setState({ genre: e.target.value })} />
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={(e) => this.setState({ authorId: e.target.value })}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <div>
          <button>+</button>
        </div>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
// export default graphql(getAuthorsQuery)(AddBook);