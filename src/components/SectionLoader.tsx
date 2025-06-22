import { ClipLoader } from "react-spinners";
export const SectionLoader = () => {
  return (
    <div className="flex justify-center py-2">
      <ClipLoader color="var(--color-primary)" size={32} />
    </div>
  );
};
