// @ts-nocheck
import { useEffect, useState } from "react";

// Custom hook to manage URL query parameters
export function useQueryParam(key, initialValue) {
  // Function to get query parameter value by key
  const getQueryParamValue = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const value = searchParams.get(key);
    return value ?? initialValue;
  };

  const [value, setValue] = useState(getQueryParamValue);

  // Function to update the URL query parameter
  const updateQueryParam = (newValue) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (newValue === initialValue) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, newValue);
    }
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, "", newUrl);

    setValue(newValue);
  };

  // Listen to URL changes
  useEffect(() => {
    const handlePopState = () => {
      setValue(getQueryParamValue());
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, [key]);

  return [value, updateQueryParam];
}
