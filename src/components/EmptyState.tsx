import { FC } from "react";

interface EmptyStateProps {}

const EmptyState: FC<EmptyStateProps> = ({}) => {
  return (
    <div className="px-4 py-10sm:px-6 lg:px-8 flex h-full justify-center items-center bg-gray-100">
      <div className="text-center items-center flex flex-col">
        <h3 className="mt-2 text-2xl font-semibold textgray-900">
          Select a chat or start a new conversation
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
