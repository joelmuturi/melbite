import { ChatIcon, HeartIcon, ShareIcon } from '@heroicons/react/outline';
import React, { Fragment } from 'react'
import { Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from 'react-router-dom';
import pinIcon from '../images/pin.png'


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const WelcomeNote = ({commentCount}) => {
  const navigate = useNavigate()
  return (
    <main className="w-full border-2 rounded-md bg-white p-5 mb-2 hover:border-purple-800 duration-150">
      <section className="flex justify-between">
        <section className="flex items-center ">
          <span className="bg-yellow-300 w-10 font-mono p-1 pl-3 uppercase text-xl text-gray-800 h-10 border-2 border-yellow-300 rounded-full">
            M
          </span>
          <span className="ml-2">
            <h3 className="text-sm">Melbite verified</h3>
            <p className="text-sm text-gray-500">Published Apr/8/2022</p>
          </span>
        </section>
        <div className="flex flex-col items-center mr-2">
          <img className="h-6" src={pinIcon} alt="" />
          <p className="text-sm text-purple-900 font-bold">Pinned</p>
        </div>
      </section>

      <section className="mt-2">
        <span
          onClick={() =>
            navigate(
              "/Welcome-to-Melbite-the-official-blogging-site-or-the-world"
            )
          }
        >
          <h1 className="leading-9 text-3xl text-gray-900 hover:text-purple-900 cursor-pointer">
            Welcome to Melbite, We are glad to have you on board!{" "}
          </h1>
        </span>
      </section>

      <section className="flex justify-between mt-4">
        <span className="flex items-center w-2/5 justify-between text-gray-400">
          <Link
            to="/Welcome-to-Melbite-the-official-blogging-site-or-the-world"
            className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer"
          >
            <HeartIcon className="w-6 cursor-pointer " />
            <p className="ml-1 text-sm text-gray-500"></p>
            <p className="hidden sm:block ml-2 text-sm text-gray-600">React</p>
          </Link>

          <Link
            to="/Welcome-to-Melbite-the-official-blogging-site-or-the-world"
            className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer"
          >
            <ChatIcon className="w-6 cursor-pointer text-gray-500 " />
            <p className="ml-1 text-sm text-gray-500">{commentCount}</p>
            <p className="hidden sm:block ml-2 text-sm text-gray-600">
              Comment
            </p>
          </Link>
        </span>

        <Menu as="div" className="ml-3 relative">
          <div>
            <Menu.Button className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer">
              <ShareIcon className="h-7 cursor-pointer rounded-full p-1 text-gray-500 " />
              <p className="hidden sm:block ml-2 text-sm text-gray-600">
                Share
              </p>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href={`https://twitter.com/intent/tweet?url=https://melbite.com/Welcome-to-Melbite-the-official-blogging-site-or-the-world `}
                    target="_blank"
                    rel="noreferrer"
                    className={classNames(
                      active ? "bg-white" : "",
                      "block px-4 py-2 text-sm text-gray-700 hover:text-purple-900"
                    )}
                  >
                    Share on Twitter
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href={`https://www.facebook.com/sharer.php?u=https://melbite.com/Welcome-to-Melbite-the-official-blogging-site-or-the-world `}
                    target="_blank"
                    rel="noreferrer"
                    className={classNames(
                      active ? "bg-white" : "",
                      "block px-4 py-2 text-sm text-gray-700 hover:text-purple-900"
                    )}
                  >
                    Share on Facebook
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=https://melbite.com/Welcome-to-Melbite-the-official-blogging-site-or-the-world `}
                    target="_blank"
                    rel="noreferrer"
                    className={classNames(
                      active ? "bg-white" : "",
                      "block px-4 py-2 text-sm text-gray-700 hover:text-purple-900"
                    )}
                  >
                    Share on LinkedIn
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href={`https://www.reddit.com/submit?url=https://melbite.com/Welcome-to-Melbite-the-official-blogging-site-or-the-world `}
                    target="_blank"
                    rel="noreferrer"
                    className={classNames(
                      active ? "bg-white" : "",
                      "block px-4 py-2 text-sm text-gray-700 hover:text-purple-900"
                    )}
                  >
                    Share on Reddit
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </section>
    </main>
  );
}

export default WelcomeNote