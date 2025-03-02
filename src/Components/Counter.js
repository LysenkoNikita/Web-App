import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./CounterSlice";

export default function Counter() {
    const count = useSelector(state => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Счетчик</h1>
            <label>{count}</label>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
        </div>
    );
}