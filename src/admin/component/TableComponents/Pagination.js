import React, { useState } from 'react'
const Pagination = ({ pages_urls, page, setPage, setChangePage, changePage }) => {
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
    const [pageNumberLimit] = useState(5);

    const call_pages_data = (pageNo) => {
        setPage(pageNo)
        setChangePage(!changePage)
        if (page + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + 1);
            setminPageNumberLimit(minPageNumberLimit + 1);
        }
        if ((page - 1) % pageNumberLimit === 0) {
            const min = minPageNumberLimit - 1 === -1 ? 0 : minPageNumberLimit - 1;
            const max = maxPageNumberLimit - 1 === 4 ? 5 : maxPageNumberLimit - 1;
            setmaxPageNumberLimit(max);
            setminPageNumberLimit(min);
        }
    };
    const handleNextbtn = () => {
        if (page !== (pages_urls || []).length) {
            setPage(page + 1)
            setChangePage(!changePage)
        }
        if (page + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };
    const handleLastbtn = () => {
        setPage((pages_urls || []).length);
        setChangePage(!changePage)
        let count = (pages_urls || []).length;
        while (count % 5 !== 0) {
            count++;
        }
        setmaxPageNumberLimit(count);
        setminPageNumberLimit(count - 5);
    };
    const handlePrevbtn = () => {
        if (page !== 1) {
            setPage(page - 1);
            setChangePage(!changePage)
        }
        if ((page - 1) % pageNumberLimit === 0) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };
    const handleFirstbtn = () => {
        setPage(1);
        setChangePage(!changePage)
        setmaxPageNumberLimit(5);
        setminPageNumberLimit(0);
    };
    let pageIncrementBtn = null;
    if ((pages_urls || []).length > maxPageNumberLimit) {
        pageIncrementBtn = <button onClick={handleNextbtn}>  </button>;
    }

    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <button onClick={handlePrevbtn}> &hellip; </button>;
    }
    return (
        <>
            <div className="datatable-custom-pagination col-md-8">
                {(pages_urls || []).length > 1 ? (
                    <>
                        {" "}
                        <div className="firstPage" onClick={handleFirstbtn}>
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only">Previous</span>
                        </div>
                        <div className="firstPage" onClick={handlePrevbtn}>
                            <span aria-hidden="true">{"<"}</span>
                            <span class="sr-only">Previous</span>
                        </div>
                        {pageDecrementBtn}
                        {(pages_urls || []).map((item, index) =>
                            item.page_no < maxPageNumberLimit + 1 &&
                                item.page_no > minPageNumberLimit ? (
                                <div
                                    onClick={() => call_pages_data(item.page_no)}
                                    className={
                                        Number(page) === Number(item.page_no) ? "activePage" : "firstPage"
                                    }
                                    disabled={Number(page) === Number(item.page_no)}
                                    key={index}
                                >
                                    {item.page_no}
                                </div>
                            ) : (
                                ""
                            )
                        )}
                        {pageIncrementBtn}
                        <div className="firstPage" onClick={handleNextbtn}>
                            <span aria-hidden="true">{">"}</span>
                            <span class="sr-only">Next</span>
                        </div>{" "}

                        <div className="firstPage" onClick={handleLastbtn}>
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only">Next</span>
                        </div>
                    </>
                ) : null}
            </div>
        </>
    )
}
export default Pagination