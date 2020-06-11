import React from 'react';
import styles from "./Paginator.module.scss"


function Paginator({totalUserCount, pageSize, onPageChanged, currentPage}:any) {


    let pagesCount = Math.ceil(totalUserCount / pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            {pages.map((p, i) => {
                return <span onClick={() => {
                    onPageChanged(p)
                }}
                             className={currentPage === p
                                 ? `${styles.current_page} ${styles.page_number}`
                                 : styles.page_number}>{p},
                    </span>
            })}
        </div>
    )
}

export default Paginator;