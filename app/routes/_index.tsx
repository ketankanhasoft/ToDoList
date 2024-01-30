import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

// return component
export default function Index() {
  return (
    <div>
      <Link to="/todo">Click to go to Todo list</Link>
    </div>
  );
}
