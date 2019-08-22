import React from 'react'

const Header = ({currVal, onHandleChange}) => {
  return (
    <header className="header-title">
      <div className="italic-font">USD - United States Dollars</div>

      <div style={{ display: 'flex' }}>
        <div style={{ fontWeight: 600 }}>USD</div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
          <input 
            className="curr-val" 
            type="number" 
            min="1"
            name="currVal" 
            value={currVal} 
            onChange={ (e) => onHandleChange(e) }
          />
        </div>
      </div>

    </header>
  )
}

export default Header