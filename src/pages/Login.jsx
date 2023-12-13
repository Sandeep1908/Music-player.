

import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./../firebase.js";
import { RecaptchaVerifier, signInWithPhoneNumber, updateProfile } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";


import { useNavigate } from "react-router-dom";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "./../firebase.js";



export const LoginMobile = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("")





  const navigate = useNavigate()
  auth.onAuthStateChanged((event, session) => {
    console.log(session);
  })
  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => { },
        }

      );
    }
  }

   


 

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        navigate('/')
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <section className="bgImg flex items-center justify-center  h-[90vh]">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
     
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Sign In
            </h1>
            {showOTP ? (
              <>
                <div className="bg-white text-[#FA7855] w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                >
                 Enter Your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="bg-[#FA7855] w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>


         

                <div className=" flex flex-col justify-between  items-center h-[200px]">


                <label
                  htmlFor=""
                  className="font-bold text-xl text-white text-center w-[500px]"
                  >
                   Please enter you mobile number to login. We will send an OTP verify your number
                </label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} />
                <button
                  onClick={onSignup}
                  className="bg-[#FA7855] w-[300px] flex gap-1 items-center justify-center py-2.5 text-white rounded"
                  >
                  {loading && (
                      <CgSpinner size={20} className="mt-1 animate-spin" />
                      )}
                  <span>Send code via SMS</span>
                </button>
                      </div>
              </>
            )}
          </div>
     
      </div>
    </section>
  );
}