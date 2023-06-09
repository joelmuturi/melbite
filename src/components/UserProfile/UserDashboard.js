import { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import { db } from "../../utils/firebase";
import { Menu, Transition } from "@headlessui/react";
import { Helmet } from "react-helmet";
import {
  HeartIcon,
  ChatIcon,
  ShareIcon,
  DocumentDuplicateIcon,
  EyeIcon,
  DocumentAddIcon,
} from "@heroicons/react/outline";

import ReactTimeago from "react-timeago";
import DeleteMyArticle from "./DeleteMyArticle";
import EditMyArticle from "./EditMyArticle";
import DashboardNavigator from "./DashboardNavigator";
import DashboardLinks from "./DashboardLinks";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UserDashboard = ({ name_slug }) => {
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);
  const user = useSelector(selectUser);
  const [articlesCount, setArticlesCount] = useState(0);

  const fetchData = async () => {
    db.collection("posts")
      .where("uid", "==", user.uid)
      .onSnapshot((querySnapshot) => {
        const newPosts = [];
        querySnapshot.forEach((doc) => {
          newPosts.push({ id: doc.id, ...doc.data() });
        });
        setUserPosts(newPosts);
      });
  };

  const fetchArticleCount = async () => {
    await db
      .collection("posts")
      .where("uid", "==", user?.uid)
      .onSnapshot((snapshot) => setArticlesCount(snapshot.size));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchArticleCount();
  }, []);

  return (
    <main className="md:pt-28 mx-wd1 flex justify-between md:flex-row flex-col mx-auto">
      <Helmet>
        <title>Melbite | Dashboard</title>
      </Helmet>

      <div className="block md:hidden">
        <DashboardNavigator />
      </div>
      <section>
        <DashboardLinks />
      </section>

      <section className="ml-0 md:ml-20 w-full">
        <section className="mb-3">
          <h3 className="text-lg font-serif md:text-3xl text-gray-600">
            Hello {user?.displayName},
          </h3>
          <p className="text-gray-500">Your recap articles at this time</p>
        </section>
        <section className="md:flex items-start justify-between">
          <article className="">
            {userPosts.length === 0 ? (
              <section className="text-center flex items-center justify-center flex-col ml-12 md:ml-28">
                <h1 className="text-gray-400 mt-16 mb-16">
                  You've not posted yet!
                </h1>
                <button
                  onClick={() => navigate("/new")}
                  className="bg-c p-3 pl-6 pr-6 text-white rounded-md hover:bg-purple-900 "
                >
                  Create Your First Post
                </button>
              </section>
            ) : (
              <>
                {/* {userPosts && userPosts.map(())} */}
                {userPosts &&
                  userPosts?.map((userPost) => (
                    <section
                      // key={id}
                      className="w-full border-2 rounded-md bg-white  p-5 mb-2 hover:border-purple-800 duration-150 max-h-96"
                    >
                      <section className="flex justify-between items-center">
                        <div className="flex items-center ">
                          <span className="bg-yellow-300 w-10 font-mono p-1 pl-3 uppercase text-xl text-gray-800 h-10 border-2 border-yellow-300 rounded-full">
                            {user?.displayName[0]}
                          </span>
                          <span className="ml-2">
                            <h3 className="text-sm">{user.displayName}</h3>
                            <p className="text-sm text-gray-500">
                              Published{" "}
                              <ReactTimeago
                                date={new Date(
                                  userPost.timestamp?.toDate()
                                ).toUTCString()}
                              />
                            </p>
                          </span>
                        </div>
                        <div className="flex space-x-5 items-center h-8 justify-between">
                          <div className="w-10 mt-32 bg-transparent">
                            <EditMyArticle
                              id={userPost.id}
                              editBlogHeader={userPost.blogHeader}
                              editBlogBody={userPost.blogBody}
                              editBackgroundImage={userPost.backgroundImage}
                              editCurrentTask={userPost.currentTask}
                              editSelectedTag={userPost.selectedTag}
                            />
                          </div>

                          <div>
                            {user && user.uid === userPost.uid && (
                              <DeleteMyArticle id={userPost.id} />
                            )}
                          </div>
                        </div>
                      </section>

                      <section className="mt-2">
                        <Link
                          to={`/${
                            `${name_slug}` || `${user?.displayName[0]}`
                          }/${userPost.id}`}
                        >
                          <h1 className="md:leading-9 text-lg md:text-3xl text-gray-900 hover:text-purple-900 cursor-pointer">
                            {userPost.blogHeader}{" "}
                          </h1>
                        </Link>
                      </section>

                      <section className="flex gap-1 text-xs md:text-sm md:flex md:gap-3 mt-4 flex-wrap w-full">
                        {userPost.hashTags?.map((tag) => (
                          <Link
                            key={tag}
                            to={`/tags/${tag}`}
                            className="rounded-md max-w-min bg-green-50 hover:bg-green-100 py-1 px-2 border cursor-pointer"
                          >
                            #{tag}
                          </Link>
                        ))}
                      </section>

                      <section className="flex justify-between mt-4">
                        <span className="flex items-center w-2/5 justify-between text-gray-400">
                          <Link
                            to={`/${user?.name_slug}/${userPost.id}`}
                            className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer"
                          >
                            <HeartIcon className="w-6 cursor-pointer " />
                            <p className="hidden sm:block ml-2 text-sm text-gray-600">
                              React
                            </p>
                          </Link>

                          <Link
                            to={`/${user?.name_slug}/${userPost.id}`}
                            className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer"
                          >
                            <ChatIcon className="w-6 cursor-pointer text-gray-500 " />
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
                                    href={`https://twitter.com/intent/tweet?url=https://melbite.com/${name_slug}/${userPost.id}`}
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
                                    href={`https://www.facebook.com/sharer.php?u=https://melbite.com/${name_slug}/${userPost.id}`}
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
                                    href={`https://www.linkedin.com/sharing/share-offsite/?url=https://melbite.com/${name_slug}/${userPost.id}`}
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
                                    href={`https://www.reddit.com/submit?url=https://melbite.com/${name_slug}/${userPost.id}`}
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
                    </section>
                  ))}
              </>
            )}
          </article>
          <div className="hidden md:block rounded-md md:w-2/6 w-full ml-3">
            <div className="">
              <div className="bg-white rounded-md flex space-x-5 p-3 shadow-lg mb-3">
                <DocumentAddIcon className="text-blue-600 p-2 rounded-full bg-green-200 w-12 h-12" />
                <span className="ml-3">
                  <p className="text-sm text-gray-700">Total Articles</p>
                  <p className="text-2xl text-gray-800 font-bold">
                    {articlesCount}
                  </p>
                </span>
              </div>
              <div className="bg-white rounded-md flex space-x-5 p-3 shadow-lg mb-3">
                <DocumentDuplicateIcon className="text-blue-600 p-2 rounded-full bg-green-200 w-12 h-12" />
                <span className="ml-3">
                  <p className="text-sm text-gray-700">Total Drafts</p>
                  <p className="text-2xl text-gray-800 font-bold">0</p>
                </span>
              </div>
              <div className="bg-white rounded-md flex space-x-5 p-3 shadow-lg mb-3">
                <EyeIcon className="text-blue-600 p-2 rounded-full bg-green-200 w-12 h-12" />
                <span className="ml-3">
                  <p className="text-sm text-gray-700">Total Articles Views</p>
                  {/* <p className="text-2xl text-gray-800 font-bold">8,069</p> */}
                  <p className="text-xs text-purple-700">
                    Oops! We are Working on it.
                  </p>
                </span>
              </div>
            </div>
          </div>
        </section>
      </section>
      {/* </section> */}
    </main>
  );
};

export default UserDashboard;
