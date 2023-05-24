import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./InfoPage.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FeaturedItems from "../FeaturedItems/FeaturedItems";

function InfoPage() {
  const dispatch = useDispatch();
  const sales = useSelector((store) => store.sale);
  const featured = useSelector((store) => store.featured);

  useEffect(() => {
    dispatch({ type: "FETCH_SALE" });
    dispatch({ type: "FETCH_FEATURED" });
  }, [dispatch]);

  const [startdate, setStart] = useState(null);
  const [enddate, setEnd] = useState(null);
  const [error, setError] = useState("");
  const [selectedSale, setSelectedSale] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentDate = new Date();

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

    dispatch({ type: "FETCH_SALE" });

    setStart(null);
    setEnd(null);
    setError("");
  };

  const openModal = (sale) => {
    setSelectedSale(sale.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSale(null);
    setIsModalOpen(false);
  };

  const isCurrentDateInRange = (fromDate, toDate) => {
    const start = new Date(fromDate);
    const end = new Date(toDate);

    return currentDate >= start && currentDate <= end;
  };

  return (
    <div className="container">
      <h2>Your Current and Previous Sales</h2>
      <section className="sales">
        {sales.map((sale) => {
          const fromDate = sale.fromdate ? sale.fromdate.substring(0, 10) : "";
          const toDate = sale.todate ? sale.todate.substring(0, 10) : "";
          const saleFeatured = featured.filter(
            (feature) => feature.sales_id === sale.id
          );
          const isCurrentDateInSaleRange = isCurrentDateInRange(fromDate, toDate);
          const cardClassName = isCurrentDateInSaleRange ? "sale-card flash-border" : "sale-card";

          return (
            <div key={sale.id} className={cardClassName}>
              <h3>Start Date: {fromDate}</h3>
              <h3>End Date: {toDate}</h3>

              {saleFeatured.map((feature) => (
                <div key={feature.id}>
                  <p>Item: {feature.item}</p>
                  <p>Description: {feature.description}</p>
                </div>
              ))}

              <div className="button-container">
                <button className="edit-button" onClick={() => openModal(sale)}>
                  Edit Dates / Add Featured Items
                </button>
              </div>
            </div>
          );
        })}
      </section>
      <form className="addSale" onSubmit={addSale}>
        <h2>Add Sale</h2>
        {error && <p className="error">{error}</p>}
        <div className="addform">
          <label htmlFor="startdate">Start Date:</label>
          <DatePicker
            selected={startdate}
            onChange={(date) => setStart(date)}
            dateFormat="yyyy/MM/dd"
            name="startdate"
            required
          />

          <label htmlFor="enddate">End Date:</label>
          <DatePicker
            selected={enddate}
            onChange={(date) => setEnd(date)}
            dateFormat="yyyy/MM/dd"
            name="enddate"
            required
          />
        </div>
        <div>
          <input className="btn" type="submit" name="submit" value="Submit" />
        </div>
      </form>

      {isModalOpen && (
        <div className="modal">
          <FeaturedItems sale={selectedSale} closeModal={closeModal} />
        </div>
      )}
    </div>
  );
}

export default InfoPage;
