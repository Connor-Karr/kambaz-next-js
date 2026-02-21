import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="p-3">
      <h3>Sign up</h3>
      <FormControl
        id="wd-username"
        placeholder="username"
        defaultValue="alice"
        className="mb-3 wd-username"
      />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        defaultValue="123"
        className="mb-3 wd-password"
      />
      <FormControl
        id="wd-password-verify"
        placeholder="verify password"
        type="password"
        defaultValue="123"
        className="mb-3 wd-password-verify"
      />
      <Link
        id="wd-signup-btn"
        href="/account/profile"
        className="btn btn-primary w-100 mb-2"
      >
        Sign up
      </Link>
      <Link id="wd-signin-link" href="/account/signin">
        Sign in
      </Link>
    </div>
  );
}
