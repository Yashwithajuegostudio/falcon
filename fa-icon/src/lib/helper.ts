import Router from "next/router";

//helper function
export const validateEmail = (email: string): boolean => {
  const reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (email.match(reg)) return true;
  return false;
};

export const validateMobileNumber = (mobileNo: string): boolean => {
  let number = mobileNo.toString();
  const reg = "^\\d{10}$";
  if (number.length < 10) {
    console.log(number.length, "number.length<10");
    return false;
  } else if (number.match(reg)) {
    console.log(number.length, "number.length valid");
    return true;
  } else {
    console.log(number.length, "number.length not valid");
    return false;
  }
};

export const routerNavigation = (path: string) => {
  return Router.push(path);
};

export const formValidation = (
  fields: Array<any>,
  optionalFields: Array<any>
) => {
  let mandatoryFields = [];
  let conditionalFields = [
    "investment_type",
    "value_of_current_date",
    "current_value",
  ];
  for (let [key, value] of Object?.entries(fields)) {
    if (!optionalFields.includes(key)) {
      if (conditionalFields.includes(key)) {
        value == 0 && mandatoryFields.push(key);
      } else {
        !value && mandatoryFields.push(key);
      }
    }
  }
  return mandatoryFields;
};

export const blockNumberTypeInvalidChar = (e: any) => {
  ["e", "E", "+", "-", "*", "/"].includes(e.key) && e.preventDefault();
};

export const blockTextTypeInvalidChar = (e: any) =>
  ["+", "-", "*", "/"].includes(e.key) && e.preventDefault();

export const formatDateAndTime = (date: Date) => {
  return (
    new Date(date).toLocaleDateString("en-Us") +
    " " +
    new Date(date).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  );
};
