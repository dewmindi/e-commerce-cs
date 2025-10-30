import { useInView } from "react-intersection-observer";

export const useInViewAnimation = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.4,
  });

   const [ref1, inView1] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }; 

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5, ease: "easeIn" } }
  };

  return { ref, inView, ref1, inView1, variants, containerVariants, itemVariants, sectionVariants };
};
