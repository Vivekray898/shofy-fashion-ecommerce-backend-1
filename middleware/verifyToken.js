const { getAuth } = require("@clerk/express");

module.exports = (req, res, next) => {
  try {
    // 1. Grab authentication state using Clerk's official Express extractor
    const authState = getAuth(req);

    // 2. Clear out early if no user session is active
    if (!authState || !authState.userId) {
      return res.status(401).json({
        status: "fail",
        error: "You are not logged in or session has expired"
      });
    }

    // 3. Map values onto req.auth to keep authorization.js fully synced
    req.auth = {
      userId: authState.userId,
      sessionClaims: authState.sessionClaims
    };

    next();
  } catch (error) {
    console.error("Clerk Token Resolution Crash:", error);
    return res.status(500).json({
      status: "error",
      error: "Internal security processing exception occurred"
    });
  }
};