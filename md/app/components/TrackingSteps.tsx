import CheckIcon from "./icons/CheckIcon";

interface StepProps {
    title: string;
    lineClass: string;
    check: boolean;
    currentStep: number;
    stepNumber: number;
}

function Step({ title, lineClass, check, currentStep, stepNumber }: StepProps) {
    return (
        <div className="relative flex w-1/4 pt-20">
            <div className={`absolute inset-0 flex items-center justify-${lineClass}`}>
                {(stepNumber === 1 || stepNumber === 4) && <span className="block w-1/2 h-[1px] bg-black"></span>}
                {stepNumber > 1 && stepNumber < 4 && <span className="block w-full h-[1px] bg-black"></span>}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                {check ? (
                    <CheckIcon />
                ) : (
                    <span className="w-[22px] h-[22px] border border-black flex items-center justify-center rounded-full bg-white">
                        {stepNumber}
                    </span>
                )}
            </div>
            <div className="w-full text-center">{title}</div>
        </div>
    );
}

export default function TrackingSteps({ step }: { step: number }) {
    return (
        <div className="flex">
            {step === -1 ? (
                <p className="text-red-400 m-auto">Your Order has been cancelled</p>
            ) : step === 5 ? (
                <p className="text-red-400 m-auto">Your Order has refunded</p>
            ) : step === 6 ? (
                <p className="text-red-400 m-auto">Your Order has failed</p>
            ) : step === 7 ? (
                ''
            ) : (
                <>
                    <Step title="Order Placed" lineClass="end" check={step >= 1} currentStep={step} stepNumber={1} />
                    <Step title="Order Preparing" lineClass="center" check={step >= 2} currentStep={step} stepNumber={2} />
                    <Step title="Order Fulfilled" lineClass="center" check={step > 2} currentStep={step} stepNumber={3} />
                    <Step title="Order Delivered" lineClass="start" check={step > 3} currentStep={step} stepNumber={4} />
                </>
            )}
        </div>
    );
}
