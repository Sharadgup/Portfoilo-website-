'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Mail, Phone, Menu, Download, Github, Linkedin, Twitter, Youtube, ChevronDown, ChevronUp, VolumeIcon as VolumeUp, VolumeX } from 'lucide-react'
import Image from 'next/image'
import { useSpeechSynthesis } from 'react-speech-kit'

const TextToSpeech = ({ content }: { content: string }) => {
  const { speak, speaking, supported, cancel } = useSpeechSynthesis()
  const [isSpeaking, setIsSpeaking] = useState(false)

  const toggleSpeech = () => {
    if (isSpeaking) {
      cancel()
      setIsSpeaking(false)
    } else {
      speak({ text: content })
      setIsSpeaking(true)
    }
  }

  useEffect(() => {
    if (!speaking) {
      setIsSpeaking(false)
    }
  }, [speaking])

  if (!supported) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleSpeech}
        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-colors duration-200"
        aria-label={isSpeaking ? "Stop speech" : "Start speech"}
      >
        {isSpeaking ? <VolumeX size={24} /> : <VolumeUp size={24} />}
      </button>
    </div>
  )
}

const Section = ({ id, title, content, isExpandable = false }: { id: string; title: string; content: React.ReactNode; isExpandable?: boolean }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => setIsExpanded(!isExpanded)

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center snap-start py-16 relative"
    >
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8 max-w-6xl w-full">
        <h2 className="text-4xl font-bold mb-8 text-center">{title}</h2>
        {isExpandable ? (
          <>
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 }
                  }}
                  transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  {content}
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={toggleExpand}
              className="mt-4 flex items-center justify-center w-full text-blue-500 hover:text-blue-600 transition-colors duration-200"
            >
              {isExpanded ? (
                <>
                  <ChevronUp size={20} className="mr-2" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown size={20} className="mr-2" />
                  Show More
                </>
              )}
            </button>
          </>
        ) : (
          content
        )}
      </div>
    </motion.section>
  )
}

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    'Home',
    'Education',
    'Experience',
    'Projects',
    'Achievements',
    'Contact',
    'Download',
    'Connect'
  ]

  const navVariants = {
    open: { x: 0 },
    closed: { x: '100%' },
  }

  const itemVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: 20 },
  }

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
  )
}

const BlockItem = ({
  title,
  subtitle,
  description,
  imageSrc,
}: {
  title: string
  subtitle: string
  description: React.ReactNode
  imageSrc: string
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
        <p className="text-sm">{description}</p>
      </div>
    </motion.div>
  )
}

const SocialIcon = ({ Icon, href, ariaLabel }: { Icon: React.ElementType; href: string; ariaLabel: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-white hover:text-blue-500 transition-colors"
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
    aria-label={ariaLabel}
  >
    <Icon size={24} />
  </motion.a>
)

const Content = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    company: '',
    position: '',
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

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
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          company: '',
          position: '',
        })
      } else {
        alert('Error submitting form. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Please try again.')
    }
  }

  const websiteContent = `
    Welcome to My Portfolio. I'm Sharad Gupta, a passionate AI Engineer enthusiast with a Master's degree in Computer Application from Jabalpur Engineering College. Skilled in Python, R, SQL, and cutting-edge tools like TensorFlow and Tableau, I specialize in creating AI-powered solutions for real-world challenges. My journey includes impactful projects like an Automated Chest X-Ray Diagnostic System, leveraging GANs for accurate lung issue detection, and a Rating Prediction System, achieving 96.99% precision with advanced ML algorithms. My internship at Cognifyz Technologies honed my expertise in data preprocessing, feature engineering, and building predictive models. Explore my work, achievements, and technical innovations as I strive to transform ideas into impactful solutions!

    Education. Master of Computer Application (M.C.A) from Jabalpur Engineering College. Through this Degree, I got Opportunities in AI and Data Science and NeuroRobotics through which I was able to learn advanced level technology and with the help of this degree, I was able to do high level and good projects in this field and I am an AI engineer in this field.

    Bachelor of Computer Application (B.C.A) from Makhanlal Chaturvedi National University of Journalism and Communication, Bhopal, Madhya Pradesh, India. Here I learned and understood about various types of Computer Applications and Technology and from here I started My Python and AI journey with many scopes.

    Experience. Data Science Intern at Cognifyz Technologies from April 2024 to May 2024. As a Data Science Intern, I had the opportunity to work on various projects and tasks, analyze complex Datasets and derive meaningful insights.

    Machine learning Internship at PHN Technology Pvt.Ltd from April 2023 to June 2023. This internship gave me the opportunity to work on projects to develop skills and core concepts, contributing to my knowledge in the organization.

    Projects. Plant Disaster Prediction App Based on Real-World Data, from October 2024 to Present. The Plants Disease Prediction System is an advanced, AI-powered hybrid Android application designed to assist plant enthusiasts, gardeners, and farmers. Built using the versatile React Native framework, the app integrates artificial intelligence to provide accurate plant health diagnoses, actionable treatment recommendations, and robust tracking features for optimal plant care.

    Rating Prediction System, from April 2024 to May 2024. A Streamlit App for web application rating predictions. ML Implementation: Algorithms analyze data for accurate predictions achieving 96.99% accuracy.

    Automated Chest X-Ray Diagnosis System, from January 2024 to March 2024. Developed an Automated X-Ray Diagnosis System using deep learning, specifically GANs, to boost accuracy in spotting lung issues. Utilized GANs for Synthetic Images to enhance training data diversity for a more powerful diagnostic model. Achieved 96.99% training accuracy and 75.09% test accuracy.

    Achievements. Open Source Contributor to OCR App Receipt. In the OCR App, I am contributing to the AI model OCR model for Receipt, which aims to feed the correct data extracted by processing the image, and feature fitting process for data arrangement in table format and exporting the data to Tally prime API to help export excel field store data.

    Open Source Contributor to Tavite-College-user. Welcome to the revolutionary realm of education and collaboration with the Tavite College App, a pioneering Android application that embodies a paradigm shift in learning. At its core, Tavite College App is an intersection of cutting-edge technology, artificial intelligence, and creative collaboration, designed to transcend traditional boundaries.

    Contact Me. You can reach me at shardgupta65@gmail.com or +91 9617173355. I'm located in Jabalpur, Madhya Pradesh, India.

    Connect With Me on GitHub, LinkedIn, Twitter, and YouTube.
  `

  return (
    <>
      <NavBar />
      <TextToSpeech content={websiteContent} />
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
        <Section
          id="home"
          title="Welcome to My Portfolio"
          content={
            <div className="text-center">
              <Image
                src="/Profit.jpg"
                alt="Sharad Gupta"
                width={200}
                height={200}
                className="rounded-full mx-auto mb-8 object-cover"
              />
              <p className="text-lg mb-8">
                Welcome to my professional portfolio! I'm Sharad Gupta, a
                passionate AI Engineer enthusiast with a Master's degree in
                Computer Application from Jabalpur Engineering College. Skilled
                in Python, R, SQL, and cutting-edge tools like TensorFlow and
                Tableau, I specialize in creating AI-powered solutions for
                real-world challenges.
              </p>
              <p className="text-sm">
                My journey includes impactful projects like an Automated Chest X-Ray Diagnostic System,
                leveraging GANs for accurate lung issue detection, and a Rating
                Prediction System, achieving 96.99% precision with advanced ML
                algorithms. My internship at Cognifyz Technologies honed my
                expertise in data preprocessing, feature engineering, and building
                predictive models. Explore my work, achievements, and technical
                innovations as I strive to transform ideas into impactful
                solutions!
              </p>
            </div>
          }
        />
        <Section
          id="download"
          title="Download Resume"
          content={
            <div className="text-center">
              <motion.a
                href="/resume PDF 2024 SharadGupta (2).pdf"
                download
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="mr-2" size={20} />
                Download Resume
              </motion.a>
            </div>
          }
        />
        <Section
          id="education"
          title="Education"
          content={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BlockItem
                title="Master of Computer Application (M.C.A)"
                subtitle="Jabalpur Engineering College"
                description="Through this Degree, I got opportunities in AI and Data Science and NeuroRobotics through which I was able to learn advanced level technology. With the help of this degree, I was able to do high-level and impactful projects in this field, solidifying my position as an AI engineer."
                imageSrc="/college.png"
              />
              <BlockItem
                title="Bachelor of Computer Application (B.C.A)"
                subtitle="Makhanlal Chaturvedi National University of Journalism and Communication, Bhopal, Madhya Pradesh, India"
                description="Here I learned and understood various types of Computer Applications and Technology. This program laid the foundation for my journey in Python and AI, opening up many scopes for future growth and exploration."
                imageSrc="/bcacollege.png"
              />
            </div>
          }
          isExpandable={true}
        />
        <Section
          id="experience"
          title="Experience"
          content={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BlockItem
                title="Data Science Intern"
                subtitle="Cognifyz Technologies | April 2024 - May 2024"
                description="As a Data Science Intern, I had the opportunity to work on various projects and tasks, analyzing complex datasets and deriving meaningful insights. This experience honed my skills in data preprocessing, feature engineering, and predictive modeling."
                imageSrc="/experience1.png"
              />
              <BlockItem
                title="Machine Learning Internship"
                subtitle="PHN Technology Pvt.Ltd | April 2023 - June 2023"
                description="This internship provided me with the opportunity to work on projects that developed my skills and core concepts in machine learning. I contributed to the organization's knowledge base and gained practical experience in implementing ML algorithms and solutions."
                imageSrc="/Expericenc2.png"
              />
            </div>
          }
          isExpandable={true}
        />
        <Section
          id="projects"
          title="Projects"
          content={
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <BlockItem
                title="Plant Disease Prediction App"
                subtitle="October 2024 - Present"
                description={
                 <>
                  An advanced, AI-powered hybrid Android application designed to assist plant enthusiasts, gardeners, and farmers. Built using React Native, TensorFlow, and integrating computer vision and deep learning algorithms.{' '}
                  <a
                    href="https://drive.google.com/drive/folders/1F0LIA5rYVN_qbEVKKQEuwkb7pnBYid5X?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'white', textDecoration: 'underline' }}
                  >
                    Learn more
                  </a>
                 </>
                }
               imageSrc="/Android app named 'Plants Disease Prediction System'. The design showcases its AI-driven features with.png"
               />
              <BlockItem
                title="Rating Prediction System"
                subtitle="April 2024 – May 2024"
                description={
                 <>
                 A Streamlit web application for rating predictions. Implemented ML algorithms to analyze data and achieve accurate predictions with 96.99% accuracy.{' '}
                 <a
                  href="https://github.com/Sharadgup/Project-for-Cognifyz-technologies-Data-Science.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'white', textDecoration: 'underline' }}
                 >
                   Learn more
                </a>
                </>
              }
               imageSrc="/Project3.png"
              />
              <BlockItem
                 title="Automated Chest X-Ray Diagnosis System"
                 subtitle="January 2024 – March 2024"
                 description={
                   <>
                   Developed using deep learning and GANs to enhance accuracy in lung issue detection. Achieved 96.99% training accuracy and 75.09% test accuracy.{' '}
                   <a
                    href="https://github.com/Sharadgup/automatics-chest-X-Ray-Diagonals-system-.git"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'white', textDecoration: 'underline' }}
                   >
                    Learn more
                   </a>
                   </>
                 }
                 imageSrc="/project 1.png"
                />
             </div>
          }
          isExpandable={true}
        />
        <Section
          id="achievements"
          title="Achievements"
          content={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BlockItem
               title="Open Source Contributor"
               subtitle="OCR App Receipt"
               description={
               <>
               Contributing to the AI model for OCR receipt processing, focusing on data extraction, arrangement, and integration with Tally Prime API.{' '}
               <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                 style={{ color: 'white', textDecoration: 'underline' }}
                >
                   Learn more
               </a>
               </>
              }  
                imageSrc="/images45.jpg"
              />
              <BlockItem
                title="Open Source Contributor"
                subtitle="Tavite-College-user"
                description={
                 <>
                   Contributing to a revolutionary Android application for education, integrating cutting-edge technology and AI for collaborative learning.{' '}
                 <a
                   href="https://github.com/Sharadgup/Tavite-College-user.git"
                   target="_blank"
                   rel="noopener noreferrer"
                   style={{ color: 'white', textDecoration: 'underline' }}
                  >
                   GitHub
                 </a>
                 </>
                 }
                   imageSrc="/tavite.jpg"
                 />
            </div>
          }
          isExpandable={true}
        />
        <Section
          id="contact"
          title="Contact Me"
          content={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Name
                    </label>
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
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Email
                    </label>
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
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Phone
                    </label>
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
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Company
                    </label>
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
                    <label
                      htmlFor="position"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Position
                    </label>
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
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Message
                    </label>
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
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Send Message
                  </button>
                </form>
                <div className="mt-8 space-y-2">
                  <p className="flex items-center">
                    <Mail className="mr-2" size={18} />
                    <a
                      href="mailto:shardgupta65@gmail.com"
                      className="hover:underline"
                    >
                      shardgupta65@gmail.com
                    </a>
                  </p>
                  <p className="flex items-center">
                    <Phone className="mr-2" size={18} />
                    <span>+91 9617173355</span>
                  </p>
                  <p className="flex items-center">
                    <MapPin className="mr-2" size={18} />
                    <span>Jabalpur, Madhya Pradesh, India</span>
                  </p>
                </div>
              </div>
              <div className="h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6886.421049471057!2d79.9494979621452!3d23.182463328477755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3981ae5f741802d7%3A0x683fea101780f4b4!2sLalmati%2C%20Jabalpur%2C%20Madhya%20Pradesh%20482002!5e1!3m2!1sen!2sin!4v1733673403611!5m2!1sen!2sin"
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
        <Section
          id="connect"
          title="Connect With Me"
          content={
            <div className="flex justify-center space-x-6">
              <SocialIcon Icon={Github} href="https://github.com/Sharadgup" ariaLabel="GitHub Profile" />
              <SocialIcon Icon={Linkedin} href="https://www.linkedin.com/in/shardgupta2024/" ariaLabel="LinkedIn Profile" />
              <SocialIcon Icon={Twitter} href="https://x.com/sharadG75546208" ariaLabel="Twitter Profile" />
              <SocialIcon Icon={Youtube} href="https://www.youtube.com/@techtoyaiindia5293/featured" ariaLabel="YouTube Profile" />
            </div>
          }
        />
      </div>
    </>
  )
}

export default Content

