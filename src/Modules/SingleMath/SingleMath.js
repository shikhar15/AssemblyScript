import React, { useEffect, useState } from 'react';

const SingleMath = () => {

    const[first, setFirst] = useState();
    const[result, setResult] = useState();
    const[wasmfunction, setWasmFunction] = useState(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async() => {
        if (wasmfunction === null) {
            try {
                const response = await fetch('/wasm/optimized.wasm');
                const buffer = await response.arrayBuffer();
                const wasmModule = await WebAssembly.instantiate(buffer, {
                env: {
                abort: () => console.log('Abort!'),
                },
                });
                const functions = wasmModule.instance.exports;
                setWasmFunction(functions);
            } catch (err) {
                console.log(err);
            }
        }
    })

    // console.log('wasmfunction 2', wasmfunction);

    const numSquare = () => {
        const result = wasmfunction.square(first);
        setResult(result); 
    }

    const numCube = () => {
        const result = wasmfunction.cube(first);
        setResult(result);
    }

    const numSquareRoot = async() => {
        const result = wasmfunction.sqroot(first);
        setResult(result); 
    }

    return(
        <>
            <input
                type="number"
                value={first}
                onChange={(e) => {
                    setFirst(e.target.value);
                }}
                placeholder="first number"
            />
            <br />
            <div>
            <button onClick={() => numSquare()}>square</button>
            <button onClick={() => numCube()}>cube</button>
            <button onClick={() => numSquareRoot()}>square root</button>
            </div>
            <br />
            Result: {result}
            <br />
            =====================
        </>
    )
};

export default SingleMath;