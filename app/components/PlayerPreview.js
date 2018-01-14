import React from 'react'
import PropTypes from 'prop-types'

function PlayerPreview(props) {
  return (
    <div className='player-preview'>
      <div className='column'>
        <img 
          className='avatar'
          src={props.avatar} 
          alt={'Avatar for ' + props.username } 
        />
        <h2 className='player-preview__username'>@{props.username}</h2>
        {props.children}
      </div>
    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

export default PlayerPreview