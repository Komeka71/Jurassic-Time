import { motion, AnimatePresence } from "framer-motion";

export default function TeacherBubble({
  message = "📚 Read the question carefully!",
}) {
  return (
    <div
      className="
        absolute

        left-[8%]
        top-[20%]

        sm:left-[8%]
        sm:top-[22%]

        md:left-[8%]
        md:top-[24%]

        lg:left-[9%]
        lg:top-[24%]

        z-30
        pointer-events-none
      "
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={message}
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.95 }}
          transition={{ duration: 0.35 }}
          className="
            relative

            w-[220px]
            sm:w-[260px]
            md:w-[280px]
            lg:w-[290px]

            rounded-2xl
            lg:rounded-3xl

            bg-[#FFF9EF]

            border-2
            border-[#D5C28A]

            shadow-xl

            px-4
            py-3

            sm:px-5
            sm:py-4
          "
        >
          <p
            className="
              text-[13px]
              sm:text-[14px]
              lg:text-[15px]

              font-medium
              leading-relaxed

              text-[#2D2D2D]
            "
          >
            {message}
          </p>

          {/* Bubble Tail */}
          <div
            className="
              absolute

              bottom-[-7px]
              left-6

              sm:left-8

              h-3
              w-3

              sm:h-4
              sm:w-4

              rotate-45

              bg-[#FFF9EF]

              border-r-2
              border-b-2
              border-[#D5C28A]
            "
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}