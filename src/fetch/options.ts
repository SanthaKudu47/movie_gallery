function getRequestOptions(method: "GET" | "POST" | "PUT" | "PATCH" = "GET") {
  return {
    method: method,
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzY2VjYmM5MzEwNGZiMDMwZTM1OGZjYWFhNmMxMGVjOCIsIm5iZiI6MTczODM0ODkzOC4zNDYsInN1YiI6IjY3OWQxOThhN2I0MTUzYTNiOTk1MjczMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rbg6ICxg-qimHaqquXlFTBW6fhMwFHdmGFy2ENQQCGA",
    },
  };
}

export { getRequestOptions };
