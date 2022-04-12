// src/components/Credits.js
import React, { useEffect, useState } from 'react';

const Credits = (props) => {
    function FetchCredits() {
        const [creditData, setCreditData] = useState([{
            description: '',
            amount: '',
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
                                <div className='infoDiv'>{info.id}</div>
                                <div className='infoDiv'>{info.description}</div>
                                <div className='infoDiv'>{info.amount}</div>
                            </div>
                        </>
                    )
                })}
            </div>
        )
    }

  return (
    <div>
      <h1>Credits</h1>
      <form onSubmit={props.addCredit}>
        <input type="text" placeholder="Description" name="description" />
        <input type="number" placeholder="Amount" name="amount" />
        <button type="submit">Add Credit</button>
      </form>
      <FetchCredits/>
    </div>
  )
}

export default Credits;