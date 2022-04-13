// src/components/Credits.js
import React, { useEffect, useState, Component } from 'react';

const Credits = () => {
    function FetchCredits() {
        const [creditData, setCreditData] = useState([{
            description: '',
            amount: Number,
            date: '',
        }])

        useEffect(() => {fetch('https://moj-api.herokuapp.com/credits')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            }).then(jsonRes => setCreditData(jsonRes));
        }, [])


        return(
            <div className='creditsContainer'>
                {creditData.map((info) => {
                    return (
                        <>
                            <div className='creditsCard'>
                                <div className='infoDiv'>{info.description}</div>
                                <div className='infoDiv'>{info.amount}</div>
                                <div className='infoDiv'>{info.date.slice(0,10)}</div>
                            </div>
                        </>
                    )
                })}
            </div>
        )
    }

    function getDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
        
        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }

    class AddCredits extends Component {
        constructor() {
            super();
            this.state = {
                listItems: [],
                description: '',
                amount: Number,
                date: getDate(),
            }

            this.changeDescription = this.changeDescription.bind(this);
            this.changeAmount = this.changeAmount.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
        }

        changeDescription(event) {
            this.setState({
                description:event.target.value
            })
        }
        
        changeAmount(event) {
            this.setState({
                amount:event.target.value
            })
        }

        onSubmit(event) {
            event.preventDefault();

            this.setState({
                listItems: [...this.state.listItems, {description: this.state.description, amount: this.state.amount, date: this.state.date}]
            })

            this.setState({
                description:'',
                amount:Number,
            })
        }

        render() {
            console.log(this.state.listItems);

            let creditSum = this.state.listItems.reduce(function(prev, current){
                return prev + +current.amount
            }, 0);

            return (
                <div>
                    <form onSubmit={this.onSubmit}>
                        <input type="text" placeholder="Description" name="description" onChange={this.changeDescription} value={this.state.description} required />
                        <input type="number" placeholder="Amount" name="amount" onChange={this.changeAmount} value={this.state.amount} required />
                        <button type="submit">Add Credit</button>
                    </form>
                    <div>
                        <div>Balance: {creditSum}</div>
                    </div>
                    <div>
                        <FetchCredits/>
                    </div>
                    <div className='newEntries'>
                        {
                            this.state.listItems.map((li,key) => 
                            <div {...{key}}>
                                <div>{li.description}</div>
                                <div>{li.amount}</div>
                                <div>{li.date}</div>
                                <br></br>
                            </div>
                            )
                        }
                    </div>
                    <br></br>
                </div>
            )
        }
    }

  return (
    <div>
      <h1>Credits</h1>
      <AddCredits/>
    </div>
  )
}

export default Credits;