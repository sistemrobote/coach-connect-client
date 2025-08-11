export const Modal = ({ closeModal }: { closeModal: () => void }) => {
  const handleSave = () => {};
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
    >
      <div className="bg-white rounded-2xl p-6 shadow-xl w-80">
        <h2 className="text-lg font-semibold mb-4">Add Push-ups & Pull-ups</h2>
        <label className="flex justify-between block mb-2">
          <div>Push-ups:</div>
          <input type="number" className="border rounded p-2 ml-2 w-24" />
        </label>
        <label className="flex justify-between block mb-4">
          <div>Pull-ups:</div>
          <input type="number" className="border rounded p-2 ml-2 w-24" />
        </label>
        <div className="flex justify-end space-x-2">
          <button
            className="border px-4 py-2 rounded text-gray-500"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
