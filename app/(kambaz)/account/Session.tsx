"use client";

import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const currentUser = await client.profile();
        dispatch(setCurrentUser(currentUser));
      } catch (err) {
        if ((err as { response?: { status?: number } })?.response?.status !== 401) {
          console.error(err);
        }
      }
      setPending(false);
    })();
  }, [dispatch]);

  if (!pending) {
    return children;
  }
}
