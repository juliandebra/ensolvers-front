import React, { useEffect, useState } from "react";
import { useNoteContext } from "../Context/NoteContext";
import { getNotes } from "../Services/apiCalls";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  form,
  input,
  inputDate,
  catContainer,
  suggestions,
  categoriesUl,
  formBtn,
} from "../Styles/Filter.module.css";
const Filters = () => {
  const { noteDispatch } = useNoteContext();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const date = searchParams.get("date");
  const text = searchParams.get("text");
  const categories = searchParams.get("categories");

  const [filters, setFilters] = useState({
    text: text || "",
    date: date || "",
    categories: categories?.split(",").map((cat) => cat.trim()) || [],
  });

  const [categoryInput, setCategoryInput] = useState("");
  const [lastCategories, setLastCategories] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    const storedCategories = localStorage.getItem("lastCategories");
    if (storedCategories) {
      setLastCategories(JSON.parse(storedCategories));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "categories" && value.length > 0) {
      setCategoryInput(value);
      const suggestions = lastCategories.filter((cat) =>
        cat.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(suggestions);
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    if (!filters.categories.includes(suggestion)) {
      setFilters((prevFilters) => {
        return {
          ...prevFilters,
          categories: [...prevFilters.categories, suggestion],
        };
      });
    }
    setCategoryInput("");
    setFilteredSuggestions([]);
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      categories: prevFilters.categories.filter(
        (cat) => cat !== categoryToRemove
      ),
    }));
  };

  const handleFilters = async () => {
    noteDispatch({ type: "SET_LOADING", payload: true });
    const params = new URLSearchParams();
    if (filters.text) params.append("text", filters.text);
    if (filters.date) params.append("date", filters.date);
    if (filters.categories.length > 0)
      params.append("categories", filters.categories.join(","));
    navigate(`/notes?${params.toString()}`);
    const { data } = await getNotes(filters);
    noteDispatch({ type: "GET_LIST", payload: data });
    noteDispatch({ type: "SET_LOADING", payload: false });
    setIsFiltering(true);
  };

  const discardFilter = () => {
    setFilters({
      text: "",
      date: "",
      categories: [],
    });
    setCategoryInput("");
    navigate("/notes");
    setIsFiltering(false);
  };
  return (
    <div className={form}>
      <input
        className={input}
        type="text"
        placeholder="Filter by text"
        name="text"
        value={filters.text}
        onChange={handleChange}
      />

      <input
        className={inputDate}
        type="date"
        name="date"
        value={filters.date}
        onChange={handleChange}
      />
      <div className={catContainer}>
        <input
          className={input}
          type="text"
          name="categories"
          value={categoryInput}
          placeholder="Categories"
          onChange={handleChange}
        />
        <button
          className={formBtn}
          style={{ width: "40px" }}
          onClick={() => {
            if (categoryInput.trim() !== "") {
              handleSelectSuggestion(categoryInput.trim());
            }
          }}
        >
          +
        </button>
        {filteredSuggestions.length > 0 && (
          <div className={suggestions}>
            {filteredSuggestions.map((suggestion, index) => (
              <p key={index} onClick={() => handleSelectSuggestion(suggestion)}>
                {suggestion}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className={categoriesUl}>
        {filters.categories.length > 0 &&
          filters.categories.map((category, index) => (
            <div key={index}>
              {category}
              <span onClick={() => handleRemoveCategory(category)}>✖</span>
            </div>
          ))}
      </div>

      <button className={formBtn} onClick={handleFilters}>
        Apply filter
      </button>
      {isFiltering && (
        <button className={formBtn} onClick={discardFilter}>
          Discard filter
        </button>
      )}
    </div>
  );
};

export default Filters;
