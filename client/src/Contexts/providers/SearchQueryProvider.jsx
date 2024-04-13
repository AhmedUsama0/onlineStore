import { SearchQueryContext } from "../Contexts";
import { useState } from "react";

const SearchQueryProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <SearchQueryContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchQueryContext.Provider>
  );
};

export default SearchQueryProvider;
