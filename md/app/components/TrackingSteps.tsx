import { useTranslation } from "react-i18next";
import CheckIcon from "./icons/CheckIcon";

interface StepProps {
    title: string;
    lineClass: string;
    check: boolean;
    currentStep: number;
    stepNumber: number;
}

function Step({ lineClass, check, currentStep, stepNumber }: StepProps) {
    const { t } = useTranslation();
    const title = t(`trackingSteps.step${stepNumber}`);
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
    const { t } = useTranslation();
    let errorMessage = '';
    switch (step) {
        case -1:
            errorMessage = t('order.order_cancelled');
            break;
        case 5:
            errorMessage = t('order.order_refunded');
            break;
        case 6:
            errorMessage = t('order.order_failed');
            break;
        default:
            errorMessage = '';
            break;
    }
    return (
        <div className="flex">
            {errorMessage ? (
                <p className="text-red-400 m-auto">{errorMessage}</p>
            ) : step === 7 ? (
                ''
            ) : (
                <>
                    <Step title={t('trackingSteps.step1')} lineClass="end" check={step >= 1} currentStep={step} stepNumber={1} />
                    <Step title={t('trackingSteps.step2')} lineClass="center" check={step >= 2} currentStep={step} stepNumber={2} />
                    <Step title={t('trackingSteps.step3')} lineClass="center" check={step > 2} currentStep={step} stepNumber={3} />
                    <Step title={t('trackingSteps.step4')} lineClass="start" check={step > 3} currentStep={step} stepNumber={4} />
                </>
            )}
        </div>
    );
}
