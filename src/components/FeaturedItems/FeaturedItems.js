import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function FeaturedItems({ sale, closeModal }) {
  const dispatch = useDispatch();
  const featured = useSelector((store) => store.featured);

  useEffect(() => {
    console.log("Sale ID:", sale);
    dispatch({ type: "FETCH_FEATURED" });
  }, [dispatch]);

  const filteredSales = featured.find((saleItem) => saleItem.id === sale);
  const startDate = filteredSales ? filteredSales.fromdate.substring(0, 10) : "";
  const endDate = filteredSales ? filteredSales.todate.substring(0, 10) : "";
  const filteredItems = featured.filter((item) => item.sales_id === sale);

  return (
    <div>
      <h2>Edit Featured Items</h2>
      <p>Selected Sale ID: {sale}</p>
      <div>
          <p>Start Date: {startDate}</p> 
          <p> End Date: {endDate} </p>
        </div>
      <section className="sales">
       
        {filteredItems.map((item) => (
          <div key={item.id}>
            <p>Item: {item.item}</p>
            <p>Description: {item.description}</p>
          </div>
        ))}
      </section>

      <button type="button" onClick={closeModal}>
        Close
      </button>
    </div>
  );
}

export default FeaturedItems;
