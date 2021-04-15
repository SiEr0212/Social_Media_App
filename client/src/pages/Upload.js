import React from 'react';

export default function Upload() {
    const onChangeHandler = () => {

    }
    return (
        <>
        <form>
        <input type="file" onChange={onChangeHandler}/>
        <input type="text" name="user"/>
        </form>
        </>
    )
}
