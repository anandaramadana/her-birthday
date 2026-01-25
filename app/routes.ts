import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("celebrate", "routes/celebrate.tsx"),
    route("celebrate/stage2", "routes/celebrate.stage2.tsx"),
    route("celebrate/stage3", "routes/celebrate.stage3.tsx"),
] satisfies RouteConfig;

