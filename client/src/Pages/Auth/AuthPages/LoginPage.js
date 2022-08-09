import { useState } from "react";
import { Button, Input } from "antd";

import useAuthHook from "./hooks/useAuthHook";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuthHook();

  return (
    <div className="w-1/3 p-10">
      <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <br />
      <br />
      <Input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <Button
        type="primary"
        onClick={() => {
          login(email, password);
        }}
      >
        Login
      </Button>
    </div>
  );
}
