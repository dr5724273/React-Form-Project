import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const countryCityMap = {
  India: ["Delhi", "Mumbai", "Bangalore"],
  USA: ["New York", "Los Angeles", "Chicago"],
  UK: ["London", "Manchester", "Liverpool"],
};

function FormPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneCode: "",
    phoneNumber: "",
    country: "",
    city: "",
    pan: "",
    aadhar: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";

    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Min 6 characters";

    if (!formData.phoneCode.trim()) newErrors.phoneCode = "Code required";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Number required";

    if (!formData.country) newErrors.country = "Select country";
    if (!formData.city) newErrors.city = "Select city";

    if (!formData.pan.trim()) newErrors.pan = "PAN is required";
    else if (!/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(formData.pan))
      newErrors.pan = "Invalid PAN format";

    if (!formData.aadhar.trim()) newErrors.aadhar = "Aadhar is required";
    else if (!/^\d{12}$/.test(formData.aadhar))
      newErrors.aadhar = "Aadhar must be 12 digits";

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      navigate("/success", { state: formData });
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        {["firstName", "lastName", "username", "email", "pan", "aadhar"].map((field) => (
          <div key={field}>
            <label>{field.replace(/([A-Z])/g, " $1")}: </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
            />
            <div style={{ color: "red" }}>{errors[field]}</div>
          </div>
        ))}

        <div>
          <label>Password: </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="button" onClick={() => setShowPassword((s) => !s)}>
            {showPassword ? "Hide" : "Show"}
          </button>
          <div style={{ color: "red" }}>{errors.password}</div>
        </div>

        <div>
          <label>Phone Code: </label>
          <input
            type="text"
            name="phoneCode"
            value={formData.phoneCode}
            onChange={handleChange}
            placeholder="+91"
          />
          <label>Number: </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="1234567890"
          />
          <div style={{ color: "red" }}>
            {errors.phoneCode || errors.phoneNumber}
          </div>
        </div>

        <div>
          <label>Country: </label>
          <select name="country" value={formData.country} onChange={handleChange}>
            <option value="">--Select Country--</option>
            {Object.keys(countryCityMap).map((country) => (
              <option key={country}>{country}</option>
            ))}
          </select>
          <div style={{ color: "red" }}>{errors.country}</div>
        </div>

        <div>
          <label>City: </label>
          <select name="city" value={formData.city} onChange={handleChange}>
            <option value="">--Select City--</option>
            {countryCityMap[formData.country]?.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
          <div style={{ color: "red" }}>{errors.city}</div>
        </div>

        <button type="submit" disabled={!isFormValid}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormPage;
