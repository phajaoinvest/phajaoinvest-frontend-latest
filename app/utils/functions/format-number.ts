// console.log(trimDecimal("15.00")); // "15"
export function trimDecimal(value: string | number): string {
   if (value === null || value === undefined) {
      return ""
   }
   const str = value.toString();
   return str.endsWith(".00") ? str.slice(0, -3) : str;
}

// formatMoney(1000000);   -> "1,000,000"
export function formatMoney(amount: number | string): string {
   if (amount === null || amount === undefined || amount === "") return "0";
   const num = typeof amount === "string" ? parseFloat(amount) : amount;
   return num.toLocaleString("en-US");
}


// Check positive number
export function isPositive(num: number): boolean {
   return num > 0;
}
