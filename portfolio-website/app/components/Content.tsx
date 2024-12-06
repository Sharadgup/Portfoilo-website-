"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Mail, Phone, Menu } from "lucide-react";
import Image from "next/image";

const Section = ({
  id,
  title,
  content,
}: {
  id: string;
  title: string;
  content: React.ReactNode;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center snap-start py-16"
    >
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8 max-w-6xl w-full">
        <h2 className="text-4xl font-bold mb-8 text-center">{title}</h2>
        {content}
      </div>
    </motion.section>
  );
};

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    "Home",
    "About",
    "Education",
    "Experience",
    "Projects",
    "Achievements",
    "Contact",
  ];

  const navVariants = {
    open: { x: 0 },
    closed: { x: "100%" },
  };

  const itemVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: 20 },
  };

  return (
    <>
      <motion.button
        className="fixed top-4 right-4 z-50 bg-gray-800 p-2 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Menu size={24} />
      </motion.button>
      <motion.nav
        className="fixed top-0 right-0 h-full bg-gray-900 bg-opacity-90 backdrop-blur-md w-64 z-40 flex flex-col justify-center"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={navVariants}
      >
        <ul className="space-y-6 p-4">
          {navItems.map((item) => (
            <motion.li key={item} variants={itemVariants}>
              <a
                href={`#${item.toLowerCase()}`}
                className="text-white text-xl hover:text-gray-300 transition-colors block"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.nav>
    </>
  );
};

const BlockItem = ({
  title,
  subtitle,
  description,
  imageSrc,
}: {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
    >
      <Image
        src={imageSrc}
        alt={title}
        width={400}
        height={250}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <h4 className="text-lg text-gray-400 mb-4">{subtitle}</h4>
        <p>{description}</p>
      </div>
    </motion.div>
  );
};

const Content = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    company: '',
    position: ''
  })
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert('Form submitted successfully!')
        setFormData({ name: '', email: '', phone: '', message: '', company: '', position: '' })
      } else {
        alert('Error submitting form. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Please try again.')
    }
  }

  return (
    <>
      <NavBar />
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
        <Section
          id="home"
          title="Welcome to My Portfolio"
          content={
            <div className="text-center">
              <Image
                src="/Profit.jpg"
                alt="Local Image"
                width={200}
                height={200}
                className="rounded-full mx-auto mb-8 object-cover"
              />

              <p className="text-2xl">
                Welcome to my professional portfolio! I'm Sharad Gupta, a
                passionate AI Engineer enthusiast with a Master's degree in
                Computer Application from Jabalpur Engineering College. Skilled
                in Python, R, SQL, and cutting-edge tools like TensorFlow and
                Tableau, I specialize in creating AI-powered solutions for
                real-world challenges.
              </p>
            </div>
          }
        />
        <Section
          id="about"
          title="About Me"
          content={
            <p className="text-xl">
              I’m Sharad Gupta, a passionate Ai Engineer enthusiast with a
              Master’s degree in Computer Application from Jabalpur Engineering
              College. Skilled in Python, R, SQL, and cutting-edge tools like
              TensorFlow and Tableau, I specialize in creating AI-powered
              solutions for real-world challenges. My journey includes impactful
              projects like an Automated Chest X-Ray Diagnostic System,
              leveraging GANs for accurate lung issue detection, and a Rating
              Prediction System, achieving 96.99% precision with advanced ML
              algorithms. My internship at Cognifyz Technologies honed my
              expertise in data preprocessing, feature engineering, and building
              predictive models. Explore my work, achievements, and technical
              innovations as I strive to transform ideas into impactful
              solutions!
            </p>
          }
        />
        <Section
          id="education"
          title="Education"
          content={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BlockItem
                title="Master of Computer Application (M.C.A)"
                subtitle="Jabalpur Engineering Collage"
                description="Through this Degree.I got Opportunities in Ai and Data Science and NeuroRobotics through which I was able to learn advanced level technology and with the help of this degree, I am was able to do high level and good projects in this field and I am AI engineer in this field."
                imageSrc="/college.jfif"
              />
              <BlockItem
                title="Full Stack Web Development Bootcamp"
                subtitle="Tech Academy"
                description="Intensive 12-week program covering modern web development technologies and practices."
                imageSrc="/eduction.svg"
              />
            </div>
          }
        />
        <Section
          id="experience"
          title="Experience"
          content={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BlockItem
                title="Senior Web Developer"
                subtitle="Tech Solutions Inc. | 2019 - Present"
                description="Lead developer for multiple high-profile client projects, focusing on React and Node.js applications."
                imageSrc="/placeholder.svg"
              />
              <BlockItem
                title="Full Stack Developer"
                subtitle="Web Innovators | 2016 - 2019"
                description="Developed and maintained various web applications using JavaScript, PHP, and MySQL."
                imageSrc="/placeholder.svg"
              />
            </div>
          }
        />
        <Section
          id="projects"
          title="Projects"
          content={
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <BlockItem
                title="E-commerce Platform"
                subtitle="React, Node.js, MongoDB"
                description="A fully-featured online store with user authentication, product management, and payment integration."
                imageSrc="/placeholder.svg"
              />
              <BlockItem
                title="Task Management App"
                subtitle="Vue.js, Express, PostgreSQL"
                description="A collaborative task management tool with real-time updates and team features."
                imageSrc="/placeholder.svg"
              />
              <BlockItem
                title="Social Media Dashboard"
                subtitle="React, GraphQL, AWS"
                description="A comprehensive dashboard for managing multiple social media accounts with analytics and scheduling features."
                imageSrc="/placeholder.svg"
              />
            </div>
          }
        />
        <Section
          id="achievements"
          title="Achievements"
          content={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BlockItem
                title="Best Web App Award"
                subtitle="Tech Innovators Conference 2022"
                description="Received the top prize for the most innovative web application at the annual Tech Innovators Conference."
                imageSrc="/placeholder.svg"
              />
              <BlockItem
                title="Open Source Contributor"
                subtitle="React Community"
                description="Active contributor to several popular React libraries, with over 500 GitHub stars on personal projects."
                imageSrc="/placeholder.svg"
              />
            </div>
          }
        />
         <Section
          id="contact"
          title="Contact Me"
          content={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-300">Position</label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
                    ></textarea>
                  </div>
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Send Message
                  </button>
                </form>
                <div className="mt-8 space-y-2">
                  <p className="flex items-center">
                    <Mail className="mr-2" size={18} />
                    <a href="mailto:john.doe@gmail.com" className="hover:underline">john.doe@gmail.com</a>
                  </p>
                  <p className="flex items-center">
                    <Phone className="mr-2" size={18} />
                    <span>+1 (234) 567-8900</span>
                  </p>
                  <p className="flex items-center">
                    <MapPin className="mr-2" size={18} />
                    <span>New York City, USA</span>
                  </p>
                </div>
              </div>
              <div className="h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304603!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1619395418707!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          }
        />
      </div>
    </>
  )
}

export default Content
