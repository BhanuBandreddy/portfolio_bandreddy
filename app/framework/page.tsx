import { permanentRedirect } from "next/navigation";

// One canonical home for the map: /approach/framework.
export default function Page() {
  permanentRedirect("/approach/framework");
}
