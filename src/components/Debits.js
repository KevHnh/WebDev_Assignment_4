// src/components/Debits.js
import './Debits.css'
import React, { useEffect, useState, Component } from 'react';
import Header from './Header';


const Debits = () => {
    var total = 0;

    
    // function used to get the json file from herkuapp
    function FetchDebits() {
        
        const [debitData, setDebitData] = useState([{
            description: '',
            amount: Number,
            date: '',
        }])

        

        useEffect(() => {fetch('https://moj-api.herokuapp.com/debits')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            }).then(jsonRes => setDebitData(jsonRes));
        }, [])

        var num = 0;
        

        return(
            <div className='debitsContainer'>
                
                {debitData.map((info,pos) => {
                    num += parseFloat(info.amount)
                    total = num
                    return (
                        
                        <div className='debitsCard' key={pos}>

                            <ul>
                                <li className='infoDiv'>
                                    { info.description + " " + info.amount + " " + info.date.slice(0,10)}
                                </li>
                            </ul>
                            
                        </div>
                
                    )
                })}
            </div>
        );
    } //end of fetchDebits

    // function that gets the current date
    function getDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
        
        today = yyyy + '-' + mm + '-' + dd;
        return today;
    } //end of getDate


    class AddDebits extends Component {
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
            //console.log(this.state.listItems);
            
            let debitSum = this.state.listItems.reduce(function(prev, current){
                return prev + +current.amount 
            }, total);

            return (
                <div>

                    <div>
                        <FetchDebits/>
                    </div>

                    <div className='newEntries'>
                    {
                        this.state.listItems.map((li,key) => 
                        <div {...{key}}>
                        
                            <ul>
                                <li>
                                    {li.description + " " + li.amount + " " + li.date}
                                </li>
                            </ul>
                            
                        </div>
                        )
                    }
                    </div>

                
                    <form onSubmit={this.onSubmit}>
                        <input type="text" placeholder="Description" name="description" onChange={this.changeDescription} value={this.state.description} required />
                        <input type="number" placeholder="Amount" name="amount" onChange={this.changeAmount} value={this.state.amount} required />
                        <button type="submit">Add Debit</button>
                    </form>
                    <div>
                        <div>Total Debit: {debitSum}</div>
                    </div>

                    
                    <br></br>
                </div>
            )
        }
    }//end of AddDebits

    

  return (
    <div className="debits_Body">
        
        <Header/>
        <div>
            <h1>Debits</h1>
            <AddDebits/>
        </div>
        
    </div>
  )
}

export default Debits;