import moment from "moment";

/**
 * @description show date in format: 1 hour ago, 1 day ago, 1 week ago, 1 month ago, 1 year ago
 * @param date
 * @returns {string}
 */
export const diffDate = (date: Date): string => {
  const now = moment();
  const dateMoment = moment(date);
  const diff = now.diff(dateMoment, "seconds");
  if (diff < 60) {
    return `${diff} giây trước`;
  }
  if (diff < 3600) {
    return `${Math.floor(diff / 60)} phút trước`;
  }
  if (diff < 86400) {
    return `${Math.floor(diff / 3600)} giờ trước`;
  }
  if (diff < 604800) {
    return `${Math.floor(diff / 86400)} ngày trước`;
  }
  if (diff < 2592000) {
    return `${Math.floor(diff / 604800)} tuần trước`;
  }
  if (diff < 31536000) {
    return `${Math.floor(diff / 2592000)} tháng trước`;
  }
  return `${Math.floor(diff / 31536000)} năm trước`;
};
