import './Floating.css'
import { motion } from 'framer-motion'

export default function Floating() {
    return (
        <motion.div 
        className='float-btn'
        initial={{rotateY: 0,}}
        animate={{rotateY: 18000}}
        transition={{
          duration: 300,
        //   linear: "infinite",
        }}
        >
            <img src="../../../public/images/favicon.png" alt="" />
        </motion.div>
    )
}