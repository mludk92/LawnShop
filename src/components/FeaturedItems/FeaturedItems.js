// FeaturedItems.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "./FeaturedItems.css";

function FeaturedItems({ sale, closeModal }) {
  const dispatch = useDispatch();
  const featured = useSelector((store) => store.featured);

  useEffect(() => {
    console.log("Sale ID:", sale);
    dispatch({ type: "FETCH_FEATURED" });
  }, [dispatch, sale]);

  const filteredSales = featured.find((saleItem) => saleItem.id === sale);
  const startDate = filteredSales ? new Date(filteredSales.fromdate) : null;
  const endDate = filteredSales ? new Date(filteredSales.todate) : null;
  const filteredItems = featured.filter((item) => item.sales_id === sale);

  const [itemValues, setItemValues] = useState([]);
  const [priceValues, setPriceValues] = useState([]);
  const [startDateValue, setStartDateValue] = useState(
    startDate ? format(startDate, "yyyy/MM/dd") : ""
  );
  const [endDateValue, setEndDateValue] = useState(
    endDate ? format(endDate, "yyyy/MM/dd") : ""
  );
  const [itemDescriptionValues, setItemDescriptionValues] = useState([]);

  const handleStartDateChange = (date) => {
    setStartDateValue(format(date, "yyyy/MM/dd"));
  };

  const handleEndDateChange = (date) => {
    setEndDateValue(format(date, "yyyy/MM/dd"));
  };

  const handleItemInputChange = (index, value, itemId) => {
    const updatedItems = [...itemValues];
    updatedItems[index] = value;

    setItemValues(updatedItems);
  };

  const handlePriceInputChange = (index, value) => {
    const updatedPrices = [...priceValues];
    updatedPrices[index] = value;

    setPriceValues(updatedPrices);
  };

  const handleDescriptionInputChange = (index, value) => {
    const updatedDescriptions = [...itemDescriptionValues];
    updatedDescriptions[index] = value;
    setItemDescriptionValues(updatedDescriptions);
  };

  const handleEditItem = (item) => {
    // Handle the edit functionality
    // Dispatch an action with the updated item data
    dispatch({ type: "EDIT_FEATURED_ITEM", payload: item });
  };

  const handleDeleteItem = (item) => {
    // Dispatch an action with the sales_id and item_id
    dispatch({ type: "DELETE_FEATURED_ITEM", payload: { sales_id: item.sales_id, item_id: item.item_id } });
  };

  useEffect(() => {
    console.log("Item Values:", itemValues);
    console.log("Price Values:", priceValues);
    console.log("Start Date Value:", startDateValue);
    console.log("End Date Value:", endDateValue);
    console.log("Item Description Values:", itemDescriptionValues);
  }, [
    itemValues,
    priceValues,
    startDateValue,
    endDateValue,
    itemDescriptionValues,
  ]);

  return (
    <div className="containthepage">
      <h2 className="editfeat">Edit Featured Items</h2>
      <p>Selected Sale ID: {sale}</p>
      <form className="currentDates">
        {/* Date pickers */}
      </form>
      <section className="salesitems">
        {filteredItems.map((item, index) => (
          <div key={item.item_id} className="card">
            {/* Item information */}
            <p>Item: {item.item_id}</p>
            {/* Input fields */}
            <input
              type="text"
              value={itemValues[index] || item.item}
              onChange={(e) => handleItemInputChange(index, e.target.value)}
            />
            {/* Price input */}
            <input
              type="number"
              step="0.25"
              value={priceValues[index] || item.price}
              onChange={(e) => handlePriceInputChange(index, e.target.value)}
            />
            {/* Description textarea */}
            <textarea
              value={itemDescriptionValues[index] || item.description}
              onChange={(e) =>
                handleDescriptionInputChange(index, e.target.value)
              }
              rows={4}
              maxLength={1000}
            />

            {/* Edit and delete buttons */}
            <div className="card-buttons">
              <button
                className="edit-button"
                onClick={() => handleEditItem(item)}
              >
                Submit Edits
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteItem(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>

      <button className="close" type="button" onClick={closeModal}>
        Close
      </button>
    </div>
  );
}

export default FeaturedItems;
