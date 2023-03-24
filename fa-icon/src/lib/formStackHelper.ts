export const loginStackList = () => {
  const dataFieldList = {
    flexDirection: "column",
    property: [
      {
        label: "",
        type: "text",
        name: "email",
        placeholder: "USERNAME",
      },
      {
        label: "",
        type: "password",
        name: "password",
        placeholder: "PASSWORD",
      },
    ],
  };
  return { dataFieldList };
};
