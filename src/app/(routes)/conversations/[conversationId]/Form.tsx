"use client";

import useConversation from "@/hooks/useConversation";
import axios from "axios";
import { FC, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiMiniPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { useEdgeStore } from "@/lib/edgestore";
interface FormProps {}

const Form: FC<FormProps> = ({}) => {
  const { conversationId } = useConversation();

  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
      image: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
      });
      setValue("image", res.url);
      data = getValues();
    }

    axios.post("/api/messages", {
      ...data,
      conversationId,
    });

    setValue("message", "", { shouldValidate: true });
  };
  return (
    <div className="p-4 bg-white border-t- flex items-center gap-2 lg:gap-4 w-full">
      <input
        type="file"
        id="photo"
        className="hidden"
        onChange={(e) => {
          setFile(e.target.files?.[0]);
        }}
      />
      <label htmlFor="photo">
        <HiPhoto className="text-sky-500" size={30} />
      </label>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          type="text"
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="rounded-full hover:bg-sky-600 transition cursor-pointer p-2 bg-sky-500"
        >
          <HiMiniPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default Form;
