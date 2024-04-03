import { SearchQueryContext } from "../Contexts/Contexts";
import { useContext } from "react";


const useSearchQuery = () => useContext(SearchQueryContext);


export default useSearchQuery;