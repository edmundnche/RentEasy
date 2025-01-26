import React from "react";

const CreateListing = () => {
  return (
    <div className="flex-1 p-4 mx-12">
      <h2 className="text-center text-3xl text-sky-700 font-extrabold mb-6">
        Create a Listing
      </h2>

      <form className="flex flex-col gap-6">
        {/* Name Field */}
        <div className="flex flex-col gap-2">
          <label className="text-sky-700 font-semibold">Name</label>
          <input
            type="text"
            placeholder="Enter listing name"
            className="p-2 border border-sky-300 rounded-md"
          />
        </div>

        {/* Description Field */}
        <div className="flex flex-col gap-2">
          <label className="text-sky-700 font-semibold">Description</label>
          <textarea
            placeholder="Enter listing description"
            className="p-2 border border-sky-300 rounded-md"
            rows="4"
          />
        </div>

        {/* Address Field */}
        <div className="flex flex-col gap-2">
          <label className="text-sky-700 font-semibold">Address</label>
          <input
            type="text"
            placeholder="Enter listing address"
            className="p-2 border border-sky-300 rounded-md"
          />
        </div>

        {/* Type Selection with Checkboxes */}
        <div className="flex flex-col gap-2">
          <label className="text-sky-700 font-semibold">Type</label>
          <div className="flex flex-col gap-2">
            {/* Checkbox for Self */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="form-checkbox text-sky-700 rounded"
              />
              <span className="text-sky-700">Self</span>
            </label>

            {/* Checkbox for Rent */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="form-checkbox text-sky-700 rounded"
              />
              <span className="text-sky-700">Rent</span>
            </label>

            {/* Checkbox for Parking spot */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="form-checkbox text-sky-700 rounded"
              />
              <span className="text-sky-700">Parking spot</span>
            </label>

            {/* Checkbox for Furnished */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="form-checkbox text-sky-700 rounded"
              />
              <span className="text-sky-700">Furnished</span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateListing;