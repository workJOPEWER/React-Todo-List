import React, {useState} from 'react';
import PropTypes from 'prop-types';

function useInputValue(defaultValue = '') {
    const [value, setValue] = useState(defaultValue);
    return {
        bind: {
            value,
            onChange: event => setValue(event.target.value)
        },
        clear: () => setValue(''),
        value: () => value
    }

}

const AddTodo = ({onCreate}) => {
    const input = useInputValue('')

    const submitHandler = (e) => {
        e.preventDefault();

        if (input.value().trim()) {
            onCreate(input.value());
            input.clear()
        }
    };

    return (
        <form className='form' onSubmit={submitHandler}>
            <input {...input.bind} />
            <button type='submit' style={{marginLeft: '2.5rem'}}>Добавить запись</button>
        </form>
    )
};

AddTodo.propTypes = {
    onCreate: PropTypes.func.isRequired
};

export default AddTodo;