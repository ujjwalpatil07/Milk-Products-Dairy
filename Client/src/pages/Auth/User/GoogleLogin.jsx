import React, { useContext } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa"; // optional icon
import { loginWithGoogle } from "../../../services/userService";
import { useSnackbar } from "notistack";
import { AdminAuthContext, UserAuthContext } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function GoogleLogin() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { handleAdminLogout } = useContext(AdminAuthContext);
  const { fetchUserData } = useContext(UserAuthContext);

  const login = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      const handleGoogleLogin = async () => {
        try {
          const res = await loginWithGoogle(credentialResponse);
          if (res?.success) {
            localStorage.setItem("User", JSON.stringify(res?.user));
            await fetchUserData(res?.user?._id);

            if (!res?.filledBasicInfo) {
              navigate("/signup/info-input", {
                state: { user: res?.user, viaLogin: true },
              });
            } else {
              handleAdminLogout();
              enqueueSnackbar("Login Successful!", { variant: "success" });
              navigate("/home");
            }
          } else {
            enqueueSnackbar("Login failed, please try again.", { variant: "error" });
          }
        } catch (err) {
          console.error(err);
          enqueueSnackbar("Error logging in with Google", { variant: "error" });
        }
      };

      handleGoogleLogin(); // ✅ call the async function
    },
    onError: () => {
      enqueueSnackbar("Google Login Failed", { variant: "error" });
    },
  });

  return (

    <button
      onClick={() => login()}
      className="w-full bg-[#843E71] text-sm text-white py-1.5 rounded-md hover:bg-[#6f3360] flex items-center justify-center gap-2 transition"
    >
      <FaGoogle />
      Continue with Google
    </button>
  );
}
