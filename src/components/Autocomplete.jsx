import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { Input } from "./Input";

const SuggestionsList = ({ suggestions, onSuggestionClick }) => {
  return (
    <>
      {suggestions.map((suggestion, index) => {
        return (
          <li
            key={index}
            className="suggestion-item"
            onClick={() => onSuggestionClick(suggestion)}
          >
            {suggestion.firstName + " " + suggestion.lastName}
          </li>
        );
      })}
    </>
  );
};

export const Autocomplete = ({
  InputLabel,
  data,
  fetchSuggestions,
  onClickItem,
  defaultValue,
}) => {
  const [value, setValue] = useState(defaultValue || "");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (value.length > 1 && !isSelected) {
      getSuggestions(value);
    } else {
      setSuggestions([]);
      setIsSelected(false);
    }
  }, [value]);

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const getSuggestions = async (query) => {
    setLoading(true);
    try {
      if (data) {
        result = data.filter(
          (item) =>
            item.firstName.toLowerCase().includes(query.toLowerCase()) ||
            item.lastName.toLowerCase().includes(query.toLowerCase())
        );
      } else {
        result = await fetchSuggestions(query);
      }
      console.log(result, "result");
      setSuggestions(result);
    } catch (err) {
      setError("Failed to fetch suggestions...");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setValue(suggestion.firstName + " " + suggestion.lastName);
    onClickItem(suggestion);
    setSuggestions([]);
    setIsSelected(true);
  };

  return (
    <div className="container">
      <Input
        InputLabel={InputLabel}
        type={"text"}
        onChange={onChange}
        value={value}
      />
      {error && <div>{error}</div>}
      {loading && <div>...Loading</div>}
      {suggestions.length > 0 && (
        <ul className="suggestion-list">
          <SuggestionsList
            suggestions={suggestions}
            onSuggestionClick={(suggestion) =>
              handleSuggestionClick(suggestion)
            }
          />
        </ul>
      )}
    </div>
  );
};
