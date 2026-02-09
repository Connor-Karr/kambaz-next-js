import Link from "next/link";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <Link
        href="/account/signin"
        id="wd-signin-link"
        className="list-group-item active border border-0"
      >
        Signin
      </Link>
      <Link
        href="/account/signup"
        id="wd-signup-link"
        className="list-group-item text-danger border border-0"
      >
        Signup
      </Link>
      <Link
        href="/account/profile"
        id="wd-profile-link"
        className="list-group-item text-danger border border-0"
      >
        Profile
      </Link>
    </div>
  );
}
