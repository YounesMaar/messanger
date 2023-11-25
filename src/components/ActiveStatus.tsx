"use client";

import useActiveChannel from "@/hooks/useActiveChannel";
import { FC } from "react";

interface ActiveStatusProps {}

const ActiveStatus: FC<ActiveStatusProps> = ({}) => {
  useActiveChannel();
  return null;
};

export default ActiveStatus;
