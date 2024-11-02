import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

interface DockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

interface FloatingDockProps {
  items: DockItem[];
  desktopClassName?: string;
}

interface IconContainerProps extends DockItem {
  mouseY: MotionValue;
}

const IconContainer: React.FC<IconContainerProps> = ({ mouseY, title, icon, href }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<boolean>(false);

  const distance = useTransform(mouseY, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return val - bounds.y - bounds.height / 2;
  });

  const widthTransform = useTransform(distance, [-100, 0, 100], [40, 60, 40]);
  const heightTransform = useTransform(distance, [-100, 0, 100], [40, 60, 40]);
  const iconSizeTransform = useTransform(distance, [-100, 0, 100], [20, 30, 20]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const iconSize = useSpring(iconSizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <a href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="rounded-full bg-[#001D3D] dark:bg-[--secondary--] flex items-center justify-center relative p-2"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: "50%", x: "50%" }}
              animate={{ opacity: 1, y: "50px", x: "60%" }}
              exit={{ opacity: 0, y: "50%", x: "50%" }}
              className="px-4 py-1 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-black absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-sm"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ 
            width: iconSize, 
            height: iconSize 
          }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
};

export const FloatingDock: React.FC<FloatingDockProps> = ({ items, desktopClassName }) => {
  const mouseY = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseY.set(e.pageY)}
      onMouseLeave={() => mouseY.set(Infinity)}
      className={`mx-auto hidden md:flex flex-col h-fit gap-3 items-center rounded-full bg-black p-4 dark:bg-neutral-900 justify-center w-16 ${desktopClassName ?? ''}`}
    >
      {items.map((item) => (
        <IconContainer 
          key={item.title} 
          mouseY={mouseY} 
          {...item} 
        />
      ))}
    </motion.div>
  );
};