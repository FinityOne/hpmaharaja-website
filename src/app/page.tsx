import Link from "next/link";

export default function Home() {
  const upcomingEvents = [
    {
      date: "Dec 11 - 15, 2024",
      title: "Phoenix & Arizona Trip",
      color: "border-blue-500",
    },
    {
      date: "February 2025",
      title: "NYC Move (yes, HP has moved to NYC)",
      color: "border-sky-500",
    },
    {
      date: "April 2025",
      title: "Chadha + Plaha Take On NYC",
      color: "border-red-500",
    },
    {
      date: "May 2025",
      title: "Miami Rameelo + Maharaja Estates Trip",
      color: "border-yellow-500",
    },
    {
      date: "September 2025",
      title: "Rameelo (Orange County, CA)",
      color: "border-purple-500",
    },
  ];

  return (
    <main>
      {/* Header Section with Full Background Image */}
      <header
        className="relative h-[75vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/home/header-bg.jpg')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-75"></div>

        {/* Text Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <h1 className="text-6xl md:text-9xl font-bold mb-4">
            Hustle Mindset is the Way!
          </h1>
          <p className="text-xl md:text-4xl font-light mb-8 text-slate-400">
            Pursue Balance in Chaos
          </p>
          <Link
            href="/articles"
            className="px-6 py-3 bg-white text-black text-lg font-medium rounded hover:bg-blue-800 hover:text-white transition"
          >
            View Articles
          </Link>
        </div>
      </header>

      {/* Timeline Section */}
      <section id="timeline" className="container mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          👑 Journey of Majesty: Upcoming Royal Affairs 👑
        </h2>

        <div className="space-y-6 md:space-y-6">
          {upcomingEvents.map((event, index) => (
            <div
              key={index}
              className={`border-l-4 ${event.color} bg-white shadow-md p-2 rounded-lg`}
            >
              <p className="text-xs text-gray-500">{event.date}</p>
              <h3 className="text-md font-bold text-gray-800">{event.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="py-12 bg-gray-100">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
          My Majestic Ventures
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 container mx-auto px-6">
          {/* Rameelo */}
          <Link
            href="#"
            className="border-l-4 border-red-600 bg-white text-black rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 p-6 flex flex-col items-start"
          >
            <h3 className="text-2xl font-bold mb-2">Rameelo</h3>
            <p className="text-sm text-gray-600">
              Non-profit organization focused on creating, growing, and
              preserving Gujarati Raas Garba culture through deep cultural
              experiences!
            </p>
          </Link>

          {/* FinityOne */}
          <Link
            href="#"
            className="border-l-4 border-blue-600 bg-white text-black rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 p-6 flex flex-col items-start"
          >
            <h3 className="text-2xl font-bold mb-2">FinityOne</h3>
            <p className="text-sm text-gray-600">
              Tech company focused on building growth digital products in
              fintech, event tech, healthtech, and proptech!
            </p>
          </Link>

          {/* Maharaja Estates */}
          <Link
            href="#"
            className="border-l-4 border-green-600 bg-white text-black rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 p-6 flex flex-col items-start"
          >
            <h3 className="text-2xl font-bold mb-2">Maharaja Estates</h3>
            <p className="text-sm text-gray-600">
              Arizona-based real estate company operating a portfolio of
              property acquisition, maintenance, and growth!
            </p>
          </Link>

          {/* Melux Events */}
          <Link
            href="#"
            className="border-l-4 border-purple-600 bg-white text-black rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 p-6 flex flex-col items-start"
          >
            <h3 className="text-2xl font-bold mb-2">Melux Events</h3>
            <p className="text-sm text-gray-600">
              Brand new company spun off of Rameelo delivering event decor,
              experience, and design to Southern California's desi cultural
              events!
            </p>
          </Link>
        </div>
      </section>

      {/* Articles Section */}
      <section id="articles" className="container mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold mb-4">Articles</h2>
        <p className="text-lg text-gray-700 mb-4">
          Dive into thought-provoking insights and stories.
        </p>
        <Link
          href="/articles"
          className="px-6 py-3 bg-blue-800 text-white text-lg font-medium rounded hover:bg-blue-700 transition"
        >
          View All Articles
        </Link>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto py-12 px-6">
        <div className="bg-blue-800 text-white rounded p-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
          <p className="text-lg mb-4">
            Let’s connect! Feel free to call or email me anytime.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="tel:+9499039366"
              className="px-6 py-3 bg-white text-blue-800 text-lg font-medium rounded hover:bg-gray-200 transition"
            >
              Call Me
            </a>
            <a
              href="mailto:heran@finityone.com"
              className="px-6 py-3 bg-white text-blue-800 text-lg font-medium rounded hover:bg-gray-200 transition"
            >
              Email Me
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
