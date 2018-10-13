import PublicChat from "./Components/PublicChat";
import RoomChat from "./Components/RoomChat";
import LiveVisitors from "./Components/LiveVisitors";

export default [
  { path: "/", exact: true, Component: PublicChat },
  { path: "/roomChat", Component: RoomChat },
  { path: "/liveVisitors", Component: LiveVisitors }
];
