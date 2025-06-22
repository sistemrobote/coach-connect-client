import { ScaleLoader } from "react-spinners";

export const MainLoader = () => {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <ScaleLoader color="var(--color-primary)" height={50} />
    </div>
  );
};
