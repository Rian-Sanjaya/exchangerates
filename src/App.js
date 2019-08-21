import React from 'react'
import axios from 'axios'

class App extends React.Component {
  selectInput = React.createRef()

  state = {
    options: ['EUR', 'HKD', 'AUD', 'NZD', 'CZK'],
    currencies: ['CAD', 'IDR', 'GBP', 'CHF', 'SGD', 'INR', 'MYR', 'JPY', 'KRW'],
    currVal: 10.000,
    currList: {},
    addFlag: true,
  }

  displayCurrencyName(curr) {
    switch(curr) {
      case "EUR":
        return "Euro"

      case "HKD":
        return "Hong Kong Dollar"

      case "AUD":
        return "Australian Dollar"
  
      case "NZD":
        return "New Zealand Dollar"

      case "CZK":
        return "Czech Koruna"

      case "CAD":
        return "Canadian Dollar"

      case "IDR":
          return "Indonesian Rupiah"
  
      case "GBP":
        return "United Kingdom Pound"

      case "CHF":
        return "Switzerland Franc"
  
      case "SGD":
        return "Singapore Dollar"

      case "INR":
        return "India Rupee"

      case "MYR":
        return "Malaysia Ringgit"

      case "JPY":
        return "Japanese Yen"

      case "KRW":
        return "Korea (South) Won"

      default:
        return ""
    }
  }

  fetchCurrencies(currencies) {
    // console.log(this.state.currencies)

    let listCurr

    if (currencies) listCurr = currencies
    else listCurr = this.state.currencies.join()

    axios.get(`https://api.exchangeratesapi.io/latest?base=USD&symbols=${listCurr}`)
    .then( res => {
      // console.log(res.data)
      this.setState({
        currList: res.data.rates
      })
    })
    .catch( err => console.error(err))
  }

  componentDidMount() {
    this.fetchCurrencies()
  }

  handleChange(e) {
    const target = e.target
    const name = target.name
    const val = target.value

    this.setState({
      [name]: val
    })
  }

  handleDelete(e, symbol) {
    // console.log(symbol)

    if (this.state.currencies.length === 1) return

    const newCurrencies = this.state.currencies.filter( curr => curr !== symbol )
    // console.log('new currencies: ', newCurrencies)
    this.setState( prevState => {
      return {
        options: [...prevState.options, symbol],
        currencies: newCurrencies
      }
    },
    this.fetchCurrencies(newCurrencies))
  }

  handleAdd(e) {
    // console.log(this.selectInput.current.value) 
    if (!this.selectInput.current.value) return

    const newOptions = this.state.options.filter( curr => curr !== this.selectInput.current.value)
    const newCurrencies = [...this.state.currencies, this.selectInput.current.value]

    this.setState( prevState => {
      return {
        options: newOptions,
        currencies: newCurrencies,
        addFlag: !this.state.addFlag
      }
    },
    this.fetchCurrencies(newCurrencies))
  }

  render() {
    const { options, currVal, currList, addFlag } = this.state
    // console.log(currList)

    const symbols = currList ? Object.keys(currList) : null
    // console.log(symbols) 

    return (
      <div style={{
        margin: '0 auto',
        width: '300px',
        border: '1px solid',
      }}>

        <header style={{ borderBottom: '1px solid', padding: '10px' }}>
          <div style={{ fontSize: '16px' }}>USD - United States Dollars</div>

          <div style={{ display: 'flex' }}>
            <div>USD</div>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
              <input 
                className="curr-val" 
                type="number" 
                name="currVal" 
                value={currVal} 
                onChange={ (e) => this.handleChange(e) }
              />
            </div>
          </div>

        </header>

        <div style={{ padding: '10px' }}>

          {
            symbols.map( symbol => (
              <div key={symbol} style={{ display: 'flex', marginBottom: '10px', border: '1px solid' }}>
                <div style={{ flexBasis: '90%', padding: '3px' }}>
                  <div style={{ display: 'flex' }}>
                    <div>{symbol}</div>
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>{(currList[symbol] * currVal).toFixed(4)}</div>
                  </div>
                  <div>{`${symbol} - ${this.displayCurrencyName(symbol)}`}</div>
                  <div>{`1 USD = ${symbol} ${currList[symbol].toFixed(4)}`}</div>
                </div>

                <div style={{ borderLeft: '1px solid', padding: '0 3px' }}>
                  <button style={{ height: '100%', background: '#fff', border: 'none', outline: 'none', cursor: 'pointer' }} onClick={ e => this.handleDelete(e,symbol) }>
                    (-)
                  </button>
                </div>
              </div>
            ))
          }

          {
            addFlag ?
              <div>
                <button style={{ width: '100%', textAlign: 'left', cursor: 'pointer' }} onClick={ () => this.setState({ addFlag: !addFlag }) }>(+) Add More Currencies</button>
              </div>
            : <div>
                <select 
                  ref={this.selectInput}
                  name="moreCurr" 
                  onChange={ e => this.handleChange(e)}
                  style={{ width: '70%' }}
                >
                  {
                    options.map( curr => (
                      <option key={curr}>{curr}</option>
                    ))
                  }
                </select>
                <button style={{ cursor: 'pointer' }} onClick={ e => this.handleAdd(e)}>Submit</button>
              </div> 
          }

        </div>

      </div>
    )
  }
}

export default App;
