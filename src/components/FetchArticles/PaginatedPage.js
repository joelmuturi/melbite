import { useState, useEffect, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { HeartIcon, ChatIcon, ShareIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { db } from "../../utils/firebase";
import ReactTimeago from "react-timeago";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PaginatedPage = () => {
  const [posts, setPosts] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const perPage = 10;

  const loadMorePosts = () => {
    setLoading(true);
    const postsRef = db.collection("posts");
    let query = postsRef.orderBy("timestamp", "desc").limit(perPage);
    if (lastVisible) {
      query = query.startAfter(lastVisible);
    }
    query
      .get()
      .then((snapshot) => {
        const newPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts([...posts, ...newPosts]);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading posts:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMorePosts();
  }, []);

  // Filter posts to search with terms
  const filterPosts = (posts, searchTerm) => {
    if (!searchTerm) {
      return posts;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return posts.filter((post) => {
      const titleMatch = post.blogHeader
        .toLowerCase()
        .includes(lowerCaseSearchTerm);
      const contentMatch = post.blogBody
        .toLowerCase()
        .includes(lowerCaseSearchTerm);
      const displayNameMatch = post.displayName
        .toLowerCase()
        .includes(lowerCaseSearchTerm);
      return titleMatch || contentMatch || displayNameMatch;
    });
  };

  const filteredPosts = filterPosts(posts, searchTerm);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      !loading
    ) {
      loadMorePosts();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <main>
      <form onSubmit={(e) => e.preventDefault()} className="mb-5">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            value={searchTerm}
            className="w-full p-4 pl-10 text:sm md:text-md text-gray-900 border border-gray-300 rounded-lg bg-white 
              focus:border-transparent"
            placeholder="Search Article..."
            required
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </form>

      {
        filteredPosts &&
          filteredPosts.map((post) => (
            <section
              className="w-full border-2 rounded-md bg-white p-5 mb-2 hover:border-purple-800 duration-150"
              key={post.id}
            >
              <section className="flex items-center ">
                <span className="bg-yellow-300 w-10 font-mono p-1 pl-3 uppercase text-xl text-gray-800 h-10 border-2 border-yellow-300 rounded-full">
                  <Link
                    to={`/users/${post.name_slug}`}
                    title="View this user profile"
                  >
                    {post.displayName?.[0]}
                  </Link>
                </span>
                <span className="ml-2">
                  <div className="flex flex-wrap gap-1 item-center text-xs md:text-sm">
                    <Link
                      to={`/users/${post.name_slug}`}
                      title="View this user profile"
                    >
                      <h3 className="">{post.displayName}</h3>
                    </Link>
                    <p>
                      {post.communityName ? (
                        <>
                          {post.displayName ? (
                            <div className="flex gap-1">
                              <p>for </p>{" "}
                              <Link
                                to={`/community/${post.communityName}`}
                                title="View this community profile"
                              >
                                <h3>{post.communityName}</h3>
                              </Link>
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </p>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 -mt-1">
                    Published{" "}
                    <ReactTimeago
                      date={new Date(post.timestamp?.toDate()).toUTCString()}
                    />
                  </p>
                </span>
              </section>

              <section className="mt-2">
                <Link to={`/${post.name_slug}/${post.id}`}>
                  <h1 className="md:leading-9 text-lg md:text-2xl text-gray-900 hover:text-purple-900 cursor-pointer">
                    {post.blogHeader}{" "}
                  </h1>
                </Link>
              </section>
              <section className="flex gap-1 text-xs md:text-sm md:flex md:gap-3 mt-4 flex-wrap w-full">
                {post.hashTags?.map((tag) => (
                  <Link
                    key={tag}
                    to={`/tags/${tag}`}
                    className="rounded-md max-w-min bg-green-50 hover:bg-green-100 py-1 px-2 border cursor-pointer"
                  >
                    #{tag}
                  </Link>
                ))}
              </section>
              <section className="flex justify-between">
                <span className="flex items-center w-2/5 gap-3 justify-between text-gray-400">
                  <Link
                    to={`/${post.name_slug}/${post.id}`}
                    className="flex items-center space-x-1 hover:bg-gray-200 p-2 rounded-md cursor-pointer"
                  >
                    <HeartIcon className="w-6 cursor-pointer " />
                    <p className="text-sm text-gray-600">
                      {post.likes?.length}
                    </p>
                    <p className="text-sm text-gray-600">Likes</p>
                  </Link>

                  <Link
                    to={`/${post.name_slug}/${post.id}`}
                    className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer"
                  >
                    <ChatIcon className="w-6 cursor-pointer text-gray-500 " />
                    <p className="hidden sm:block ml-2 text-sm text-gray-600">
                      Comment
                      {/* {commentCount} */}
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
                            href={`https://twitter.com/intent/tweet?url=https://melbite.com/${post.name_slug}/${post.id}`}
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
                            href={`https://www.facebook.com/sharer.php?u=https://melbite.com/${post.name_slug}/${post.id}`}
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
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=https://melbite.com/${post.name_slug}/${post.id}`}
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
                            href={`https://www.reddit.com/submit?url=https://melbite.com/${post.name_slug}/${post.id}`}
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
          ))
        //   )
      }
      {loading && (
        <div>
          <p className="text-center mt-3">Loading posts . . . </p>
        </div>
      )}
    </main>
  );
};

export default PaginatedPage;
