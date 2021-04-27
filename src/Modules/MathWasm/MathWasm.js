import React, { useEffect, useState } from 'react';

const MathWasm = () => {

    const[first, setFirst] = useState();
    const[second, setSecond] = useState();
    const[result, setResult] = useState();
    const[wasmfunction, setWasmFunction] = useState(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async() => {
        if (wasmfunction === null) {
            try {
                const response = await fetch('wasm/optimized.wasm');
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

    // console.log('wasmfunction', wasmfunction);
    
    const addition = () => {
        const result = wasmfunction.add(first, second);
        setResult(result); 
    }

    const subtraction = () => {
        const result = wasmfunction.subtract(first, second);
        setResult(result);
    }

    const multiplication = async() => {
        const result = wasmfunction.multiply(first, second);
        setResult(result); 
    }

    const divisions = async() => {
        const result = wasmfunction.divide(first, second);
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
            <input
                type="number"
                value={second}
                onChange={(e) => {
                    setSecond(e.target.value);
                }}
                placeholder="second number"
            />
            <br />
            <div>
            <button onClick={() => addition()}>+</button>
            <button onClick={() => subtraction()}>-</button>
            <button onClick={() => multiplication()}>x</button>
            <button onClick={() => divisions()}>%</button>
            </div>
            <br />
            Result: {result}
            <br />
            =====================
        </>
    )
};

export default MathWasm;