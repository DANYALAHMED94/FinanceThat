import React, { useEffect, useState } from 'react'
import { get_pending_active_application_paging, get_pending_active_application } from '../../../../../actions/admin/applicationActions'
import TableFilter from './TableComponent/TableFilter';
import TableHead from './TableComponent/TableHead'
import TableRow from './TableComponent/TableRow'
import PageLengthComponent from '../../../TableComponents/PageLengthComponent';
import Pagination from '../../../TableComponents/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import useDebounce from '../../../../../_hooks/useDebounac';
import moment from 'moment';
import ApplicationTableTopHeader from '../../../TableComponents/ApplicationTableTopHeader';
var date = new Date();
date.setDate(date.getDate() - 7);
const today = moment();
const ManagedApplication = () => {
    const dispatch = useDispatch()
   const { pages_urls, application_data } = useSelector(({ adminReducer }) => {
        return {
            pages_urls: adminReducer.adminAccounts.applicationReducer.pages,
            application_data:
                adminReducer.adminAccounts.applicationReducer.application_data,

        }
    })
    
    const [searchParams, setSearchParams] = useState({
        application_view: 'managed',
        sort_by: "newest_first",
        p_size: 20,
        start_date: moment(date).format("YYYY-MM-DD"),
        end_date: moment(new Date()).format("YYYY-MM-DD"),
        page: 1
    })
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [changePage, setChangePage] = useState(false)
    const [changeSelect, setChangeSelect] = useState(false)
    const componentRef = React.useRef(null);
    const debouncedSearchTerm = useDebounce(search, 500);
    /** Pagination Change */
    console.log(pages_urls,
        application_data, "application_data" )
    useEffect(() => {
        setSearchParams({ ...searchParams, page: page })
        const pageUrl = pages_urls.filter(item => item.page_no === page)?.[0]?.url || ""
        pageUrl && dispatch(get_pending_active_application_paging(pageUrl, null))
    }, [changePage])
    /** Page Length Change */
    useEffect(() => {
        setSearchParams({ ...searchParams, page: 1, search: search })
        setPage(1)
        dispatch(get_pending_active_application({ ...searchParams, page: 1, search: search }))
    }, [searchParams.p_size, changeSelect, debouncedSearchTerm])

    return (
        <>
            <div className="Altable-Container lower">
                <ApplicationTableTopHeader />
                <div className="p-2">
                    <TableFilter search={search} setSearchParams={setSearchParams} searchParams={searchParams} setChangeSelect={setChangeSelect} changeSelect={changeSelect} setSearch={setSearch} />
                </div>
                <div className="dealer-dtable table-responsive">
                    <table style={{ width: "100%" }} className="table-striped table-hover" ref={componentRef}>
                        <TableHead />
                        <tbody>
                            {(application_data || []).map(item => {
                                return <TableRow item={item} />
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row m-0 mt-2 rounded" style={{ background: '#fff' }}>
                <PageLengthComponent searchParams={searchParams} setpage={setPage} setSearchParams={setSearchParams} />

                <Pagination pages_urls={pages_urls} page={page} setPage={setPage} setChangePage={setChangePage} changePage={changePage} />
            </div>
        </>
    )
}
export default ManagedApplication