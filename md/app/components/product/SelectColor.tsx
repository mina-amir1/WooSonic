import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import { v4 } from "uuid";
import Tooltip from "../Tooltip";
interface SelectColorProps {
    colors: any;
    selectedColor: string;
    onSelectedColorChange: (color: string) => void;  
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export default function SelectColor({ colors, selectedColor, onSelectedColorChange }: SelectColorProps) {
    // const [selectedColor, setSelectedColor] = useState(colors[0]);
    const colorList = Array.isArray(colors) ? colors : Object.values(colors);

    // const [selectedColor, setSelectedColor] = useState(colorList[0]);
    // const [selected, setSelected] = useState(selectedColor);

    // const handleColorChange = (color: string) => {
    //   setSelected(color);
    //   onChange(color);
    // };


    return (
        <div>
            {/* Colors */}
            <h3 className="text-sm font-medium text-gray-900">Color</h3>
            <RadioGroup value={selectedColor} onChange={onSelectedColorChange} className="mt-4">
                <RadioGroup.Label className="sr-only"> Choose a color </RadioGroup.Label>
                <div className="flex items-center space-x-3">
                    {colorList.map((color: any) => (
                        <RadioGroup.Option
                            key={v4()}
                            value={color}
                            className={({ active, checked }) =>
                                classNames(
                                    `bg-${color.toLowerCase()}`,
                                    active && checked ? 'ring ring-offset-1' : '',
                                    !active && checked ? 'ring-2' : '',
                                    'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                                )
                            }
                        >
                            <RadioGroup.Label as="span" className="sr-only">
                                {' '}
                                {color}{' '}
                            </RadioGroup.Label>
                            <Tooltip message={color}>
                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                        `bg-${color.toLowerCase()}-500`,
                                        color == 'Black' ? 'bg-black' : '',
                                        color == 'White' ? 'bg-white' : '',
                                        'h-8 w-8 rounded-full border border-black border-opacity-10'
                                    )}
                                />
                            </Tooltip>
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>
    )
}
