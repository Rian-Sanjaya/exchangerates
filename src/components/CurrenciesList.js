import React, { Fragment } from 'react'
import { currencyDesc } from '../helper/currencyDesc'

const CurrenciesList = (props) => {
  const { symbols, currList, currVal, onHandleDelete } = props

  return (
    <Fragment>
      {
        symbols.map( symbol => {
          const total = parseFloat(currList[symbol] * currVal).toLocaleString('en', {minimumFractionDigits: 4})
          const oneCurr = parseFloat(currList[symbol]).toLocaleString('en', {minimumFractionDigits: 4})

          return <div key={symbol} style={{ display: 'flex', marginBottom: '10px', border: '1px solid' }}>
            <div style={{ flexBasis: '90%', padding: '3px' }}>
              <div style={{ display: 'flex', marginBottom: '5px' }}>
                <div>{symbol}</div>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>{total}</div>
              </div>
              <div className="italic-font" style={{ fontWeight: 600 }}>{`${symbol} - ${currencyDesc(symbol)}`}</div>
              <div className="italic-font">{`1 USD = ${symbol} ${oneCurr}`}</div>
            </div>

            <div style={{ borderLeft: '1px solid', padding: '0 3px' }}>
              <button 
                style={{ height: '100%', background: '#fff', border: 'none', outline: 'none', cursor: 'pointer', fontWeight: 600 }} 
                onClick={ e => onHandleDelete(e,symbol) }
              >
                (-)
              </button>
            </div>
          </div>
        })
      }
    </Fragment>
  )
}

export default CurrenciesList