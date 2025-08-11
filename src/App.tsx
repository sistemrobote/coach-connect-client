import { Login } from "./components/Login";
import { useUserId } from "./hooks/useUserId";
import { TrainingLog } from "./components/TrainingLog";
import WeeklyRunsChart from "./components/WeeklyRunsChart";
import { ActivitiesSection } from "./components/ActivitiesSection";
import { Modal } from "./components/Modal";
import { useState } from "react";

export const App = () => {
  const userId = useUserId();
  const [showModal, setSetShowModal] = useState(false);
  const openModal = () => setSetShowModal(true);
  const setCloseModal = () => setSetShowModal(false);

  if (!userId) return <Login />;

  return (
    <div className="flex items-center justify-center py-2">
      <div
        className="
      w-full 
      md:w-2/3 
      p-4
    "
      >
        <WeeklyRunsChart userId={userId} />
        <ActivitiesSection userId={userId} />
        <TrainingLog userId={userId} />
        <button
          className="absolute top-6 right-6 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow hover:bg-orange-600 transition"
          title="Add push-ups & pull-ups"
          onClick={openModal}
        >
          <span className="text-white text-2xl font-bold pb-0.5">+</span>
        </button>
        {showModal && <Modal closeModal={setCloseModal} />}
      </div>
    </div>
  );
};
