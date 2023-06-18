import Datepicker from "react-tailwindcss-datepicker";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function TimeSlot({ formData, handleChange, errors }: any) {
    const { t, i18n } = useTranslation();
    const [dateValue, setValue] = useState({
        startDate: '',
        endDate: null
    });
    const [selectedOption, setSelectedOption] = useState("deliver_today");
    const handleValueChange = (newValue: any) => {
        setValue(newValue);
        setSelectedOption(newValue.startDate);
        // setSelectedOption("deliver_date");
        handleChange({
            target: {
                name: "order_date",
                value: newValue.startDate,
            },
        });
    }
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
        handleChange(event);
    };
    useEffect(() => {
        setTimeout(() => {
            handleChange({
                target: {
                    name: "order_date",
                    value: selectedOption,
                },
            });
        }, 10);
    }, [handleChange]);

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const isDatePickerDisabled = selectedOption === "deliver_today";
    return (
        <div>
            <ul className="grid w-full gap-6 md:grid-cols-2">
                <li>
                    {/* <input type="radio" id="deliver_today" name="order_date" value="deliver_today" className="hidden peer" defaultChecked={true} onChange={handleChange} /> */}
                    <input
                        type="radio"
                        id="deliver_today"
                        name="order_date"
                        value="deliver_today"
                        className="hidden peer"
                        defaultChecked={selectedOption === "deliver_today"}
                        onChange={handleRadioChange}
                    />
                    <label htmlFor="deliver_today" className="inline-flex items-center justify-between w-full h-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">{t('checkout.today')}</div>
                            <div className="w-full">{t('checkout.within_60_min')}</div>
                        </div>
                        <svg aria-hidden="true" className="w-6 h-6 ml-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </label>
                </li>
                <li>
                    {/* <input type="radio" id="deliver_date" name="order_date" value={dateValue.startDate} className="hidden peer" onChange={handleChange} /> */}
                    <input
                        type="radio"
                        id="deliver_date"
                        name="order_date"
                        value={dateValue.startDate}
                        className="hidden peer"
                        defaultChecked={selectedOption === ""}
                        onChange={handleRadioChange}
                    />
                    <label htmlFor="deliver_date" className="inline-flex items-center justify-between w-full h-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">{t('checkout.choose_date')}</div>
                            <Datepicker
                                useRange={false}
                                asSingle={true}
                                value={dateValue}
                                onChange={handleValueChange}
                                minDate={tomorrow}
                                disabled={isDatePickerDisabled}
                            />
                        </div>
                        <svg aria-hidden="true" className="w-6 h-6 ml-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </label>
                </li>
            </ul>
            {errors.order_date && <p className="mt-1 text-xs text-red-500">{errors.order_date}</p>}
        </div>
    )
}
