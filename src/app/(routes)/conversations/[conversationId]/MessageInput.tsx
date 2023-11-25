"use client";

import clsx from "clsx";
import { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  id: string;
  required?: boolean;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  type?: string;
}

const MessageInput: FC<MessageInputProps> = ({
  errors,
  id,
  register,
  placeholder,
  required,
  type,
}) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        id={id}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className={clsx(
          "text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none transition"
          // errors?.message && "border-red-500 border-2"
        )}
      />
    </div>
  );
};

export default MessageInput;
