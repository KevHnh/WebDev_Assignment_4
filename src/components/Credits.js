// src/components/Credits.js
import React, { useEffect, useState, Component } from 'react';

const Credits = (props) => {
    function FetchCredits() {
        const [creditData, setCreditData] = useState([{
            description: '',
            amount: '',
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
                            <br></br>
                        </>
                    )
                })}
            </div>
        )
    }

    function AddCredit(newEntry) {
        console.log(newEntry);
        return(
            <div>
                <div className='infoDiv'>{newEntry.description}</div>
                <div className='infoDiv'>{newEntry.amount}</div>
                <div className='infoDiv'>{newEntry.date}</div>
            </div>
        )
    }

    function getDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }

    class AddCredits extends Component {
        constructor() {
            super();
            this.state = {
                description: '',
                amount: '',
                date: '',
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

            const creditsInfo = {
                description: this.state.description,
                amount: this.state.amount,
                date: getDate(),
            }

            AddCredit(creditsInfo);

            this.setState({
                description:'',
                amount:'',
            })
        }

        render() {
            return (
                <div>
                    <form onSubmit={this.onSubmit}>
                        <input type="text" placeholder="Description" name="description" onChange={this.changeDescription} value={this.state.description}/>
                        <input type="number" placeholder="Amount" name="amount" onChange={this.changeAmount} value={this.state.amount}/>
                        <button type="submit">Add Credit</button>
                    </form>
                </div>
            )
        }
    }

  return (
    <div>
      <h1>Credits</h1>
      <AddCredits/>
      <FetchCredits/>
      <AddCredit/>
    </div>
  )
}

export default Credits;