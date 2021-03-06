import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import PlayerPreview from './PlayerPreview'

class PlayerInput extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      username: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    var value = event.target.value;
    this.setState(()=>{
      return {
        username: value
      }
    })
  }

  handleSubmit(event){
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.username
    )
  }

  render(){
    return (
      <form className='form column' onSubmit={this.handleSubmit}>
        <label className='label' htmlFor='username'>
          {this.props.label}
        </label>
        <input 
          className='input'
          id='username'
          placeholder='GitHub Username'
          type='text'
          autoComplete='off'
          value={this.state.username}
          onChange={this.handleChange}
        />

        <button
          className='button'
          type='submit'
          disabled={!this.state.username}>
          Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }


  handleSubmit(id, username){
    this.setState(()=>{
      var newState = {};
      newState[id + 'Name'] = username;
      newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';  
      
      return newState;    
    })
  }

  handleReset(id){
    this.setState(()=>{
      var newState = {};
      newState[id + 'Name'] = '';
      newState[id + 'Image'] = null;  
      
      return newState;  
    })
  }

  render() {
    var match = this.props.match

    var playerOneName = this.state.playerOneName
    var playerTwoName = this.state.playerTwoName

    var playerOneImage = this.state.playerOneImage
    var playerTwoImage = this.state.playerTwoImage


    return (
      <div>
        <div className='row'>
          {!playerOneName && <PlayerInput id='playerOne' label='Player One' onSubmit={this.handleSubmit} />}
          {!!playerOneImage && 
            <PlayerPreview 
              avatar={playerOneImage}
              username={playerOneName}
            >
              <button
                className='player-preview__reset'
                onClick={()=>{this.handleReset('playerOne')}}
              >
                Reset
              </button>
            </PlayerPreview>
          }

          {!playerTwoName && <PlayerInput id='playerTwo' label='Player Two' onSubmit={this.handleSubmit} />}
          {!!playerTwoImage && 
            <PlayerPreview 
              avatar={playerTwoImage}
              username={playerTwoName}
            >
              <button
                className='player-preview__reset'
                onClick={()=>{this.handleReset('playerTwo')}}
              >
                Reset
              </button>
            </PlayerPreview>
          }
        </div>
        { playerOneImage && playerTwoImage && 
          <Link
            className='button'
            to={{
              pathname: match.url + '/results',
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
            }}
          >
          Battle
          </Link>
        }
      </div>
    )
  }
}

export default Battle