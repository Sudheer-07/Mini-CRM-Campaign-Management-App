import React, { useEffect } from 'react';
import '../App.css';

function ConditionBuilder({ conditions, setConditions, setConditionType }) {
    const addCondition = () => {
        setConditions([...conditions, { field: 'totalSpending', operator: '>', value: '',conditionType:"" }]);
    };

    const removeCondition = (index) => {
        const updatedConditions = conditions.filter((_, i) => i !== index);
        setConditions(updatedConditions);
    };

    const handleConditionChange = (index, key, value) => {
        const newConditions = conditions.slice();
        newConditions[index][key] = value;
        setConditions(newConditions);
    };

    useEffect(() => {
        console.log("Updated conditions: ", conditions);
    }, [conditions]);

    return (
        <div className='conditionContainer'>
            <h3>Define Audience Segment</h3>
            {conditions.map((condition, index) => (
                <div key={index} className='conditionRow'>
                    <select
                        value={condition.field}
                        onChange={(e) => handleConditionChange(index, 'field', e.target.value)}
                        className='select'
                    >
                        <option value="totalSpending">Total Spending</option>
                        <option value="visits">Visits</option>
                        <option value="lastVisit">Last Visit</option>
                    </select>
                    <select
                        value={condition.operator}
                        onChange={(e) => handleConditionChange(index, 'operator', e.target.value)}
                        className='select'
                    >
                        <option value=">">Greater than</option>
                        <option value="<=">Less than or equal to</option>
                        <option value="not visited in last">Not visited in last (months)</option>
                    </select>
                    <input
                        type="number"
                        value={condition.value}
                        onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
                        placeholder="Value"
                        className='input'
                    />
                    <div className='conditionRow'>
                        <p>Select Condition to apply:</p>
                        <select
                            onChange={(e) => {setConditionType(e.target.value); handleConditionChange(index, 'conditionType', e.target.value)}}
                            className='select'
                        >
                            <option value="">Select</option>
                            <option value="and">AND</option>
                            <option value="or">OR</option>
                        </select>
                    </div>
                    <div className='conditionRow'>
                        <button onClick={() => removeCondition(index)} className='addButton'>
                            Remove
                        </button>
                    </div>
                </div>
            ))}
            <button onClick={addCondition} className='addButton'>
                Add Condition
            </button>
        </div>
    );
}

export default ConditionBuilder;
