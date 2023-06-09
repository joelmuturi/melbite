import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <main
      onLoad={window.scroll(0, 0)}
      className="lg:max-w-7xl mt-24 mx-wd1 bg-white mx-auto p-4 pt-12 pb-12 pl-12 border rounded-md"
    >
      <Helmet>
        <title> About Melbite Community</title>
        <meta
          name="description"
          content="Melbite is a community of people and people who are not in the world of life. Melbite is a community of people and people who are not in the world of life"
        />
        <meta
          name="keywords"
          content="How to, Learning, Article, blogging, melbite, Javascript"
        />
      </Helmet>
      <section className="bg mx-wd2">
        <h2 className="text-3xl text-gray-800">About Melbite</h2>
        <p className="mt-3 leading-7 text-md text-gray-900">
          Melbite is a platform for everyone to read, write and learn.{" "}
        </p>
        <p className="leading-7 text-md text-gray-900">
          The idea behind melbite was to create a platform that enables everyone
          to share their thoughts about a particular topic of their expertise
          and help others learn.
        </p>

        <h2 className="mt-7 mb-5 text-2xl leading-5 text-gray-800">Vision</h2>
        <p className="leading-7 text-md text-gray-900">
          Our vision is to create a hub for diverse, informative content that
          educates and inspires.
        </p>
        <h2 className="mt-7 mb-5 text-2xl leading-5 text-gray-800">Our Goal</h2>
        <div className="ml-4">
          <li className="leading-7 text-md text-gray-900 mb-2">
            Bridging the knowledge gap by providing a platform that empowers
            people from all backgrounds to share their stories and perspectives,
            while also providing high-quality, informative content that helps
            readers better understand the world around them.
          </li>
          <li className="leading-7 text-md text-gray-900 mb-2">
            To reate a space where everyone can learn and grow, by providing a
            platform that combines diverse perspectives and high-quality
            information to help readers expand their understanding of the world.
          </li>
          <li className="leading-7 text-md text-gray-900 mb-2">
            Cultivating lifelong learnerning by creating a platform that
            inspires curiosity and encourages lifelong learning, by providing a
            space where people can explore new ideas, perspectives, and areas of
            interest in a supportive and inclusive community.
          </li>
        </div>
        <h2 className="mt-7 mb-5 text-2xl leading-5 text-gray-800">
          Technologies
        </h2>
        <p className="leading-7 text-md text-gray-900">
          Melbite is built with this amazing Javascript libraries that are
          ReactJs and NodeJs. We also make use of firebase realtime database,
          firestore and firebase storage. Our amazing search bar is powered by
          Algolia-search.
        </p>
        <p className="leading-7 text-md text-gray-900">
          We make use of customised Quill Editor supporting various features and
          instant preview of the content. This feature in not available on any
          other platform available.{" "}
          <p
            onClick={() => navigate("/new")}
            className="text-purple-700 hover:text-purple-900 underline cursor-pointer"
          >
            try it out
          </p>
          <p className="leading-7 text-md text-gray-900 mt-4">
            Welcome to melbite and Happy coding
          </p>
        </p>
      </section>
    </main>
  );
};

export default AboutUs;
