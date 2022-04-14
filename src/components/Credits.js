// src/components/Credits.js
import React, { useEffect, useState, Component } from 'react';
import "./Credits.css";

const Credits = () => {
    var initTotal = 0;

    function GetTotal() {
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

        var num = 0;
        var max = 0;

        creditData.map((info) => {initTotal = creditData.reduce(function(prev, current) {
                    return prev + +current.amount;
                    }, num);

                    if (initTotal > max) {
                        max = initTotal;
                    }

                    return (
                        <></>
                    )
                })
        
        return max;
    }

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

        var num = 0;

        return(
            <div className='creditsContainer'>
                {creditData.map((info) => {
                    initTotal = creditData.reduce(function(prev, current) {
                        return prev + +current.amount;
                    }, num);
                    return (
                        <>
                            <div className='creditCardContainer'>
                                <div className='creditsCard'>
                                    <div className='infoDiv'>{info.description}</div>
                                    <div className='infoDiv'>${info.amount}</div>
                                    <div className='infoDiv'>{info.date.slice(0,10)}</div>
                                </div>
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
            this.sum = {
                max: initTotal,
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
            let creditSum = this.state.listItems.reduce(function(prev, current){
                return prev + +current.amount
            }, initTotal);

            if (creditSum === 0) {
                return (
                    <div className='creditsMain'>
                        <div className='creditsLeft'>
                            <h1>Credits</h1>
                            <form onSubmit={this.onSubmit} className="formContainer">
                                <input  className="formBox" type="text" placeholder="Description" name="description" onChange={this.changeDescription} value={this.state.description} required />
                                <input className="formBox" type="number" placeholder="Amount" name="amount" onChange={this.changeAmount} value={this.state.amount} required />
                                <button className="submitBox" type="submit">Add Credit</button>
                            </form>
                            <div>
                                <div className='formBox'>Balance: $<GetTotal/></div>
                            </div>
                        </div>
                        <div className='creditsRight'>
                                <FetchCredits/>
                            </div>
                            <div>
                                {
                                    this.state.listItems.map((li,key) => 
                                    <div className="newEntryCardContainer">
                                        <div {...{key}} className="newEntryCard">
                                            <div className="infoDiv" >{li.description}</div>
                                            <div className="infoDiv" >{li.amount}</div>
                                            <div className="infoDiv" >{li.date}</div>
                                        </div>
                                    </div>
                                    )
                                }
                            </div>
                        </div>
                )
            }
            return (
                <div className='creditsMain'>
                    <div className='creditsLeft'>
                        <h1>Credits</h1>
                        <form onSubmit={this.onSubmit} className="formContainer">
                            <input  className="formBox" type="text" placeholder="Description" name="description" onChange={this.changeDescription} value={this.state.description} required />
                            <input className="formBox" type="number" placeholder="Amount" name="amount" onChange={this.changeAmount} value={this.state.amount} required />
                            <button className="submitBox" type="submit">Add Credit</button>
                        </form>
                        <div>
                            <div className='formBox'>Balance: ${creditSum}</div>
                        </div>
                    </div>
                    <div className='creditsRight'>
                            <FetchCredits/>
                        </div>
                        <div>
                            {
                                this.state.listItems.map((li,key) => 
                                <div className="newEntryCardContainer">
                                    <div {...{key}} className="newEntryCard">
                                        <div className="infoDiv" >{li.description}</div>
                                        <div className="infoDiv" >{li.amount}</div>
                                        <div className="infoDiv" >{li.date}</div>
                                    </div>
                                </div>
                                )
                            }
                        </div>
                    </div>
            )
        }
    }

  return (
    <div>
        <AddCredits/>
    </div>
  )
}

export default Credits;