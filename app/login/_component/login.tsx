import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

type Props = {};

export default function LoginComponent({}: Props) {
  const { data: session } = useSession();
  // if (session) {
  //   return (
  //     <>
  //       Signed in as {session.user.email} <br />
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   )
  // }
  console.log(session);
  return (
    <>
      <h2> Not signed in</h2>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
