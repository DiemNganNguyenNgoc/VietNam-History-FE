import { React, useState } from 'react'
import SortBtn from '../../components/SortBtn/SortBtn';
import QuestionFilter from '../../components/QuestionFilter/QuestionFilter';
import QuestionHolder from '../../components/QuestionHolder/QuestionHolder';

const TagsDetailPage = () => {
    const [filters, setFilters] = useState({
        no_answers: false,
        no_accepted_answer: false,
        has_bounty: false,
        newest: false,
        recent_activity: false,
        highest_score: false,
        most_frequent: false,
        bounty_ending_soon: false,
        the_following_tags: false,
    });

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setFilters({
            ...filters,
            [name]: checked,
        });
    };


    return (
        <div class="container"
            style={{
                color: '#023E73',
                marginTop: '20px',
            }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <h1 style={{
                    fontSize: '30px',
                    marginTop: '20px',
                }}>
                    [JavaScript]
                </h1>
            </div>
            <p>JavaScript (a dialect of ECMAScript) is a high-level, multi-paradigm, object-oriented, prototype-based, dynamically-typed, and interpreted language traditionally used for client-side scripting in web browsers.</p>
            <div className="row" style={{ marginTop: '30px' }}>
                <div className="col">
                    <p style={{ fontSize: '25px', color: '#666666' }}>253000 questions</p>
                </div>
                <div className="col" >
                    <SortBtn />
                </div>
            </div>


            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', width: '100%' }}>
                <QuestionFilter filters={filters} onCheckboxChange={handleCheckboxChange} />
            </div>
            <QuestionHolder />
        </div>
    );

}

export default TagsDetailPage