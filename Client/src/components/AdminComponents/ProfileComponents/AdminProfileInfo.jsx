import { useState } from "react";

export default function AdminProfileInfo({ editMode }) {
  
  const [adminData, setAdminData] = useState({
    name: "Ujjwal Patil",
    role: "Owner",
    email: "ujjwal@patil.com",
    contact: "8568548987",
    address: "Ambad Gaon, Nashik",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // dark: bg - gray - 500 / 20

  return (
    <div className="bg-white dark:bg-gray-500/20  p-6 rounded-xl shadow-md flex gap-6 items-start transition-all duration-300 hover:shadow-xl">
      {/* Profile Image */}
      <div className="shrink-0">
        <img
          src="https://plus.unsplash.com/premium_photo-1661302846246-e8faef18255d?w=900&auto=format&fit=crop&q=60"
          alt="Admin Profile"
          className="h-28 w-28 rounded-full border object-cover"
        />
      </div>

      {/* Profile Details */}
      <div className="flex-1 space-y-3 text-gray-800 dark:text-white">
      

        {/* Editable Fields */}
        {["name", "role", "email", "contact", "address"].map((field, idx) => (
          <div key={idx * 0.9} className="flex gap-4">
            <span className="font-medium capitalize">{field}:</span>
            {editMode ? (
              <input
                type="text"
                name={field === "contact" ? "contact" : field}
                value={adminData[field]}
                onChange={handleChange}
                className=" bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 px-2 py-1 rounded outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
            ) : (
              <span className=" text-right">{adminData[field]}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
