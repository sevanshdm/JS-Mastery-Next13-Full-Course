"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react' // these makes the sign-in/sing-up flow very simple.

const Nav = () => {
  // const isUserLoggedIn = true
  const { data: session } = useSession()

  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()
 
      setProviders(response)
    }

    setUpProviders()
  },[])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.svg" alt="Promptopia Logo" width={30} height={30} className="object-contain"/>
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden"> {/*On everything larger than small, you'll be able to see the Create Post*/}
        {session?.user ? ( //checking if a user exists
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image 
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>

          </div>
        ): ( //If user isn't logged in...
          <>
            {providers && 
              Object.values(providers).map((provider) => ( // this stuff allows you to have all the different providers and shows button for the sign up
                <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? ( //checking if a user exists
          <div className="flex">
            <Image 
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)} // set to opposite of it's current value
            />

            {toggleDropdown && ( //if toggleDropdown is true... do the following below
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button className="mt-5 w-full black_btn" type="button" onClick={() => {
                  setToggleDropdown(false)
                  signOut()
                }}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers && 
              Object.values(providers).map((provider) => ( // this stuff allows you to have all the different providers and shows button for the sign up
                <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

    </nav>
  )
}

export default Nav