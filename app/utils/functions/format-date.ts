// console.log(formatDate("2025-10-11T03:45:26.092Z")); 👉 "11/10/2025"
export function formatDateDDMMYYYY(dateString: string): string {
   const date = new Date(dateString);
   const day = String(date.getDate()).padStart(2, "0");
   const month = String(date.getMonth() + 1).padStart(2, "0");
   const year = date.getFullYear();
   return `${day}/${month}/${year}`;
}