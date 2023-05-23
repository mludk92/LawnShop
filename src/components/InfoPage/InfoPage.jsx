import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "./InfoPage.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function InfoPage() {
  const dispatch = useDispatch();
  const sales = useSelector((store) => store.sale);
  const featured = useSelector((store) => store.featured);

  useEffect(() => {
    dispatch({ type: "FETCH_SALE" });
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: "FETCH_FEATURED" });
  }, [dispatch]);

  const [startdate, setStart] = useState(null);
  const [enddate, setEnd] = useState(null);
  const [error, setError] = useState("");
  const [item, setItem] = useState("");
  const [desc, setDesc] = useState("");

  const addSale = (event) => {
    event.preventDefault();
  
    if (enddate && startdate && startdate > enddate) {
      setError("End date cannot be before the start date.");
      return;
    }
  
    if (!startdate) {
      setError("Please select a start date.");
      return;
    }
  
    dispatch({
      type: "FETCH_NEWSALE",
      payload: {
        fromdate: startdate.toISOString().substring(0, 10),
        todate: enddate ? enddate.toISOString().substring(0, 10) : "",
      },
    });
  
    // Dispatch FETCH_SALE after adding the new sale
    dispatch({ type: "FETCH_SALE" });
  
    setStart(null);
    setEnd(null);
    setError(""); // Clear the error message
  };
  
  

  return (
    <div className="container">
      <p>Your Current and Previous Sales</p>
      {/* <div>{JSON.stringify(featured)}</div> */}
      <section className="sales ">
        {sales.map((sale) => {
          const fromDate = sale.fromdate ? sale.fromdate.substring(0, 10) : "";
          const toDate = sale.todate ? sale.todate.substring(0, 10) : "";
  
          // Filter the featured items related to the current sale
          const saleFeatured = featured.filter(
            (feature) => feature.sales_id === sale.id
          );
  
          return (
            <div key={sale.id} className="sale-card ripped-border">
              <h3>Start Date: {fromDate}</h3>
              <h3>End Date: {toDate}</h3>
  
              {saleFeatured.map((feature) => (
                <div key={feature.id}>
                  <p>Item: {feature.item}</p>
                  <p>Description: {feature.description}</p>
                </div>
              ))}
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
            name="startdate" // Add name attribute
            required
          />

          <label htmlFor="End Date">End Date:</label>
          <DatePicker
            selected={enddate}
            onChange={(date) => setEnd(date)}
            dateFormat="yyyy/MM/dd"
            name="enddate" // Add name attribute
            required
          />
        </div>
        <div>
          <input className="btn" type="submit" name="submit" value="Submit" />
        </div>
      </form>
      <div>
        {" "}
        Test
        <div>{JSON.stringify(featured)}</div>
      </div>
    </div>
  );
}

export default InfoPage;
