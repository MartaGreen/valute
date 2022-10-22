import dateFormat from "dateformat";

const formatDate = (dateStr: string | undefined) => {
  if (!dateStr) return;

  const date: Date = new Date(dateStr);
  const formatedDate = dateFormat(date, "mmmm dS, yyyy");
  return formatedDate;
};

export default formatDate;
