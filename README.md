# graphQL-client
前端使用react

## 创建连接
```
import React, {Component} from 'react';
import './App.css';
import BookList from './components/BookList'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import AddBook from './components/AddBook';

//ApolloProvider 发送请求 
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});
class App extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h1>reading</h1>
          <BookList/>
          <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;

```

查询语句
```
import { gql } from "apollo-boost";

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

export { getBooksQuery, getAuthorsQuery }

```
## 使用高阶组件
```
import React, { Component } from 'react';
import { graphql } from '@apollo/react-hoc';
import { gql } from "apollo-boost";
import { getBooksQuery } from '../queries/queries';

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
```