import cors, { CorsOptions } from "cors";

const ALLOWED_DOMAINS = [
  "app.hydration.net",
  "app.hydradx.io",
  "hydra-app.netlify.app",
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (
      origin &&
      ALLOWED_DOMAINS.some((o) => new URL(origin).origin.includes(o))
    ) {
      callback(null, true);
    } else {
      callback(new Error("Access denied"));
    }
  },
};

export default cors(corsOptions);
