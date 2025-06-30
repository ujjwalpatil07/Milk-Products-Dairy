import { useContext, useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { Save, X, Pencil } from "lucide-react";
import { AdminAuthContext } from "../../../context/AuthProvider";
import { useSnackbar } from "notistack";
import { handleAdminProfileEdit } from "../../../services/adminService";

export default function AdminProfileInfo() {
  const { authAdmin, setAuthAdmin } = useContext(AdminAuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({});
  const [previewImage, setPreviewImage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (authAdmin) {
      setFormData({ ...authAdmin });
      setPreviewImage(authAdmin.image || "");
    }
  }, [authAdmin]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("factoryAddress.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        factoryAddress: {
          ...prev.factoryAddress,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleAdminInfo = async () => {
    try {
      setLoading(true);
      const form = new FormData();

      form.append("adminId", authAdmin._id);
      form.append("name", formData.name || "");
      form.append("username", formData.username || "");
      form.append("email", formData.email || "");
      form.append("mobileNo", formData.mobileNo || "");

      if (formData.factoryAddress) {
        form.append("factoryAddress.street", formData.factoryAddress.street || "");
        form.append("factoryAddress.city", formData.factoryAddress.city || "");
        form.append("factoryAddress.state", formData.factoryAddress.state || "");
        form.append("factoryAddress.pincode", formData.factoryAddress.pincode || "");
      }

      if (imageFile) {
        form.append("image", imageFile);
      }

      const res = await handleAdminProfileEdit(form);

      if (!res?.admin) {
        throw new Error("Profile update failed: no admin returned.");
      }

      setAuthAdmin(res.admin);
      enqueueSnackbar("Profile updated successfully!", { variant: "success" });
      setEditMode(false);
    } catch (err) {
      enqueueSnackbar(
        err.response?.data?.message || "Failed to update profile",
        { variant: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  const fallback = (value) => value || <span className="italic text-gray-400">Not provided</span>;

  return (
    <div className="bg-gray-100 dark:bg-gray-500/20 p-3 md:p-6 rounded flex flex-col md:flex-row gap-6 transition-all duration-300 items-start md:items-center">
      <div className="flex flex-col items-center gap-3">
        <Avatar
          src={previewImage}
          alt={formData.name || "Admin"}
          className="!w-24 !h-24 sm:!w-36 sm:!h-36 md:!w-50 md:!h-50"
        />
        {editMode && (
          <label className="text-sm text-blue-600 dark:text-blue-300 cursor-pointer">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            Change Photo
          </label>
        )}
      </div>

      <div className="flex-1 w-full space-y-2 text-gray-800 dark:text-white">
        {[{ label: "Name", name: "name", placeholder: "Enter your name" },
        { label: "Username", name: "username", placeholder: "Enter username" },
        { label: "Email", name: "email", placeholder: "Enter email address" },
        { label: "Mobile No", name: "mobileNo", placeholder: "Enter 10-digit mobile number" }]
          .map((field) => (
            <div key={field.name} className="flex items-center justify-between gap-4">
              <span className="font-medium w-20 sm:w-30 md:w-40">{field.label}:</span>
              {editMode ? (
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="flex-1 w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 px-3 py-2 rounded-md outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                />
              ) : (
                <span className="flex-1 text-sm">{fallback(formData[field.name])}</span>
              )}
            </div>
          ))}

        <div className="space-y-2">
          <div className="font-semibold text-lg text-gray-900 dark:text-white">Factory Address</div>
          {editMode ? (
            ["street", "city", "state", "pincode"].map((key) => (
              <div key={key} className="flex items-center justify-between gap-4">
                <span className="font-medium w-20 sm:w-30 md:w-40 capitalize">{key}:</span>
                <input
                  type="text"
                  name={`factoryAddress.${key}`}
                  value={formData.factoryAddress?.[key] || ""}
                  onChange={handleChange}
                  placeholder={`Enter ${key}`}
                  className="flex-1 w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 px-3 py-2 rounded-md outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                />
              </div>
            ))
          ) : (
            <div className="flex items-start gap-4">
              <span className="font-medium w-20 sm:w-30 md:w-40">Address:</span>
              <span className="flex-1 text-sm">
                {[
                  formData.factoryAddress?.street,
                  formData.factoryAddress?.city,
                  formData.factoryAddress?.state,
                  formData.factoryAddress?.pincode,
                ].filter(Boolean).length > 0
                  ? [formData.factoryAddress?.street, formData.factoryAddress?.city, formData.factoryAddress?.state, formData.factoryAddress?.pincode].filter(Boolean).join(", ")
                  : <span className="italic text-gray-400">Not provided</span>}
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-2 gap-3">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center gap-1 px-4 py-2 text-sm bg-blue-100 dark:bg-blue-800/30 hover:bg-blue-200 dark:hover:bg-blue-700 text-blue-800 dark:text-white rounded"
            >
              <Pencil size={16} />
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={() => setEditMode(false)}
                className="flex items-center gap-1 px-4 py-2 text-sm bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded"
              >
                <X size={16} />
                Cancel
              </button>
              <button
                onClick={handleAdminInfo}
                disabled={loading}
                className={`flex items-center gap-1 px-4 py-2 text-sm rounded text-white transition ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                <Save size={16} />
                {loading ? "Saving..." : "Save"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
