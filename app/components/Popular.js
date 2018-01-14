import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'

function SelectLanguage(props) {

  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

  return (
    <ul className='languages'>
      { 
        languages.map( (lang) => {
          return (
            <li 
              key={lang} 
              className={ props.selectedLanguage === lang ? 'language--selected language' : 'language' }
              onClick={ () => { props.onSelect(lang) } }>
              {lang}
            </li>)
        })
      }
    </ul>
  )
}


function RepoGrid(props){
  return (
    <ul className='popular-list'>
      { props.repos.map( (repo,index) => {
        return (
          <li key={repo.name} className='popular-list-item'>
            <div className='popular-list-item__rank'>
              #{index + 1}
            </div>

            <ul className='popular-list-item__data'>
              <li>
                <img src={repo.owner.avatar_url} alt={'Avatar for ' + repo.owner.login} className='avatar'/>
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      // Set default to show all languages
      selectedLanguage: 'All',
      repos: null
    };

    this.updateLanguage = this.updateLanguage.bind(this)
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage(lang){
    this.setState( () => {
      return {
        selectedLanguage: lang,
        repos: null
      }
    })

    fetchPopularRepos(lang)
      .then( (repos) => {
        this.setState( () => {
          return {
            repos: repos
          }
        })
      })
  }

  render() {

    let grid = null

    if ( !this.state.repos ){
      grid = <p>LOADING</p>
    } else {
      grid = <RepoGrid repos={this.state.repos} />
    }


    return (
      <div>
        <SelectLanguage 
          selectedLanguage={ this.state.selectedLanguage }
          onSelect={ this.updateLanguage }
        />
        {grid}
      </div>
    )
  }
}

export default Popular