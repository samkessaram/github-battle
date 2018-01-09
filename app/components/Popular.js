var React = require('react');

class Popular extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      // Set default to show all languages
      selectedLanguage: 'All'
    };
  }

  updateLanguage(lang){
    this.setState(function(){
      return {
        selectedLanguage: lang
      }
    })
  }

  render() {

    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

    return (
      <ul className='languages'>
        { 
          languages.map( (lang) => {
            return (
              <li 
                key={lang} 
                className={ this.state.selectedLanguage === lang ? 'language--selected language' : 'language' }
                onClick={ () => { this.updateLanguage(lang) } }>
                {lang}
              </li>)
          })
        }
      </ul>
    )
  }
}

module.exports = Popular;