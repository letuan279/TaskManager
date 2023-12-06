import React from "react";
import { Button } from "@/components/ui/button";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

function Setting() {
  return (
    <div>
      <h1 className="text-5xl p-5">Setting</h1>
      <div className="flex flex-col justify-center items-center pt-4 pb-6 ">
        <p className="text-lg font-bold ">
          Schedule work from other calendars
          <br />
          Sync:
        </p>
        <div className="flex flex-row justify-between items-center pt-4">
          <img
            className="w-20 h-20 mr-5"
            src="https://i.pinimg.com/originals/6e/09/90/6e099088b3deb805b68d83676af6f067.png"
          />
          <GoogleOAuthProvider clientId="930538281451-ai6lop8t5knjbh6ce3dj2e8io9kdtp3j.apps.googleusercontent.com">
            <GoogleLogin
              text="signin"
              shape="rectangular"
              theme="filled_blue"
            />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
}

export default Setting;
