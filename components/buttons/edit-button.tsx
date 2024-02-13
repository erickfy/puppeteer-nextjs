'use client';

import { CiEdit } from "react-icons/ci";
import { motion } from "framer-motion"
import { useRouter } from "next/navigation";
import { routes } from "@/routes";

interface EditButtonProps {
  userId: string
  href: string
}

const EditButton: React.FC<EditButtonProps>
  = ({
    userId,
    href
  }) => {
    const router = useRouter()

    return (
      <motion.div
        onClick={() => router.push(`${href}/${userId}`)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
      >
        <CiEdit
          size={34}
          className="
        absolute
        -top-[2px]
        -right-[2px]
      "
        />
      </motion.div>
    );
  }

export default EditButton;