import React from 'react';
import { connect } from 'react-redux';
import { addUser, fetchAPI } from '../actions';
import { Link } from 'react-router-dom';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleClick() {
    const { add, request } = this.props;
    const { name } = this.state;
    add(name);
    request(name);
    /* this.filterRequest(e); */
  }

  filterRequest(e) {
    const { users } = this.props;
    const search = users.filter((user) => user.login === e.target.value);
    console.log(search);
  }

  makeList() {
    const { users } = this.props;
    if (users !== '') {
      return (
      <div className="list-users">
      {users.map((user) => {
        return (<Link to={`/details/${user.login}`} className="user-link">
          <p>{user.login}</p>
          <img src={user.avatar_url} alt="imagem do usuario" className="search-user-avatar"/>
        </Link>);
      })}
      </div>
      );
    }
    return <div className="github-logo"></div>
  }

  render() {
    return (
      <div className="home-main">
        <form>
          <label>
          <input type='text' onChange={this.handleChange} placeholder="Pesquise um usuário do github"/>
          </label>
          <button type="button" onClick={ this.handleClick }>Buscar</button>
        </form>
        { this.makeList() }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  add: (param) => dispatch(addUser(param)),
  request: (param) => dispatch(fetchAPI(param)),
})

const mapStateToProps = (state) => ({
  users: state.meuReducer.request,
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
