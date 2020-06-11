import React, {useState} from 'react';
import styles from "./Paginator.module.scss"


function Paginator({totalUserCount, pageSize, onPageChanged, currentPage, portionPages}: any) {


    let pagesCount = Math.ceil(totalUserCount / pageSize);
    let portionsMaxCount = Math.ceil(pagesCount / portionPages);
    let [currentPortion, setCurrentPortion] = useState(1);
    let portionStartPage = (currentPortion - 1) * portionPages + 1
    let portionLastPage = currentPortion * portionPages
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const nextPage = () => {
        setCurrentPortion(currentPortion + 1)
    }
    const prewPage = () => {
        setCurrentPortion(currentPortion - 1)
    }

    return (
        <div className={styles.paginator}>
            <button
                disabled={currentPortion === 1}
                onClick={prewPage}>
                Prev
            </button>
            {pages.filter(pageNumber => pageNumber >= portionStartPage && pageNumber <= portionLastPage)
                .map(pageNumber => {
                    return (
                        <button onClick={() => {
                            onPageChanged(pageNumber)
                        }}
                                className={currentPage === pageNumber
                                    ? `${styles.current_page} ${styles.page_number}`
                                    : styles.page_number}>  {pageNumber}
                        </button>
                    )
                })}
            <button
                disabled={currentPortion === portionsMaxCount}
                onClick={nextPage}>
                Next
            </button>
        </div>
    )
}

export default Paginator;