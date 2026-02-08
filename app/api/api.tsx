// const accessToken = localStorage.getItem("accessToken");
// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");
// const headers = {
//   "Content-Type": "application/json",
//   ...(accessToken && {
//     Authorization: `Bearer ${accessToken}`.replace(/"/g, ""),
//   }),
// };

// // Query data API
// export const queryData = async (props: { url: string }) => {
//   const options: RequestInit = {
//     method: "GET",
//     headers: process.env.NODE_ENV == "development" ? headers : myHeaders,
//     credentials: "include",
//   };

//   const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + props.url, options);

//   if (response.status === 200) {
//     const data = await response.json();
//     return data;
//   } else {
//     return response;
//   }
// };

// // Update data API
// export const updateAPI = async (props: { url: string; body: {} }) => {
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   var options: RequestInit = {
//     method: "PUT",
//     headers: process.env.NODE_ENV == "development" ? headers : myHeaders,
//     body: JSON.stringify(props?.body),
//     credentials: "include",
//     redirect: "follow",
//   };
//   const fullUrl = process.env.NEXT_PUBLIC_API_BASE_URL + props.url;
//   try {
//     const response = await fetch(fullUrl, options);
//     if (response.status === 200) {
//       const data = await response.json();
//       return data;
//     }
//     return response.json();
//   } catch (error: any) {
//     return { error: error.message };
//   }
// };

// // Create data API
// export const postAPI = async (props: { url: string; body: {} }) => {
//   var myHeaders = new Headers();

//   myHeaders.append("Content-Type", "application/json");
//   var options: RequestInit = {
//     method: "POST",
//     headers: process.env.NODE_ENV == "development" ? headers : myHeaders,
//     body: JSON.stringify(props?.body),
//     credentials: "include",
//   };

//   const fullUrl = process.env.NEXT_PUBLIC_API_BASE_URL + props.url;
//   try {
//     const response = await fetch(fullUrl, options);
//     if (response.status === 200) {
//       const data = await response.json();
//       return data;
//     }
//     return response.json();
//   } catch (error: any) {
//     return { error: error.message };
//   }
// };

// // Delete data API
// export const deleteAPI = async (props: { url: string }) => {
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   var options: RequestInit = {
//     method: "DELETE",
//     credentials: "include",
//   };
//   const fullUrl = process.env.NEXT_PUBLIC_API_BASE_URL + props.url;
//   try {
//     const response = await fetch(fullUrl, options);
//     if (response.status === 200) {
//       const data = await response.json();
//       return data;
//     }
//     return response.json();
//   } catch (error: any) {
//     return { error: error.message };
//   }
// };


// Utility to build headers dynamically
const getHeaders = () => {
  const accessToken = localStorage.getItem("accessToken");

  return {
    "Content-Type": "application/json",
    ...(accessToken && {
      Authorization: `Bearer ${accessToken.replace(/"/g, "")}`,
    }),
  };
};

// Query data API
export const queryData = async (props: { url: string }) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + props.url,
    {
      method: "GET",
      headers: getHeaders(),
      credentials: "include",
    }
  );

  if (response.status === 200) {
    return await response.json();
  }
  return response;
};

// Update data API
export const updateAPI = async (props: { url: string; body: {} }) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + props.url,
    {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(props.body),
      credentials: "include",
    }
  );

  if (response.status === 200) {
    return await response.json();
  }
  return response.json();
};

// Create data API
export const postAPI = async (props: { url: string; body: {} }) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + props.url,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(props.body),
      credentials: "include",
    }
  );

  if (response.status === 200) {
    return await response.json();
  }
  return response.json();
};

// Delete data API
export const deleteAPI = async (props: { url: string }) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + props.url,
    {
      method: "DELETE",
      headers: getHeaders(),
      credentials: "include",
    }
  );

  if (response.status === 200) {
    return await response.json();
  }
  return response.json();
};
