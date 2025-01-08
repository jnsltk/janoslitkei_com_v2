'use client'
import { motion } from 'framer-motion'

const fadeInVariant = {
    hidden: { opacity: 0, y: 50 }, 
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: 'easeOut' },
    },
}

import { ReactNode } from 'react'

const FadeInSection = ({ children }: { children: ReactNode }) => {
    return (
        <motion.div
            variants={fadeInVariant} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: false, amount: 0.2 }}
        >
            {children}
        </motion.div>
    )
}

export default FadeInSection
