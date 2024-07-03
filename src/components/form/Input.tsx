"use client";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { ComponentProps, forwardRef, useEffect, useId } from "react";
import { cn } from "../../../utilities/cn";

interface IInput extends ComponentProps<"input"> {
  error?: string;
  label?: string;
  SubLabel?: React.FC<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  LeadingIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  inputClass?: string;
  borderClass?: string;
  errorBorderClass?: string;
  TopRightContainer?: React.FC<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >;
  RightContainer?: React.FC<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >;
}

const Input = forwardRef<HTMLInputElement, IInput>(
  (
    {
      label,
      SubLabel,
      error,
      placeholder,
      Icon,
      LeadingIcon,
      required,
      TopRightContainer,
      RightContainer,
      borderClass,
      errorBorderClass,
      className,
      inputClass,
      ...rest
    },
    ref,
  ) => {
    const id = useId();
    const inputAnimation = useAnimationControls();
    const errorText = useAnimationControls();
    useEffect(() => {
      if (error) {
        inputAnimation.start({
          x: [-2, 0, 2, 0, -2],
          transition: { repeat: 5, duration: 0.15 },
        });

        errorText.start({
          opacity: 1,
          scale: 1,
          transition: { duration: 0.5 },
        });
      }
    }, [error]);

    return (
      <motion.div
        className={`${cn(
          `relative flex flex-col justify-start text-gray-900`,
          className,
        )}`}
      >
        <motion.div
          animate={inputAnimation}
          initial={{ x: 0 }}
          className="relative"
        >
          {label && (
            <AnimatePresence initial={false}>
              <label
                htmlFor={id}
                className={`${cn(
                  `mb-1 block text-xs font-medium text-gray-800 sm:text-sm`,
                )} ${
                  error
                    ? "text-red-600 peer-focus:text-red-600"
                    : "text-gray-500 peer-focus:text-blue-600"
                } `}
              >
                <motion.div className="flex items-center justify-start gap-2">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={errorText}
                      exit={{ opacity: 0, scale: 0 }}
                      className="rounded-full"
                    >
                      <svg className="h-5 w-5 text-red-600" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M3 10.417c0-3.198 0-4.797.378-5.335c.377-.537 1.88-1.052 4.887-2.081l.573-.196C10.405 2.268 11.188 2 12 2c.811 0 1.595.268 3.162.805l.573.196c3.007 1.029 4.51 1.544 4.887 2.081C21 5.62 21 7.22 21 10.417v1.574c0 5.638-4.239 8.375-6.899 9.536C13.38 21.842 13.02 22 12 22s-1.38-.158-2.101-.473C7.239 20.365 3 17.63 3 11.991v-1.574Zm9-3.167a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75ZM12 16a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.div>
                  )}

                  {!error && Icon && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                    >
                      <Icon />
                    </motion.div>
                  )}

                  <motion.div>{label}</motion.div>
                </motion.div>
              </label>
            </AnimatePresence>
          )}

          {SubLabel && <SubLabel />}

          {/* top right container */}
          {TopRightContainer && (
            <div className="absolute -top-[1.2rem] right-2 z-10">
              <TopRightContainer />
            </div>
          )}
          {/* end of top right container */}

          <div className="relative w-full">
            {/* leading icon */}
            {LeadingIcon && (
              <div className="absolute inset-y-0 left-0 flex items-center justify-center">
                <LeadingIcon />
              </div>
            )}

            <input
              id={id}
              ref={ref}
              className={`${cn(
                "block w-full appearance-none rounded-xl border bg-transparent p-3 text-sm transition duration-300 focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:text-gray-600",
                inputClass,
              )} ${
                error
                  ? `${cn(
                      `border-red-500 focus:border-transparent focus:ring-red-600`,
                      errorBorderClass,
                    )}`
                  : `${cn(
                      `border-gray-300 focus:border-transparent focus:ring-blue-600`,
                      borderClass,
                    )}`
              } `}
              placeholder={placeholder}
              {...rest}
            />

            {RightContainer && (
              <div className="absolute inset-y-0 right-0">
                <RightContainer />
              </div>
            )}
          </div>
        </motion.div>

        {/* error text */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={errorText}
              className="absolute inset-x-0 bottom-0"
            >
              <p className="-mb-16 mt-1 w-full text-left text-xs text-red-600">
                {error}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        {/* end of error text */}
      </motion.div>
    );
  },
);

Input.displayName = "Input";
export default Input;
