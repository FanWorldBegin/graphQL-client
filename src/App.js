import React, {Component} from 'react';
import './App.css';
import BookList from './components/BookList'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
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
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
