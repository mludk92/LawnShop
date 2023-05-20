import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import './InfoPage.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function InfoPage() {
  const dispatch = useDispatch();
  const sales = useSelector(store => store.sale);

  useEffect(() => {
    dispatch({ type: 'FETCH_SALE' });
  }, [dispatch]);

  const [startdate, setStart] = useState(null);
  const [enddate, setEnd] = useState(null);
  const [error, setError] = useState('');  

  const addSale = (event) => {
    event.preventDefault();
  
    if (enddate && startdate && startdate > enddate) {
      setError('End date cannot be before the start date.');
      return;
    }
  
    dispatch({
      type: 'ADDSALE',
      payload: {
        startdate: startdate ? startdate.toISOString().substring(0, 10) : '',
        enddate: enddate ? enddate.toISOString().substring(0, 10) : '',
      },
    });
  
    setStart(null);
    setEnd(null);
    setError(''); // Clear the error message
  };

  return (
    <div className="container">
      <p>Your Current and Previous Sales</p>
      {/* <div>{JSON.stringify(sales)}</div> */}
      <section className="sales">
        {sales.map((sale) => {
          const fromDate = sale.fromdate.substring(0, 10);
          const toDate = sale.todate.substring(0, 10);

          return (
            <div key={sale.id} className="sale-card">
              <h3>Start Date: {fromDate}</h3>
              <h3>End Date: {toDate}</h3>
            </div>
          );
        })} 
       </section>
      <form className="addSale" onSubmit={addSale}>
        <h2>Add Sale</h2>
        {error && <p className="error">{error}</p>}
        <div className="addform">
          <label htmlFor="Start Date">Start Date:</label>
          <DatePicker
            selected={startdate}
            onChange={(date) => setStart(date)}
            dateFormat="yyyy/MM/dd"
            required
          />
        </div>
        <div className="addform">
          <label htmlFor="End Date">End Date:</label>
          <DatePicker
            selected={enddate}
            onChange={(date) => setEnd(date)}
            dateFormat="yyyy/MM/dd"
            required
          />
        </div>
        <div>
          <input className="btn" type="submit" name="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}

export default InfoPage;
