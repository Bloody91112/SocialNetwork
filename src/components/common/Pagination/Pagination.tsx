import classes from './Pagination.module.css'
import React, { useState } from 'react'


type propsType = {
    totalUsersCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    currentPage: number
}

type pageType = {
    id: number
    itemGroup: number
}



const Pagination: React.FC<propsType> = ({ totalUsersCount, pageSize, onPageChanged, currentPage }) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages: Array<pageType> = [];
    let [group, changeGroup] = useState(1)
    let TotalCounter = 1

    for (let i = 1; i <= pagesCount; i++) {
        if (i % 5 === 0) TotalCounter += 1
        pages.push({ id: i, itemGroup: TotalCounter });
    }

    return (
        <div className={classes.paginatorBlock}>
            <div className={classes.paginator}>
                <button className={classes.button} onClick={() => { changeGroup(group = 1) }}>&laquo;</button>
                <button className={classes.button} onClick={() => { if (group > 1) changeGroup(group - 1) }}>&lt;</button>
                <span className={classes.pageNumbers}>
                    {pages.filter(page => page.itemGroup === group).map(page =>
                        <span key={page.id}
                            onClick={() => { onPageChanged(page.id) }}
                            className={currentPage === page.id ? classes.selectedPage : classes.page}>
                            {page.id}
                        </span>)}
                </span>
                <button className={classes.button} onClick={() => { if (group < TotalCounter) changeGroup(group + 1) }}>&gt;</button>
                <button className={classes.button} onClick={() => { changeGroup(group = TotalCounter) }}>&raquo;</button>
            </div>
        </div>

    )
}

export default Pagination