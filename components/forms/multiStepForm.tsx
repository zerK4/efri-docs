import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
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

export interface MultistepFormProps {
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

const MultistepForm: React.FC<MultistepFormProps> = ({
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

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    const allValues = steps
      .filter((step) => step.form)
      .reduce((acc, step) => {
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
                  <motion.div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      "border-2 transition-colors duration-200",
                      index <= step
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/25"
                    )}
                    animate={{
                      scale: index === step ? 1.1 : 1,
                    }}
                  >
                    {index < step || (isFinalStep && isSuccess) ? (
                      <Check className='w-4 h-4 text-green-500' />
                    ) : (
                      <span className='flex items-center justify-center'>
                        {index + 1}
                      </span>
                    )}
                  </motion.div>
                  {index === step && (
                    <motion.p
                      key={`step-${index}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className='text-xs font-medium text-center mt-1 text-foreground absolute -top-8 whitespace-nowrap'
                    >
                      {s?.title ?? ""}
                    </motion.p>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className='flex-1 mx-2'>
                    <div
                      className={cn(
                        "h-[2px] w-full transition-colors duration-200",
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

      <AnimatePresence mode='wait'>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className=''
        >
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MultistepForm;
