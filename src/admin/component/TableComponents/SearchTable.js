import React, { memo,useState } from 'react'

const SearchTable = ({ search, handleOnChange, placeHolder = "Search Applications" }) => {
  const [tSearch, setTSearch] = useState("");
  const handleOnChangeSearchInput = (e) => {
    const { value } = e.target;
    setTSearch(value)
  };
    return (
        <div class="input-group" style={{  }}>
            <input
                type="text"
                id="search"
                name="search"
                class="form-control border-end-0 customsearch"
                placeholder={placeHolder}
                value={tSearch}
                onChange={handleOnChangeSearchInput}
            />
            <span class="input-group-text" onClick={() =>handleOnChange(tSearch)}><i className="fa fa-search"></i></span>
        </div>
    )
}
export default memo(SearchTable, MemoSearchTable)
function MemoSearchTable(prevProps, nextProps) {
    return prevProps.search === nextProps.search
}