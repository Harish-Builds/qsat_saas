import React from "react";
import Button from "components/ui/Button";

const ButtonNew = ({ variant, children }) => {
  const baseStyles = "px-4 py-2 rounded-md focus:outline-none";
  const variantStyles = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline:
      "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
    destructive: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <div className="flex justify-center gap-4">
      <Button variant="outline">Connect</Button>
      <Button variant="destructive">Update</Button>
    </div>
  );
};

export default ButtonNew;
