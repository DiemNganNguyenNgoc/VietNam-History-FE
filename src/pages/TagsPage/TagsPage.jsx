/* eslint-disable react/jsx-pascal-case */
import React from 'react'
// import Styles from '../../style'
import SortBtn_Tags from '../../components/SortBtn/SortBtn_Tags'
import TagsHolder from '../../components/TagsHolder/TagsHolder'

const TagsPage = () => {
    return (
        <div class="container ">
            <div class="row">
                <h1 className="my-4" style={{ color: '#033F74' }}>Tags</h1>
            </div>
            <div class="row">
                <div class="col">
                    <input class="form-control" type="text" placeholder="Search tag by name" style={{ width: '300px', height: '35px' }}></input>
                </div>

                <div class="col">
                    <SortBtn_Tags />
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <TagsHolder/>
                </div>
            </div>
        </div>

    )
}

export default TagsPage