import React from 'react';
import SortBtn_Tags from '../../components/SortBtn/SortBtn_Tags';
import TagsHolder from '../../components/TagsHolder/TagsHolder';

const TagsPage = () => {
    return (
        <>
            <div className="container text-left">
                <h1 className="my-4" style={{ color: '#033F74' }}>Tags</h1>
            </div>

            <div className="container text-left">
                <div className="row mb-3">
                    <div className="col">
                        <input className="form-control" type="text" placeholder="Search tag by name" style={{ width: '300px', height: '35px' }} />
                    </div>
                    <div className="col">
                        <SortBtn_Tags/>
                    </div>
                </div>
            </div>

            <div className="container ">
                <div class="d-flex flex-wrap justify-content-center align-items-center gap-5">
                <TagsHolder />
                </div>
            </div>
        </>
    );
};

export default TagsPage;
