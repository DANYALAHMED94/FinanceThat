import React, { memo } from 'react'
import { useSelector } from 'react-redux';

const PageLengthComponent = ({ searchParams, setpage, setSearchParams }) => {
    const { total_count } = useSelector(({ adminReducer }) => {
        return {
            total_count: adminReducer.adminAccounts.applicationReducer.total_count,
        }
    })
    const changePageLength = (e) => {
        setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
        setpage(1);
    };
    return (
        <div className="col-md-4">
            <p className="inline">
                <label htmlFor="">Showing</label>
                <select
                    className="recordcounter"
                    name="p_size"
                    onChange={changePageLength}
                    value={searchParams.p_size}
                >
                    <option value={20}> 20 </option>
                    <option value={50}> 50</option>
                    <option value={100}> 100</option>
                </select>
                <label htmlFor="">applications out of {total_count}</label>
            </p>
        </div>
    )
}
export default memo(PageLengthComponent, MemoPageLengthComponent)
function MemoPageLengthComponent(prevProps, nextProps) {
    return prevProps.searchParams.p_size === nextProps.searchParams.p_size && prevProps.total_count === nextProps.total_count
}