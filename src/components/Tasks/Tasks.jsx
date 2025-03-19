import React from "react";
import { MessageCircle } from "lucide-react";

const Tasks = () => {
  return (
    <div className="max-w-sm p-4 border border-purple-300 rounded-lg shadow-md bg-white relative">
      {/* Tags */}
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-yellow-300 text-yellow-900 text-sm px-3 py-1 rounded-full flex items-center gap-1">
          <span className="text-lg">☰</span> საშუალო
        </span>
        <span className="bg-pink-500 text-white text-sm px-3 py-1 rounded-full">დიზაინი</span>
      </div>

      {/* Date */}
      <p className="text-gray-500 text-sm absolute top-4 right-4">22 იანვ, 2022</p>

      {/* Title */}
      <h2 className="text-lg font-bold text-gray-800">Redberry-ს საიტის ლენდინგის დიზაინი</h2>

      {/* Description */}
      <p className="text-gray-600 text-sm mt-1">
        შექმენი საიტის მთავარი გვერდი, რომელიც მოიცავს მთავარ სექციებს, ნახვადობას.
      </p>

      {/* Profile & Comments */}
      <div className="flex items-center justify-between mt-4">
        {/* Profile Image */}
        <img
          src="https://via.placeholder.com/40" // აქ შეგიძლია დაამატო პროფილის რეალური სურათი
          alt="User Profile"
          className="w-10 h-10 rounded-full"
        />

        {/* Comments */}
        <div className="flex items-center gap-1 text-gray-600">
          {/* <FaCommentAlt /> */}
          <div className="flex items-center gap-1 text-gray-600">
            <MessageCircle size={20} />
            <span className="text-sm">8</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
