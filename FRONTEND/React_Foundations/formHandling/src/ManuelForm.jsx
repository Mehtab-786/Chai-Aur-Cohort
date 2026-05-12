import React, { useState } from "react";

const ROLES = ["Frontend", "Backend", "Fullstack"];

function ManuelForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    exp: "",
    cover: "",
    role: "Frontend",
  });
  const [errors, seterrors] = useState({});
  const [submitted, setsubmitted] = useState(false);

  const set = (field) => {
    return (e) => setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  function validate(val) {
    const newErrors = {};
    if (val.name.trim() === "") newErrors.name = "Name is required";
    if (val.email.trim() === "") newErrors.email = "Email is required";

    return newErrors;
  }

  function submitHandler(e) {
    e.preventDefault();
    const newErrors = validate(values);
    if (Object.keys(newErrors).length > 0) seterrors(newErrors);
    else {
      setsubmitted(true);
    }

  }

  if(submitted) return <div>Form submitted successfully {values.name}</div>;

  return <div>
    <form onSubmit={submitHandler} noValidate>
      <label>
        Full Name
        <input type="text" value={values.name} onChange={set('name')} />
        {errors.name && <span>{errors.name}</span>}
      </label>
      <label>
        Email
        <input type="text" value={values.email} onChange={set('email')} />
        {errors.email && <span>{errors.email}</span>}
      </label>
      <button type="submit">Submit</button>
    </form>
  </div>;
}

export default ManuelForm;
