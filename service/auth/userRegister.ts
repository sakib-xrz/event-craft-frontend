import setTokenAndRedirect from "@/actions/setTokenAndRedirect";
import { BASE_URL } from "@/lib/constant";

type UserRegisterPayload = {
  full_name: string;
  email: string;
  password: string;
};

const userRegister = async (payload: UserRegisterPayload) => {
  const urlParams = new URLSearchParams(window?.location?.search);
  const existingRedirectURL = urlParams.get("next");

  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }

    const data = await response.json();

    const { access_token } = data?.data;

    if (access_token) {
      await setTokenAndRedirect(access_token, {
        redirect: existingRedirectURL || "/",
      });
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export default userRegister;
