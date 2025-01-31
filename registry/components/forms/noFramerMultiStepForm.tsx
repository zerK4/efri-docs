import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, CircleXIcon, Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import CmdCtrlButton from "../ui/cmdCtrlButton";

export interface StepConfig<T extends FieldValues = any> {
  title: string;
  component?: React.ReactNode | null;
  form?: UseFormReturn<T>;
  schema?: any;
}

export interface NoFramerMultiStepFormProps {
  steps: StepConfig[];
  onSubmit: (values: Record<string, any>) => Promise<void>;
  title?: string;
  header?: React.ReactNode;
  isSuccess?: boolean;
  isError?: boolean;
  isPending?: boolean;
  successMessage?: string;
  errorMessage?: string;
  loadingAnimation?: React.ReactNode;
}

const loadingLocal = () => (
  <div className='flex flex-col items-center'>
    <Loader2Icon className='w-12 h-12 text-primary animate-spin' />
    <p className='mt-4 text-lg text-muted-foreground'>Submitting...</p>
  </div>
);

const NoFramerMultiStepForm: React.FC<NoFramerMultiStepFormProps> = ({
  steps,
  onSubmit,
  title,
  header,
  isSuccess = false,
  isError = false,
  isPending = false,
  successMessage = "Success!",
  errorMessage = "Error!",
  loadingAnimation = loadingLocal(),
}) => {
  const [step, setStep] = useState(0);
  const [currentValues, setCurrentValues] = useState<Record<string, any>>({});
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  const currentStep = steps[step];
  const isFinalStep = step === steps.length - 1;
  const isCreationStep = step === steps.length - 2;

  const isCurrentStepValid =
    currentStep?.schema?.safeParse(currentValues)?.success || false;

  useEffect(() => {
    const values = currentStep?.form?.watch() || {};
    setCurrentValues(values);
  }, [step, currentStep]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        if (!isCurrentStepValid) {
          toast.error("Please fill in all required fields", {
            duration: 2000,
          });
          return;
        }
        if (step === steps.length - 2) handleSubmit();
        else handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCurrentStepValid]);

  const handleNext = () => {
    setDirection("forward");
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setDirection("back");
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    const allValues = steps.reduce((acc, step) => {
      acc[step.title.toLowerCase()] = step.form?.getValues();
      return acc;
    }, {} as Record<string, any>);

    try {
      await onSubmit(allValues);
    } catch {
    } finally {
      handleNext();
    }
  };

  const resetForms = () => {
    steps.forEach((step) => step.form?.reset());
    setStep(0);
  };

  return (
    <div>
      <style jsx>{`
        @keyframes slideInForward {
          from {
            opacity: 0;
            transform: translateX(10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInBack {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .step-title {
          animation: fadeIn 0.2s ease-out;
        }

        .step-content {
          animation: ${direction === "forward"
              ? "slideInForward"
              : "slideInBack"}
            0.2s ease-out;
        }

        .step-indicator {
          transition: transform 0.2s ease-out, background-color 0.2s ease-out,
            border-color 0.2s ease-out;
        }

        .step-indicator.active {
          transform: scale(1.1);
        }

        .progress-line {
          transition: background-color 0.3s ease-out;
        }
      `}</style>

      <div className='flex flex-col gap-4'>
        {title ? (
          <div className='p-4'>
            <h2 className='text-2xl !p-0 !m-0 font-semibold'>{title}</h2>
          </div>
        ) : header ? (
          header
        ) : (
          "Multi step form"
        )}
        <div className='flex items-center justify-between w-full p-6'>
          <div className='flex items-center justify-between w-full'>
            {steps.map((s, index) => (
              <React.Fragment key={index}>
                <div className='flex flex-col relative items-center gap-2'>
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center step-indicator",
                      "border-2 transition-colors duration-200",
                      index <= step
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/25",
                      index === step && "active"
                    )}
                  >
                    {index < step || (isFinalStep && isSuccess) ? (
                      <Check className='w-4 h-4 text-green-500' />
                    ) : (
                      <span className='flex items-center justify-center'>
                        {index + 1}
                      </span>
                    )}
                  </div>
                  {index === step && (
                    <p className='step-title text-xs font-medium text-center mt-1 text-foreground absolute -top-8 whitespace-nowrap'>
                      {s?.title ?? ""}
                    </p>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className='flex-1 mx-2'>
                    <div
                      className={cn(
                        "h-[2px] w-full progress-line",
                        index < step ? "bg-primary" : "bg-muted-foreground/25"
                      )}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className='step-content'>
        {!isFinalStep ? (
          currentStep.component
        ) : (
          <div className='flex flex-col items-center justify-center h-64'>
            {isPending ? (
              loadingAnimation
            ) : isSuccess ? (
              <div className='flex flex-col items-center gap-4'>
                <Check className='text-lime-500 w-12 h-12' />
                <p className='text-lg text-muted-foreground'>
                  {successMessage}
                </p>
                <div className='flex items-center gap-2'>
                  <Button variant='ghost' onClick={resetForms}>
                    Make another
                  </Button>
                </div>
              </div>
            ) : (
              isError && (
                <div className='flex flex-col items-center'>
                  <CircleXIcon className='text-red-500 w-12 h-12' />
                  <p className='mt-4 text-lg text-muted-foreground'>
                    {errorMessage}
                  </p>
                </div>
              )
            )}
          </div>
        )}

        {!isFinalStep && (
          <div className='flex justify-between pt-4'>
            {step > 0 ? (
              <Button variant='outline' onClick={handleBack}>
                Back
              </Button>
            ) : (
              <div></div>
            )}
            <div className='flex items-center gap-4'>
              <CmdCtrlButton
                message={isCreationStep ? undefined : "for next step"}
              />
              <Button
                onClick={isCreationStep ? handleSubmit : handleNext}
                disabled={!isCurrentStepValid}
              >
                {isCreationStep ? "Submit" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoFramerMultiStepForm;
