import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { sendEmail } from "../../redux/slices/users/usersSlices";

const formSchema = Yup.object({
  recipientEmail: Yup.string().required("Recipient Email is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});

const Contact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { redirectEmail } = useSelector((state) => state?.users);

  const formik = useFormik({
    initialValues: {
      recipientEmail: "",
      subject: "",
      message: "",
    },
    onSubmit: (values) => {
      dispatch(sendEmail(values));
      // console.log(values);
    },
    validationSchema: formSchema,
  });

  if (redirectEmail) {
    navigate("/");
    navigate(0);
  }

  return (
    <div className="w-full overflow-hiddenx font-poppins ">
      <section className="p-4 dark:white dark:text-black h-screen pt-[15%]">
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
          <div className="py-6 md:py-0 md:px-6">
            <h1 className="text-4xl font-bold">Get in touch</h1>
            <p className="pt-2 pb-4">
              If you have any questions or wanna know more about our services
              please send us an E-Mail on the shown E-Mail below or use the form
              on the right, Thank you. Shoppers Support Team.
            </p>
            <div className="space-y-4">
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>Based: Hyderabad, Telangana</span>
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <span>Support E-Mail: lazyyshoppers@gmail.com</span>
              </p>
            </div>
          </div>
          <form
            className="flex flex-col py-6 space-y-6 md:py-0 md:px-6"
            onSubmit={formik.handleSubmit}
            noValidate=""
          >
            <div className="w-full px-4">
              <div className="relative w-full h-10 mb-4">
                <input
                  value={formik.values.subject}
                  onChange={formik.handleChange("subject")}
                  onBlur={formik.handleChange("subject")}
                  type="text"
                  className="peer w-full h-full text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  placeholder=" "
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content-[' '] before:block before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content-[' '] after:block after:flex-grow after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:border-gray-900 after:border-blue-gray-200 peer-focus:after:border-gray-900">
                  Subject
                </label>
              </div>

              <div className="relative w-full h-10 mb-4">
                <input
                  value={formik.values.recipientEmail}
                  onChange={formik.handleChange("recipientEmail")}
                  onBlur={formik.handleChange("recipientEmail")}
                  className="peer w-full h-full text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  placeholder=" "
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content-[' '] before:block before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content-[' '] after:block after:flex-grow after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:border-gray-900 after:border-blue-gray-200 peer-focus:after:border-gray-900">
                  Email
                </label>
              </div>
              <div className="relative w-full mb-4">
                <textarea
                  value={formik.values.message}
                  onChange={formik.handleChange("message")}
                  onBlur={formik.handleChange("message")}
                  className="peer w-full min-h-[100px] resize-y text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  placeholder=" "
                ></textarea>
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content-[' '] before:block before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content-[' '] after:block after:flex-grow after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:border-gray-900 after:border-blue-gray-200 peer-focus:after:border-gray-900">
                  Message
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="self-center px-8 py-3 text-lg rounded focus:ring hover:ring dark:bg-[#a2826d] dark:text-gray-900"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
