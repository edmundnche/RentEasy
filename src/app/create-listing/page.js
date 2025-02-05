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

        {/* Offer Section */}
        <div className="flex flex-col gap-2">
          <label className="text-sky-700 font-semibold">Offer</label>
          <div className="flex gap-4">
            {/* Beds Input */}
            <div className="flex flex-col gap-2 w-1/4">
              <label className="text-sky-700">Beds</label>
              <input
                type="number"
                placeholder="Enter beds"
                className="p-2 border border-sky-300 rounded-md"
              />
            </div>

            {/* Baths Input */}
            <div className="flex flex-col gap-2 w-1/4">
              <label className="text-sky-700">Baths</label>
              <input
                type="number"
                placeholder="Enter baths"
                className="p-2 border border-sky-300 rounded-md"
              />
            </div>

            {/* Regular Price Input */}
            <div className="flex flex-col gap-2 w-1/4">
              <label className="text-sky-700">Regular price ($ / month)</label>
              <input
                type="number"
                placeholder="Enter regular price"
                className="p-2 border border-sky-300 rounded-md"
              />
            </div>

            {/* Discounted Price Input */}
            <div className="flex flex-col gap-2 w-1/4">
              <label className="text-sky-700">Discounted price ($ / month)</label>
              <input
                type="number"
                placeholder="Enter discounted price"
                className="p-2 border border-sky-300 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="flex flex-col gap-2">
          <label className="text-sky-700 font-semibold">
            Images: The first image will be the cover (max 6)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            className="p-2 border border-sky-300 rounded-md"
          />
          <p className="text-sm text-gray-500">Choose Files No file chosen</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-sky-700 text-white px-6 py-2 rounded-md hover:bg-sky-900 transition-colors duration-200"
        >
          CREATE LISTING
        </button>
      </form>
    </div>
  );
};

export default CreateListing;