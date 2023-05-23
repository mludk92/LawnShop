import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

function FeaturedItems({ sale, closeModal }) {
  const dispatch = useDispatch();
  const featured = useSelector((store) => store.featured);

  useEffect(() => {
    console.log("Sale ID:", sale);
    dispatch({ type: "FETCH_FEATURED" });
  }, [dispatch]);

  const filteredSales = featured.find((saleItem) => saleItem.id === sale);
  const startDate = filteredSales ? new Date(filteredSales.fromdate) : null;
  const endDate = filteredSales ? new Date(filteredSales.todate) : null;
  const filteredItems = featured.filter((item) => item.sales_id === sale);

  const [itemValues, setItemValues] = useState([]);
  const [startDateValue, setStartDateValue] = useState(startDate);
  const [endDateValue, setEndDateValue] = useState(endDate);
  const [itemDescriptionValues, setItemDescriptionValues] = useState([]);

  const handleStartDateChange = (date) => {
    setStartDateValue(date);
  };

  const handleEndDateChange = (date) => {
    setEndDateValue(date);
  };

  const handleItemInputChange = (index, value, itemId) => {
    const updatedItems = [...itemValues];
    updatedItems[index] = value;

    setItemValues(updatedItems);
  };

  const handleDescriptionInputChange = (index, value) => {
    const updatedDescriptions = [...itemDescriptionValues];
    updatedDescriptions[index] = value;
    setItemDescriptionValues(updatedDescriptions);
  };

  useEffect(() => {
    console.log("Item Values:", itemValues);
    console.log("Start Date Value:", format(startDateValue, "yyyy/MM/dd"));
    console.log("End Date Value:", format(endDateValue, "yyyy/MM/dd"));
    console.log("Item Description Values:", itemDescriptionValues);
  }, [itemValues, startDateValue, endDateValue, itemDescriptionValues]);
  console.log(filteredItems, 'filtered items ')

  return (
    <div>
      <h2>Edit Featured Items</h2>
      <p>Selected Sale ID: {sale}</p>
      <form>
        <p>Start Date:</p>
        <DatePicker
          selected={startDateValue}
          onChange={handleStartDateChange}
          dateFormat="yyyy/MM/dd"
        />
        <p>End Date:</p>
        <DatePicker
          selected={endDateValue}
          onChange={handleEndDateChange}
          dateFormat="yyyy/MM/dd"
        />
      </form>
      <section className="sales">
        {filteredItems.map((item, index) => (
          <div key={item.item_id}>
            <p>Item: {index + 1}</p>
            <input
              type="text"
              value={itemValues[index] || item.item}
              onChange={(e) => handleItemInputChange(index, e.target.value)}
            />
            <p>Description:</p>
            <textarea
              value={itemDescriptionValues[index] || item.description}
              onChange={(e) => handleDescriptionInputChange(index, e.target.value)}
              rows={4}
              maxLength={1000}
            />
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
