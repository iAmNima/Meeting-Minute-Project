import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const modal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { 
    y: "200px", 
    opacity: 1,
    transition: { delay: 0.5 }
  },
}

const Modal = ({ showModal }) => {
  return (
    <AnimatePresence>
      { showModal && (
        <motion.div className="backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div className="modal1"
            variants={modal}
          >
            <p>New Reservation Added!</p>
            <Link to="/">
              <button>Back to Home</button>
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal;