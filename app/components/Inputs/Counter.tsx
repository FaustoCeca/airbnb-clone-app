'use client'

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number) => void;
}

const Counter = ({ title, subtitle, value, onChange }: CounterProps) => {

    const handleAdd = useCallback( () => {
        onChange(value + 1);
    }, [onChange, value])
    
    const handleReduce = useCallback( () => {
        if (value === 1) return;

        onChange(value - 1);
    }, [onChange, value]);


  return (
    <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
            <p className="text-lg font-medium">
                {title}
            </p>
            <p className="font-light text-gray-600">
                {subtitle}
            </p>
        </div>
        <div className="flex flex-row items-center gap-4">
            <div 
                onClick={handleReduce}
                className="flex items-center justify-center w-10 h-10 cursor-pointer rounded-full border-[1px] border-neutral-400 text-neutral-600 hover:opacity-80 transition"
            >
                <AiOutlineMinus />
            </div>
            <h3 className="font-light text-xl text-neutral-600">
                {value}
            </h3>
            <div 
                onClick={handleAdd}
                className="flex items-center justify-center w-10 h-10 cursor-pointer rounded-full border-[1px] border-neutral-400 text-neutral-600 hover:opacity-80 transition"
            >
                <AiOutlinePlus />
            </div>
        </div>
    </div>
  )
}

export default Counter;