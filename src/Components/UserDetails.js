import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';



class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLogin: this.props.match.params.login,
      searchResult: this.props.users,
      user: '',
      repos: [],
    };
    this.getRepos = this.getRepos.bind(this);
    this.reposCard = this.reposCard.bind(this);
    this.newFetch = this.newFetch.bind(this);
  }

   componentDidMount () {
    const { userLogin, searchResult } = this.state;
    if (searchResult.length === 0) {
      this.newFetch(userLogin);
    } else {
      const theUser = searchResult.find((result) => result.login === userLogin);
      this.setState({
        user: theUser,
      });
      this.getRepos(theUser.login);
    }
  }

  async getRepos(param) {
    const api = await fetch(`https://api.github.com/users/${param}/repos`);
    const repos = await api.json();
    console.log(repos);
    this.setState({
      repos,
    });
  }

  async newFetch(param) {
    const newApi = await fetch(`https://api.github.com/users/${param}`);
    const newUser = await newApi.json();
    this.setState({
      user: newUser,
    });

    this.getRepos(newUser.login);
  }

  reposCard() {
    const { repos } = this.state;
    return (<div className="repo-links" >
      <h2>Principais Repositórios</h2>
      {repos.slice(0, 3).map((repo, index) => (
        <div key={ index }>
          <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
        </div>
      )
      )}
    </div>
    )
  }

  render() {
    const { user, userLogin } = this.state;
    if (user !== '') {
        return (
          <div className="details-body">
            <Link to="/" className="voltar-link">Home</Link>
            <h1>{userLogin}</h1>
            <div className="details-main-content">
            <img src={user.avatar_url} alt="imagem do usuario"/>
            {this.reposCard()}
            </div>
          </div>
          );
        }
        return (<div>UserDetails</div>);
  };

};

const mapStateToProps = (state) => ({
  users: state.meuReducer.request,
});

export default connect(mapStateToProps, null)(UserDetails);
