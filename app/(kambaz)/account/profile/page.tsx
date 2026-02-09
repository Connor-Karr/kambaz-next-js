import Link from "next/link";
import { FormControl, FormLabel, FormGroup } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="p-3">
      <h3>Profile</h3>

      <FormGroup className="mb-3">
        <FormLabel htmlFor="wd-username">Username</FormLabel>
        <FormControl
          id="wd-username"
          defaultValue="alice"
          placeholder="username"
          className="wd-username"
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel htmlFor="wd-password">Password</FormLabel>
        <FormControl
          id="wd-password"
          defaultValue="123"
          placeholder="password"
          type="password"
          className="wd-password"
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel htmlFor="wd-firstname">First Name</FormLabel>
        <FormControl
          id="wd-firstname"
          defaultValue="Alice"
          placeholder="First Name"
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel htmlFor="wd-lastname">Last Name</FormLabel>
        <FormControl
          id="wd-lastname"
          defaultValue="Wonderland"
          placeholder="Last Name"
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel htmlFor="wd-dob">Date of Birth</FormLabel>
        <FormControl id="wd-dob" type="date" defaultValue="2000-01-01" />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel htmlFor="wd-email">Email</FormLabel>
        <FormControl
          id="wd-email"
          type="email"
          defaultValue="alice@wonderland"
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel htmlFor="wd-role">Role</FormLabel>
        <FormControl as="select" id="wd-role" defaultValue="FACULTY">
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </FormControl>
      </FormGroup>

      <Link href="/account/signin" className="btn btn-danger w-100">
        Sign out
      </Link>
    </div>
  );
}
