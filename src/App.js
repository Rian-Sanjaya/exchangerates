import React from 'react'
import axios from 'axios'
import Header from './components/header'
import CurrenciesList from './components/CurrenciesList'

class App extends React.Component {
  selectInput = React.createRef()

  state = {
    options: ['EUR', 'HKD', 'AUD', 'NZD', 'CZK'],
    currencies: ['CAD', 'IDR', 'GBP', 'CHF', 'SGD', 'INR', 'MYR', 'JPY', 'KRW'],
    currVal: 10.000,
    currList: {},
    addFlag: true,
  }

  fetchCurrencies(currencies) {
    let listCurr

    if (currencies) listCurr = currencies
    else listCurr = this.state.currencies.join()

    axios.get(`https://api.exchangeratesapi.io/latest?base=USD&symbols=${listCurr}`)
    .then( res => {
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
    let val = target.value

    if (target.type === "number" && val < 1) val = 1

    this.setState({
      [name]: val
    })
  }

  handleDelete(e, symbol) {
    if (this.state.currencies.length === 1) return

    const newCurrencies = this.state.currencies.filter( curr => curr !== symbol )
    this.setState( prevState => {
      return {
        options: [...prevState.options, symbol],
        currencies: newCurrencies
      }
    },
    this.fetchCurrencies(newCurrencies))
  }

  handleAdd() {
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

  toggleAddFlag() {
    this.setState({ addFlag: !this.state.addFlag })
  }

  render() {
    const { options, currVal, currList, addFlag } = this.state
    const symbols = currList ? Object.keys(currList) : null

    return (
      <div className="wrapper">

        <Header currVal={currVal} onHandleChange={ (e) => this.handleChange(e) } />

        <div style={{ padding: '10px' }}>

          <CurrenciesList 
            symbols={symbols} 
            currList={currList} 
            currVal={currVal} 
            onHandleDelete={ (e, symbol) => this.handleDelete(e, symbol) } 
          />

          {
            addFlag ?
              <div>
                <button 
                  style={{ width: '100%', textAlign: 'left', cursor: 'pointer' }} 
                  onClick={() => this.setState({ addFlag: !addFlag })}
                >
                  (+) Add More Currencies
                </button>
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
                <button style={{ cursor: 'pointer' }} onClick={() =>this.handleAdd()}>Submit</button>
              </div> 
          }

        </div>

      </div>
    )
  }
}

export default App;
