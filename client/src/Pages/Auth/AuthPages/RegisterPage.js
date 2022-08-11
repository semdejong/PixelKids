import { useState } from "react";
import { Button, Input } from "antd";
import { Link } from "react-router-dom";

import useAuthHook from "./hooks/useAuthHook";

export default function LoginPage() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register } = useAuthHook();

  return (
    <div className="w-1/3 p-10">
      <Input
        placeholder="fullname"
        onChange={(e) => setFullname(e.target.value)}
      />
      <br />
      <br />
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
          register(fullname, email, password);
        }}
      >
        Register
      </Button>

      <br />
      <br />
      <Link to="/auth/login">I already have an account</Link>
    </div>
  );
}
